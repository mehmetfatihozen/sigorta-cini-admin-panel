#pragma checksum "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\CampaignCode\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "e51cdfd1493148058125a95eda10174d935bffc1"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_CampaignCode_Index), @"mvc.1.0.view", @"/Views/CampaignCode/Index.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/CampaignCode/Index.cshtml", typeof(AspNetCore.Views_CampaignCode_Index))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"e51cdfd1493148058125a95eda10174d935bffc1", @"/Views/CampaignCode/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8d38270f5d8a4997c1ce692136e905eecd661704", @"/Views/_ViewImports.cshtml")]
    public class Views_CampaignCode_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", new global::Microsoft.AspNetCore.Html.HtmlString("text/javascript"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/campaigncode/campaigncode.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
#line 2 "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\CampaignCode\Index.cshtml"
  
    ViewData["Title"] = "Organizasyon";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
            BeginContext(97, 6311, true);
            WriteLiteral(@"
<div class=""col-md-12 col-sm-12 col-xs-12 row top_band"">
    <div class=""col-md-4 col-sm-4 col-xs-4 text-left caption p-d-0"">
        Organizasyon
    </div>
    <div class=""col-md-8 col-sm-8 col-xs-8 text-right p-d-0"">
        <div class=""actions"">
            <a href=""javascript:;"" class=""btn btn-default btn-sm bg-black"" id=""btnOrganizationAdd"">
                <i class=""fa fa-plus-circle pink-color""></i>
                Organizasyon Ekle
            </a>

        </div>
    </div>
</div>
<div class=""col-md-12 col-sm-12 col-xs-12 row"">
    <div class=""portlet box yellow"">
        <div class=""portlet-body"">
            <table class=""table table-striped table-bordered table-hover"" id=""organizationTable"">
                <thead>
                    <tr class=""table_thead_back"">

                        <th class=""no-cursor"">
                            Organizasyon Kodu
                        </th>
                        <th class=""no-cursor"">
                            Organizasy");
            WriteLiteral(@"on Adı
                        </th>
                        <th class=""no-cursor"">
                            Organizasyon Tel
                        </th>
                        <th class=""no-cursor"">
                            Organizasyon Email
                        </th>


                    </tr>
                </thead>
                <tbody></tbody>
            </table>


        </div>
    </div>
</div>

<div class=""col-md-12 col-sm-12 col-xs-12 row"">
    <input type=""file"" id=""campainFile"" style=""width: 15%;"" class=""btn btn-default btn-sm bg-black"" />
</div>

<!-- Modal content-->
<div class=""modal fade"" id=""organizationModal"" role=""dialog"" style=""display: none;"">
    <div class=""modal-dialog"">

        <!-- Modal content-->
        <div class=""modal-content"">
            <div class=""modal-header"">
                <i class=""fa fa-times modal-close-icon"" data-dismiss=""modal""></i>
                <h4 class=""modal-title"">
                    Organizasyon Ekle
 ");
            WriteLiteral(@"               </h4>
            </div>
            <div class=""modal-body"">


                <div class=""col-md-6"">
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Organizasyon Kodu</label>
                        <input type=""text"" class=""form-control input"" placeholder=""Organizasyon Kodu"" id=""organization_code"">
                    </div>
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Organizasyon Tel</label>
                        <input type=""text"" class=""form-control input"" placeholder=""Organizasyon Tel"" id=""organization_tel"">
                    </div>
                </div>
                <div class=""col-md-6"">
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Organizasyon Adı</label>
                        <input type=""text"" class=""form-control input"" placeholder=""Organizasyon Adı"" id=""organization_name");
            WriteLiteral(@""">
                    </div>
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Organizasyon Email</label>
                        <input type=""text"" class=""form-control input"" placeholder=""Organizasyon Email"" id=""organization_email"">
                    </div>
                </div>

            </div>
            <div class=""modal-footer"">
                <div class=""col-md-6"">
                    <button type=""button"" class=""btn btn-success pull-left width-100 fnt-14"" id=""btnAdd"">Ekle</button>
                </div>
                <div class=""col-md-6"">
                    <button type=""button"" class=""btn btn-danger pull-right width-100 fnt-14"" data-dismiss=""modal"">Kapat</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class=""modal fade"" id=""organizationUpdateModal"" role=""dialog"" style=""display: none;"">
    <div class=""modal-dialog"">

        <!-- Modal content-->
        <div class=");
            WriteLiteral(@"""modal-content"">
            <div class=""modal-header"">
                <i class=""fa fa-times modal-close-icon"" data-dismiss=""modal""></i>
                <h4 class=""modal-title"">
                    Organizasyon Güncelle

                </h4>
            </div>
            <div class=""modal-body"">
                <div class=""col-md-6"">
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Organizasyon Kodu</label>
                        <input type=""text"" class=""form-control input"" placeholder=""Organizasyon Kodu"" id=""organization_code_update"">
                    </div>
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Organizasyon Tel</label>
                        <input type=""text"" class=""form-control input"" placeholder=""__-__-____"" id=""organization_tel_update"">
                    </div>
                </div>
                <div class=""col-md-6"">
                    <div");
            WriteLiteral(@" class=""form-group col-md-12"">
                        <label class=""control-label"">Organizasyon Adı</label>
                        <input type=""text"" class=""form-control input"" placeholder=""Organizasyon Adı"" id=""organization_name_update"">
                    </div>
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Organizasyon Email</label>
                        <input type=""text"" class=""form-control input"" placeholder=""Organizasyon Email"" id=""organization_email_update"">
                    </div>
                </div>
                
                

                <input type=""hidden"" id=""orId"">

            </div>
            <div class=""modal-footer"">
                <div class=""col-md-6"">
                    <button type=""button"" class=""btn btn-success pull-left width-100 fnt-14"" id=""btnUpdate"">Güncelle</button>
                </div>
                <div class=""col-md-6"">
                    <button type=""button"" class");
            WriteLiteral("=\"btn btn-danger pull-right width-100 fnt-14\" data-dismiss=\"modal\">Kapat</button>\r\n                </div>\r\n            </div>\r\n        </div>\r\n    </div>\r\n</div>\r\n\r\n\r\n");
            EndContext();
            DefineSection("scripts", async() => {
                BeginContext(6426, 11, true);
                WriteLiteral("\r\n   \r\n    ");
                EndContext();
                BeginContext(6437, 80, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "e51cdfd1493148058125a95eda10174d935bffc111369", async() => {
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
                BeginContext(6517, 4, true);
                WriteLiteral("\r\n\r\n");
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