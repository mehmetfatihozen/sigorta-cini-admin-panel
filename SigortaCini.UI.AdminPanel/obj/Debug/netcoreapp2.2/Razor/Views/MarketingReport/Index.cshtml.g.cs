#pragma checksum "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\MarketingReport\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "747c0952479359fa70fc8596e00211372ead1794"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_MarketingReport_Index), @"mvc.1.0.view", @"/Views/MarketingReport/Index.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/MarketingReport/Index.cshtml", typeof(AspNetCore.Views_MarketingReport_Index))]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#line 1 "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\_ViewImports.cshtml"
using SigortaCini.UI.AdminPanel;

#line default
#line hidden
#line 2 "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\_ViewImports.cshtml"
using SigortaCini.UI.AdminPanel.Models;

#line default
#line hidden
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"747c0952479359fa70fc8596e00211372ead1794", @"/Views/MarketingReport/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8d38270f5d8a4997c1ce692136e905eecd661704", @"/Views/_ViewImports.cshtml")]
    public class Views_MarketingReport_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", new global::Microsoft.AspNetCore.Html.HtmlString("text/javascript"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/marketingReport/marketingReport.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/daterangepicker/js/moment.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/daterangepicker/js/datetime-moment.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/daterangepicker/js/daterangepicker.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/daterangepicker/css/daterangepicker.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\MarketingReport\Index.cshtml"
  
    ViewData["Title"] = "Pazarlama Raporu";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
            BeginContext(101, 3776, true);
            WriteLiteral(@"
<div class=""col-md-12 col-sm-12 col-xs-12  top_band"">
    <div class=""col-md-12 col-sm-12 col-xs-12 text-left caption p-d-0"">
        Pazarlama Raporu
    </div>
</div>

<div class=""col-md-12 col-sm-12 col-xs-12"">
    <div class=""portlet box"">
        <div class=""portlet-body"">
            <div class=""row"">
                <div class=""col-md-4 col-sm-4 col-xs-12 form-group"">
                    <label>Kaynak</label>
                    <select class=""form-control"" data-placeholder=""Seçiniz..."" id=""tenants"" multiple></select>
                    <br />
                    <input type=""checkbox"" id=""selectAllTenants"">Hepsini Seç
                </div>
                <div class=""col-md-4 col-sm-4 col-xs-12 form-group"">
                    <label class=""col-xs-12 pad-left-0"">Tarih&nbsp;<i class=""fa fa-calendar""></i></label>
                    <input id=""dateRangeList"" class=""col-xs-12 form-control daterangepicker-style"" autocomplete=""off"">
                </div>
                <div class=");
            WriteLiteral(@"""col-md-4 col-sm-4 col-xs-12 form-group margin-top-25 text-center"">
                    <button id=""btnList"" class=""btn btn-success border-8-radius"">Listele</button>
                    <button id=""btnClear"" class=""btn btn-warning border-8-radius"">Temizle</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class=""col-md-12 col-sm-12 col-xs-12 "">
    <div class=""portlet box yellow"">
        <div class=""portlet-body"">
            <table style=""width:100%"" class=""table table-striped table-bordered table-hover"" id=""marketingReportTable"">
                <thead>
                    <tr class=""table_thead_back"">
                        <th class=""no-cursor"">Ad</th>
                        <th class=""no-cursor"">Soyad</th>
                        <th class=""no-cursor"">TC / VK Numarası</th>
                        <th class=""no-cursor"">Adres</th>
                        <th class=""no-cursor"">E-Posta</th>

                        <th class=""no-cursor"">Gelinen Ü");
            WriteLiteral(@"rün</th>
                        <th class=""no-cursor"">Kaynak</th>
                        <th class=""no-cursor"">Yönlendirme Yapan</th>
                        <th class=""no-cursor"">Yönlendirilen</th>
                        <th class=""no-cursor"">Görevli Temsilci Şube</th>

                        <th class=""no-cursor"">Sigorta Ettiren</th>

                        <th class=""no-cursor"">GSM No</th>
                        <th class=""no-cursor"">Şehir</th>
                        <th class=""no-cursor"">İlçe</th>
                        <th class=""no-cursor"">Son Durum İşlem Tipi</th>
                        <th class=""no-cursor"">Ruhsat / Asbis No</th>
                        <th class=""no-cursor"">Şasi No</th>
                        <th class=""no-cursor"">Motor No</th>
                        <th class=""no-cursor"">Plaka</th>
                        <th class=""no-cursor"">Marka</th>
                        <th class=""no-cursor"">Model</th>

                        <th class=""no-cursor"">Kayıt Tarihi<");
            WriteLiteral(@"/th>
                        <th class=""no-cursor"">Kayıt Saati</th>
                        <th class=""no-cursor"">Son İşlem Tarihi</th>
                        <th class=""no-cursor"">Son İşlem Saati</th>

                        <th class=""no-cursor"">Kampanya Kodu</th>
                        <th class=""no-cursor"">Kampanya Kurum Adı</th>
                        <th class=""no-cursor"">KVKK ve Gizlilik Onay</th>
                        <th class=""no-cursor"">İletişim Onay</th>
                        <th class=""no-cursor"">Mesafeli Satış Onay</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    </div>
</div>

");
            EndContext();
            DefineSection("scripts", async() => {
                BeginContext(3895, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(3901, 86, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "747c0952479359fa70fc8596e00211372ead179410490", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(3987, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(3993, 58, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "747c0952479359fa70fc8596e00211372ead179411833", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(4051, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(4057, 63, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "747c0952479359fa70fc8596e00211372ead179413089", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(4120, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(4126, 63, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "747c0952479359fa70fc8596e00211372ead179414345", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_4);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(4189, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(4195, 74, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "747c0952479359fa70fc8596e00211372ead179415601", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_6);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(4269, 2, true);
                WriteLiteral("\r\n");
                EndContext();
            }
            );
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591