#pragma checksum "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\Benchmark\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "9a3e4452d525c1acbe4e4a68fab7911369183cec"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Benchmark_Index), @"mvc.1.0.view", @"/Views/Benchmark/Index.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Benchmark/Index.cshtml", typeof(AspNetCore.Views_Benchmark_Index))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"9a3e4452d525c1acbe4e4a68fab7911369183cec", @"/Views/Benchmark/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8d38270f5d8a4997c1ce692136e905eecd661704", @"/Views/_ViewImports.cshtml")]
    public class Views_Benchmark_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", new global::Microsoft.AspNetCore.Html.HtmlString("text/javascript"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/metronic/assets/global/plugins/googleChart.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/benchmark/benchmark.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\Benchmark\Index.cshtml"
  
    ViewData["Title"] = "Benchmark";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
            BeginContext(94, 1576, true);
            WriteLiteral(@"
<div class=""col-md-12 col-sm-12 col-xs-12  top_band"">
    <div class=""col-md-12 col-sm-12 col-xs-12 text-left caption p-d-0"">
        Benchmark
    </div>

</div>

<br />

<div class=""col-md-12 col-sm-12 col-xs-12"">
    <ul class=""nav nav-pills nav-justified"">
        <li class=""active border-1-black""><a id=""product_content"" data-toggle=""pill"" href=""#product"">??r??n Benchmark</a></li>
        <li class=""border-1-black""><a id=""company_content"" data-toggle=""pill"" href=""#company"">??irket Benchmark</a></li>
    </ul>
</div>
<div class=""col-md-12 col-sm-12 col-xs-12"">
    <div class=""portlet box yellow"">
        <div class=""portlet-body"">
            <div class=""tab-content"">
                <div id=""product"" class=""tab-pane fade in active"">
                    <div class=""row"">
                        <div class=""col-md-12"">

                            <div class=""col-md-5 col-sm-5 col-xs-12 form-group"">
                                <label>??r??n</label>
                                <");
            WriteLiteral(@"select class=""form-control"" data-placeholder=""Se??iniz..."" multiple id=""product_name"">
                                </select>
                                <br />
                                <input type=""checkbox"" id=""selectAllProducts"">Hepsini Se??
                            </div>
                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Ortam</label>
                                <select class=""form-control"" id=""tenantProducts"">
                                    ");
            EndContext();
            BeginContext(1670, 33, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9a3e4452d525c1acbe4e4a68fab7911369183cec6870", async() => {
                BeginContext(1687, 7, true);
                WriteLiteral("Se??iniz");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(1703, 4315, true);
            WriteLiteral(@"
                                </select>
                            </div>
                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Ba??lang???? Tarihi</label>
                                <input type=""text"" id=""start_date_product"" class=""form-control"">
                            </div>
                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Biti?? Tarihi</label>
                                <input type=""text"" id=""end_date_product"" class=""form-control"">
                            </div>
                            <div class=""col-md-1 col-sm-1 col-xs-12 form-group margin-top-25"">
                                <button id=""btnListProduct"" class=""btn btn-success border-8-radius"">Listele</button>
                            </div>
               
                        </div>
                    </div>
                    <div id=""chart_div_product"" class=""hide""");
            WriteLiteral(@"></div>
                    <div id=""product_divider"" class=""col-md-12 p-d-0 hr hide""></div>
                    <div id=""product_table"" class=""hide"">
                        <table class=""table table-striped table-bordered table-hover"" id=""productTable"">
                            <thead>
                                <tr class=""table_thead_back"">
                                    <th class=""no-cursor"">
                                        Kullan??c?? Ad
                                    </th>
                                    <th class=""no-cursor"">
                                        Ad
                                    </th>
                                    <th class=""no-cursor"">
                                        Soyad
                                    </th>
                                    <th class=""no-cursor"">
                                        Ortam Ad
                                    </th>
                                    <th class=""no-cursor""");
            WriteLiteral(@">
                                        ??r??n Ad
                                    </th>
                                    <th class=""no-cursor"">
                                        Task Say??s??
                                    </th>
                                    <th class=""no-cursor"">
                                        Ba??ar??s??z Teklif Say??s??
                                    </th>
                                    <th class=""no-cursor"">
                                        Ba??ar??l?? Teklif Say??s??
                                    </th>
                                    <th class=""no-cursor"">
                                        Poli??e Say??s??
                                    </th>
                                    <th class=""no-cursor"">
                                        Poli??ele??tirme Oran??
                                    </th>
                                    <th class=""no-cursor"">
                                        Ba??lang???? Tarih");
            WriteLiteral(@"i
                                    </th>
                                    <th class=""no-cursor"">
                                        Biti?? Tarihi
                                    </th>

                                </tr>
                            </thead>
                        </table>
                    </div>

                </div>
                <div id=""company"" class=""tab-pane fade"">
                    <div class=""row"">
                        <div class=""col-md-12"">
                            <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                                <label>??irket</label>
                                <select class=""form-control"" data-placeholder=""Se??iniz..."" multiple id=""company_name"">
                                </select>
                                <br />
                                <input type=""checkbox"" id=""selectAllCompanies"">Hepsini Se??
                            </div>
                            <div class=""");
            WriteLiteral("col-md-2 col-sm-2 col-xs-12 form-group\">\r\n                                <label>??r??n</label>\r\n                                <select class=\"form-control\" id=\"productForCompanies\">\r\n                                    ");
            EndContext();
            BeginContext(6018, 33, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9a3e4452d525c1acbe4e4a68fab7911369183cec12785", async() => {
                BeginContext(6035, 7, true);
                WriteLiteral("Se??iniz");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(6051, 337, true);
            WriteLiteral(@"
                                </select>
                            </div>
                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Ortam</label>
                                <select class=""form-control"" id=""tenantCompanies"">
                                    ");
            EndContext();
            BeginContext(6388, 33, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9a3e4452d525c1acbe4e4a68fab7911369183cec14505", async() => {
                BeginContext(6405, 7, true);
                WriteLiteral("Se??iniz");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_0.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_0);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(6421, 3669, true);
            WriteLiteral(@"
                                </select>
                            </div>
                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Ba??lang???? Tarihi</label>
                                <input type=""text"" id=""start_date_companies"" class=""form-control"">
                            </div>
                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Biti?? Tarihi</label>
                                <input type=""text"" id=""end_date_companies"" class=""form-control"">
                            </div>
                            <div class=""col-md-1 col-sm-1 col-xs-12 form-group margin-top-25"">
                                <button id=""btnListCompany"" class=""btn btn-success border-8-radius"">Listele</button>
                            </div>
                          
                        </div>
                    </div>

                    <div id=""chart_div_comp");
            WriteLiteral(@"any"" class=""hide""></div>
                    <div id=""company_divider"" class=""col-md-12 p-d-0 hr hide""></div>
                    <div id=""company_table"" class=""hide"">
                        <table class=""table table-striped table-bordered table-hover"" id=""companyTable"">
                            <thead>
                                <tr class=""table_thead_back"">
                                    <th class=""no-cursor"">
                                        Kullan??c?? Ad
                                    </th>
                                    <th class=""no-cursor"">
                                        Ad
                                    </th>
                                    <th class=""no-cursor"">
                                        Soyad
                                    </th>
                                    <th class=""no-cursor"">
                                        Ortam Ad
                                    </th>
                                    <th ");
            WriteLiteral(@"class=""no-cursor"">
                                        ??irket Ad
                                    </th>
                                    <th class=""no-cursor"">
                                        ??r??n Ad
                                    </th>
                                    <th class=""no-cursor"">
                                        Task Say??s??
                                    </th>
                                    <th class=""no-cursor"">
                                        Ba??ar??s??z Teklif Say??s??
                                    </th>
                                    <th class=""no-cursor"">
                                        Ba??ar??l?? Teklif Say??s??
                                    </th>
                                    <th class=""no-cursor"">
                                        Poli??e Say??s??
                                    </th>
                                    <th class=""no-cursor"">
                                        Poli??ele??");
            WriteLiteral(@"tirme Oran??
                                    </th>
                                    <th class=""no-cursor"">
                                        Ba??lang???? Tarihi
                                    </th>
                                    <th class=""no-cursor"">
                                        Biti?? Tarihi
                                    </th>

                                </tr>
                            </thead>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

");
            EndContext();
            DefineSection("scripts", async() => {
                BeginContext(10108, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(10114, 94, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9a3e4452d525c1acbe4e4a68fab7911369183cec19895", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(10208, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(10214, 74, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "9a3e4452d525c1acbe4e4a68fab7911369183cec21240", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_3);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(10288, 2, true);
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
