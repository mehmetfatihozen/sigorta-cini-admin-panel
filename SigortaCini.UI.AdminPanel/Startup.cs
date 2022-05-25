using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.ApplicationInsights.AspNetCore;
using Microsoft.ApplicationInsights.Extensibility;
using Microsoft.ApplicationInsights.SnapshotCollector;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OpenIdConnect;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Localization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using SigortaCini.Framework.Extensions.Storage;
using SigortaCini.Framework.IOC;
using SigortaCini.Framework.Mapping;
using SigortaCini.Framework.NoSQL.MongoDB;
using SigortaCini.UI.AdminPanel.Filters;
using SigortaCini.UI.AdminPanel.SignalRHub;
using SigortaCini.UI.Extensions;

namespace SigortaCini.UI.AdminPanel
{
    public class Startup
    {
        private readonly IHostingEnvironment _currentEnvironment;
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            _currentEnvironment = env;
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            //SignalR added
            services.AddSignalR();

            Mapper.Init(MappingConfiguration.Config.CreateMapper());

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => false;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            // Configure SnapshotCollector from application settings
            //services.Configure<SnapshotCollectorConfiguration>(Configuration.GetSection(nameof(SnapshotCollectorConfiguration)));

            // Add SnapshotCollector telemetry processor.
            //services.AddSingleton<ITelemetryProcessorFactory>(sp => new SnapshotCollectorTelemetryProcessorFactory(sp));

            //Load configs from azure vault
            ConfigLoader.Load(Configuration, _currentEnvironment);
            //StaticValues.DATAMANAGEMENT_ADMIN_API_URL = "http://localhost:61600/"; //for development
            services.Configure<CustomOptions>(options => Configuration.GetSection("CustomOptions").Bind(options));
            services.Configure<ProductMidCategories>(options => Configuration.GetSection("ProductMidCategories").Bind(options));
            var isDevEnv = _currentEnvironment.IsDevelopment();
            //ioc register for redis
            services.AddDistributedRedisCache(option =>
            {
                option.Configuration = StaticValues.REDIS_CONN;
            });

            services.UseIocLoader();
            services.AddScoped<IMongoDBService, MongoDBService>();

            services.AddScoped<IStorageService>(s => new StorageService(new StorageParameter
            {
                ContainerName = StaticValues.STORAGE_GENERAL_CONTAINER,
                STORAGE_GENERAL = StaticValues.STORAGE_GENERAL,
                STORAGE_POLICY = StaticValues.STORAGE_POLICY
            }));


            services.AddAuthentication(sharedOptions =>
            {
                sharedOptions.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                sharedOptions.DefaultChallengeScheme = OpenIdConnectDefaults.AuthenticationScheme;
            })
           .AddAzureAd(options => Configuration.Bind("AzureAd", options))
           .AddCookie();


            services.AddResponseCaching();

            services.AddSession(options =>
            {
                options.Cookie.HttpOnly = true;
                options.Cookie.Name = "SigortaCini.AdminPanel.Session";
                options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest;
                options.IdleTimeout = TimeSpan.FromMinutes(60);
            });

            services.AddMvc(options =>
            {
                options.Filters.Add<AuthFilter>();
            })
           .SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            var desiredTransports = HttpTransportType.WebSockets | HttpTransportType.LongPolling;

            //Use SignalR
            //app.UseSignalR(routes =>
            //{
            //    routes.MapHub<EventHub>("/hub", (options) =>
            //    {
            //        options.Transports = desiredTransports;
            //    });

            //});

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                //app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                //{
                //    HotModuleReplacement = true,
                //    HotModuleReplacementEndpoint = "/dist/__webpack_hmr"
                //});
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseCookiePolicy();

            var defaultDateCulture = "tr-TR";
            var ci = new CultureInfo(defaultDateCulture);

            // Configure the Localization middleware
            app.UseRequestLocalization(new RequestLocalizationOptions
            {
                DefaultRequestCulture = new RequestCulture(ci),
                SupportedCultures = new List<CultureInfo>
                {
                    ci,
                },
                SupportedUICultures = new List<CultureInfo>
                {
                    ci,
                }
            });

            // IMPORTANT: This session call MUST go before UseMvc()
            app.UseSession();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }
        private class SnapshotCollectorTelemetryProcessorFactory : ITelemetryProcessorFactory
        {
            private readonly IServiceProvider _serviceProvider;

            public SnapshotCollectorTelemetryProcessorFactory(IServiceProvider serviceProvider) =>
                _serviceProvider = serviceProvider;

            public ITelemetryProcessor Create(ITelemetryProcessor next)
            {
                var snapshotConfigurationOptions = _serviceProvider.GetService<IOptions<SnapshotCollectorConfiguration>>();
                return new SnapshotCollectorTelemetryProcessor(next, configuration: snapshotConfigurationOptions.Value);
            }
        }
    }

}
