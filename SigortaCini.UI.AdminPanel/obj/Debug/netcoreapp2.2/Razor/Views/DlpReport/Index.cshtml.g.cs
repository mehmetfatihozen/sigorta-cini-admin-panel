#pragma checksum "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\DlpReport\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "7086898b43a57dab0f7fcc54e6949928aab08bec"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_DlpReport_Index), @"mvc.1.0.view", @"/Views/DlpReport/Index.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/DlpReport/Index.cshtml", typeof(AspNetCore.Views_DlpReport_Index))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"7086898b43a57dab0f7fcc54e6949928aab08bec", @"/Views/DlpReport/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8d38270f5d8a4997c1ce692136e905eecd661704", @"/Views/_ViewImports.cshtml")]
    public class Views_DlpReport_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", new global::Microsoft.AspNetCore.Html.HtmlString("text/javascript"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/metronic/assets/global/plugins/googleChart.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/dlpReport/dlpReport.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/daterangepicker/js/moment.min.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/daterangepicker/js/datetime-moment.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/daterangepicker/js/daterangepicker.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/daterangepicker/css/daterangepicker.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_7 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 1 "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\DlpReport\Index.cshtml"
  
    ViewData["Title"] = "DLP Raporu";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
            BeginContext(93, 6273, true);
            WriteLiteral(@"
<div class=""col-md-12 col-sm-12 col-xs-12  top_band"">
    <div class=""col-md-12 col-sm-12 col-xs-12 text-left caption p-d-0"">
        DLP Raporu
    </div>
</div>

<div class=""col-md-12 col-sm-12 col-xs-12"">
    <ul class=""nav nav-pills nav-justified"">
        <li class=""active border-1-black""><a data-toggle=""pill"" href=""#dlpcReportList"" id=""dlpcReportListTab"">DLP Listesi</a></li>
        <li class=""border-1-black""><a data-toggle=""pill"" href=""#dlpcReportChart"" id=""dlpcReportChartTab"">DLP Grafiği</a></li>
    </ul>
</div>

<div class=""col-md-12 col-sm-12 col-xs-12"">
    <div class=""portlet box"">
        <div class=""portlet-body"">
            <div class=""row"">
                <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                    <label>Lead Tipi</label>
                    <select class=""form-control"" data-placeholder=""Seçiniz..."" multiple id=""leadTypes""></select>
                    <br />
                    <input type=""checkbox"" id=""selectAllLeadTypes"">Hepsini Seç
");
            WriteLiteral(@"                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                    <label>Kaynak</label>
                    <select class=""form-control"" data-placeholder=""Seçiniz..."" multiple id=""tenants""></select>
                    <br />
                    <input type=""checkbox"" id=""selectAllTenants"">Hepsini Seç
                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                    <label>Manuel Kaynak</label>
                    <select class=""form-control"" data-placeholder=""Seçiniz..."" multiple id=""leadSourceTypes""></select>
                    <br />
                    <input type=""checkbox"" id=""selectAllLeadSourceTypes"">Hepsini Seç
                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                    <label>Ürün</label>
                    <select class=""form-control"" data-placeholder=""Seçiniz..."" multiple id=""products""></select>
                    <br />
               ");
            WriteLiteral(@"     <input type=""checkbox"" id=""selectAllProducts"">Hepsini Seç
                </div>
            </div>
            <div class=""row"">
                <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                    <label>Görev Temsilcisi</label>
                    <select class=""form-control"" data-placeholder=""Seçiniz..."" multiple id=""assignedUsers""></select>
                    <br />
                    <input type=""checkbox"" id=""selectAllAssignedUsers"">Hepsini Seç
                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                    <label class=""row col-xs-12"">Oluşturulma Tarihi&nbsp;<i class=""fa fa-calendar""></i></label>
                    <input id=""createdDateRange"" class=""col-xs-12 form-control daterangepicker-style"" autocomplete=""off"">
                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                    <label class=""row col-xs-12"">Güncelleme Tarihi&nbsp;<i class=""fa fa-calendar""></i></labe");
            WriteLiteral(@"l>
                    <input id=""updatedDateRange"" class=""col-xs-12 form-control daterangepicker-style"" autocomplete=""off"">
                </div>
                <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                    <label>Ürün Lead Tipi</label>
                    <select class=""form-control"" data-placeholder=""Seçiniz..."" multiple id=""productLeadTypes""></select>
                    <br />
                    <input type=""checkbox"" id=""selectAllProductLeadTypes"">Hepsini Seç
                </div>
            </div>
            <div class=""row"">
                <div class=""col-md-12 col-sm-12 col-xs-12 form-group margin-top-10 padding-right-30 text-right"">
                    <button id=""btnList"" class=""btn btn-success border-8-radius"">Listele</button>
                    <button id=""btnClear"" class=""btn btn-warning border-8-radius"">Temizle</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class=""col-md-12 col-sm-12 col-xs-12 "">
");
            WriteLiteral(@"    <div class=""portlet box yellow"">
        <div class=""portlet-body"">
            <div class=""tab-content"">
                <div id=""dlpcReportList"" class=""tab-pane fade in active"">
                    <table class=""table table-striped table-bordered table-hover"" id=""dlpcReportTable"" style=""width:100%"">
                        <thead>
                            <tr class=""table_thead_back"">
                                <th class=""no-cursor"">
                                    Lead Tipi
                                </th>
                                <th class=""no-cursor"">
                                    Ürün Tipi
                                </th>
                                <th class=""no-cursor"">
                                    Kaynak
                                </th>
                                <th class=""no-cursor"">
                                    Ürün
                                </th>
                                <th class=""no-cursor"">
    ");
            WriteLiteral(@"                                Ad Soyad
                                </th>
                                <th class=""no-cursor"">
                                    Görev Temsilcisi
                                </th>
                                <th class=""no-cursor"">
                                    Oluşturulma Tarihi
                                </th>
                                <th class=""no-cursor"">
                                    Güncelleme Tarihi
                                </th>
                                <th class=""no-cursor"">
                                    E-mail
                                </th>
                                <th class=""no-cursor"">
                                    Telefon
                                </th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
                <div id=""dlpcReportChart"" style=""w");
            WriteLiteral("idth:100%;height:auto\" class=\"tab-pane fade\">\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n");
            EndContext();
            DefineSection("scripts", async() => {
                BeginContext(6384, 2, true);
                WriteLiteral("\r\n");
                EndContext();
                BeginContext(6386, 94, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7086898b43a57dab0f7fcc54e6949928aab08bec13377", async() => {
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
                BeginContext(6480, 2, true);
                WriteLiteral("\r\n");
                EndContext();
                BeginContext(6482, 74, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7086898b43a57dab0f7fcc54e6949928aab08bec14716", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(6556, 2, true);
                WriteLiteral("\r\n");
                EndContext();
                BeginContext(6558, 58, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7086898b43a57dab0f7fcc54e6949928aab08bec16055", async() => {
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
                BeginContext(6616, 2, true);
                WriteLiteral("\r\n");
                EndContext();
                BeginContext(6618, 63, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7086898b43a57dab0f7fcc54e6949928aab08bec17307", async() => {
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
                BeginContext(6681, 2, true);
                WriteLiteral("\r\n");
                EndContext();
                BeginContext(6683, 63, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "7086898b43a57dab0f7fcc54e6949928aab08bec18559", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(6746, 2, true);
                WriteLiteral("\r\n");
                EndContext();
                BeginContext(6748, 74, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "7086898b43a57dab0f7fcc54e6949928aab08bec19811", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_6);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_7);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(6822, 2, true);
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
