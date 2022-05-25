using System;
using Kodiak.Azure.WebHostExtension;
using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace SigortaCini.UI.AdminPanel
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");

            var host = WebHost.CreateDefaultBuilder(args);
            if (environment.StartsWith("prod")|| environment.StartsWith("pre")|| environment.StartsWith("accept"))
                host.AddAzureKeyVaultSecretsToConfiguration("https://prod-sigortacini-vault.vault.azure.net");
            else
                host.AddAzureKeyVaultSecretsToConfiguration("https://sigortacini-vault.vault.azure.net");

            host.UseStartup<Startup>();
            return host;
        }
    }
}
