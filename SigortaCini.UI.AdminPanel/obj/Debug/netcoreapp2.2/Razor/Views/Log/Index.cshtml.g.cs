#pragma checksum "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\Log\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "f8cc61ba1a00cba6de5ef88b9c30b19891acdae7"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Log_Index), @"mvc.1.0.view", @"/Views/Log/Index.cshtml")]
[assembly:global::Microsoft.AspNetCore.Mvc.Razor.Compilation.RazorViewAttribute(@"/Views/Log/Index.cshtml", typeof(AspNetCore.Views_Log_Index))]
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
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"f8cc61ba1a00cba6de5ef88b9c30b19891acdae7", @"/Views/Log/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"8d38270f5d8a4997c1ce692136e905eecd661704", @"/Views/_ViewImports.cshtml")]
    public class Views_Log_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("rel", new global::Microsoft.AspNetCore.Html.HtmlString("stylesheet"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", new global::Microsoft.AspNetCore.Html.HtmlString("text/css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/metronic/assets/global/plugins/jsonViewer/jjsonviewer.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_3 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("href", new global::Microsoft.AspNetCore.Html.HtmlString("~/metronic/assets/global/plugins/xmlViewer/css/simpleXML.css"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_4 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("value", "", global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_5 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("type", new global::Microsoft.AspNetCore.Html.HtmlString("text/javascript"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_6 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/metronic/assets/global/plugins/jsonViewer/jjsonviewer.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_7 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/metronic/assets/global/plugins/xmlViewer/js/simpleXML.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_8 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/js/log/log.js"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
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
        private global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
            BeginContext(0, 2, true);
            WriteLiteral("\r\n");
            EndContext();
#line 2 "C:\Users\Fatih\Source\Repos\SigortaCini.UI.AdminPanel\SigortaCini.UI.AdminPanel\Views\Log\Index.cshtml"
  
    ViewData["Title"] = "Log İşlemleri";
    Layout = "~/Views/Shared/_Layout.cshtml";

#line default
#line hidden
            DefineSection("styles", async() => {
                BeginContext(115, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(121, 108, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "f8cc61ba1a00cba6de5ef88b9c30b19891acdae77122", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
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
                BeginContext(229, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(235, 109, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("link", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.SelfClosing, "f8cc61ba1a00cba6de5ef88b9c30b19891acdae78542", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
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
                BeginContext(344, 4, true);
                WriteLiteral("\r\n\r\n");
                EndContext();
            }
            );
            BeginContext(351, 1956, true);
            WriteLiteral(@"<div class=""col-md-12 col-sm-12 col-xs-12  top_band"">
    <div class=""col-md-12 col-sm-12 col-xs-12 text-left caption p-d-0"">
        Log İşlemleri
    </div>

</div>
<br />
<div class=""col-md-12 col-sm-12 col-xs-12"">

    <ul class=""nav nav-pills nav-justified"">
        <li class=""active border-1-black""><a data-toggle=""pill"" href=""#b2b"">B2B</a></li>
        <li class=""border-1-black""><a data-toggle=""pill"" id=""changeTabB2C"" href=""#b2c"">B2C</a></li>
        <li class=""border-1-black""><a data-toggle=""pill"" id=""changeTabMQ"" href=""#mq"">MQ</a></li>
    </ul>

</div>
<div class=""col-md-12 col-sm-12 col-xs-12 "">
    <div class=""portlet box yellow"">
        <div class=""portlet-body"">
            <div class=""tab-content"">
                <div id=""b2b"" class=""tab-pane fade in active"">
                    <div class=""row"">
                        <div class=""col-md-12"">

                            <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                                <label>Anahta");
            WriteLiteral(@"r</label>
                                <input class=""form-control"" id=""typeIdB2b"" />
                            </div>
                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Başlangıç Tarihi</label>
                                <input type=""text"" id=""start_date_b2b"" class=""form-control"">
                            </div>

                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Bitiş Tarihi</label>
                                <input type=""text"" id=""end_date_b2b"" class=""form-control"">
                            </div>
                            <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                                <label>Kullanıcı</label>
                                <select class=""form-control"" id=""userlistb2b"">
                                    ");
            EndContext();
            BeginContext(2307, 33, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f8cc61ba1a00cba6de5ef88b9c30b19891acdae712150", async() => {
                BeginContext(2324, 7, true);
                WriteLiteral("Seçiniz");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(2340, 2721, true);
            WriteLiteral(@"
                                </select>
                            </div>
                            <div class=""col-md-1 col-sm-1 col-xs-6 form-group margin-top-25"">
                                <button id=""btnListb2b"" class=""btn btn-default btn-sm bg-black"">Listele</button>
                            </div>
                            <div class=""col-md-1 col-sm-1 col-xs-6 form-group margin-top-25"">
                                <button id=""btnClearb2b"" class=""btn btn-default btn-sm bg-red border-8-radius"">Temizle</button>
                            </div>
                        </div>
                    </div>

                    <table class=""table table-striped table-bordered table-hover"" id=""logTableB2b"">
                        <thead>
                            <tr class=""table_thead_back"">

                                <th class=""no-cursor"">
                                    Ortam
                                </th>
                                <th class=""");
            WriteLiteral(@"no-cursor"">
                                    IP
                                </th>
                                <th class=""no-cursor"">
                                    Hata
                                </th>
                                <th class=""no-cursor"">
                                    Zaman
                                </th>
                            </tr>
                        </thead>
                    </table>


                </div>
                <div id=""b2c"" class=""tab-pane fade"">
                    <div class=""row"">
                        <div class=""col-md-12"">
                            <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                                <label>Anahtar</label>
                                <input class=""form-control"" id=""typeIdB2c"" />

                            </div>
                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Başlangıç Ta");
            WriteLiteral(@"rihi</label>
                                <input type=""text"" id=""start_date_b2c"" class=""form-control"">
                            </div>

                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Bitiş Tarihi</label>
                                <input type=""text"" id=""end_date_b2c"" class=""form-control"">
                            </div>
                            <div class=""col-md-3 col-sm-3 col-xs-12 form-group"">
                                <label>Kullanıcı</label>
                                <select class=""form-control"" id=""userlistb2c"">
                                    ");
            EndContext();
            BeginContext(5061, 33, false);
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("option", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f8cc61ba1a00cba6de5ef88b9c30b19891acdae716375", async() => {
                BeginContext(5078, 7, true);
                WriteLiteral("Seçiniz");
                EndContext();
            }
            );
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.TagHelpers.OptionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper);
            __Microsoft_AspNetCore_Mvc_TagHelpers_OptionTagHelper.Value = (string)__tagHelperAttribute_4.Value;
            __tagHelperExecutionContext.AddTagHelperAttribute(__tagHelperAttribute_4);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            EndContext();
            BeginContext(5094, 11852, true);
            WriteLiteral(@"
                                </select>
                            </div>
                            <div class=""col-md-1 col-sm-1 col-xs-6 form-group margin-top-25"">
                                <button id=""btnListB2c"" class=""btn btn-default btn-sm bg-black "">Listele</button>
                            </div>
                            <div class=""col-md-1 col-sm-1 col-xs-6 form-group margin-top-25"">
                                <button id=""btnClearb2c"" class=""btn btn-default btn-sm bg-red  border-8-radius"">Temizle</button>
                            </div>
                        </div>
                    </div>

                    <table class=""table table-striped table-bordered table-hover"" id=""logTableB2c"">
                        <thead>
                            <tr class=""table_thead_back"">

                                <th class=""no-cursor"">
                                    Ortam
                                </th>
                                <th class");
            WriteLiteral(@"=""no-cursor"">
                                    Tip
                                </th>
                                <th class=""no-cursor"">
                                    Metot
                                </th>
                                <th class=""no-cursor"">
                                    Hata
                                </th>
                                <th class=""no-cursor"">
                                    Zaman
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>

                <div id=""mq"" class=""tab-pane fade"">
                    <div class=""row"">
                        <div class=""col-md-12"">
                            <div class=""col-md-2 col-sm-2 col-xs-12 form-group"">
                                <label>Anahtar</label>
                                <input class=""form-control"" id=""keyformq"" />

                            </di");
            WriteLiteral(@"v>
                            <div class=""col-md-4 col-sm-4 col-xs-12 form-group"">
                                <label>Başlangıç Tarihi</label>
                                <input type=""text"" id=""start_date_mq"" class=""form-control"">
                            </div>

                            <div class=""col-md-4 col-sm-4 col-xs-12 form-group"">
                                <label>Bitiş Tarihi</label>
                                <input type=""text"" id=""end_date_mq"" class=""form-control"">
                            </div>

                            <div class=""col-md-1 col-sm-1 col-xs-6 form-group margin-top-25"">
                                <button id=""btnListMq"" class=""btn btn-default btn-sm bg-black"">Listele</button>
                            </div>
                            <div class=""col-md-1 col-sm-1 col-xs-6 form-group margin-top-25"">
                                <button id=""btnClearMq"" class=""btn btn-default btn-sm bg-red border-8-radius"">Temizle</button>
   ");
            WriteLiteral(@"                         </div>
                        </div>
                    </div>

                    <table class=""table table-striped table-bordered table-hover"" id=""logTableMq"">
                        <thead>
                            <tr class=""table_thead_back"">
                                <th class=""no-cursor"">
                                    Sigorta Şirketi
                                </th>
                                <th class=""no-cursor"">
                                    Ürün Tip
                                </th>
                                <th class=""no-cursor"">
                                    Metot
                                </th>
                                <th class=""no-cursor"">
                                    Zaman
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>

        </div>
    </div>
            WriteLiteral(@"
</div>

<div class=""modal fade"" id=""resultDetailsB2b"" role=""dialog"" style=""display: none;"">
    <div class=""modal-dialog"">

        <!-- Modal content-->
        <div class=""modal-content"">
            <div class=""modal-header"">
                <i class=""fa fa-times modal-close-icon"" data-dismiss=""modal""></i>
                <h4 class=""modal-title"">Log Detay</h4>
            </div>
            <div class=""modal-body"">
                <div class=""col-md-6"">
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Ortam</label>
                        <input type=""text"" class=""form-control input"" disabled id=""enviroment"" />
                    </div>
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Metot Tipi</label>
                        <input type=""text"" class=""form-control input"" disabled id=""methodType"">
                    </div>
                    <div class=""form-group c");
            WriteLiteral(@"ol-md-12"">
                        <label class=""control-label"">Tip</label>
                        <input type=""text"" class=""form-control input"" disabled id=""typeName"">
                    </div>
                </div>
                <div class=""col-md-6"">
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">IP Adresi</label>
                        <input type=""text"" class=""form-control input"" disabled id=""ipAddress"">
                    </div>
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Kullanıcı</label>
                        <input type=""text"" class=""form-control input"" disabled id=""userId"">
                    </div>
                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Zaman</label>
                        <input type=""text"" class=""form-control input"" disabled id=""createDate"">
                    </div>
         ");
            WriteLiteral(@"       </div>
                <div class=""col-md-12"">
                    <div class=""form-group col-md-12"">
                        <div id=""jjson"" class=""jjson""></div>
                    </div>
                </div>

            </div>
            <div class=""modal-footer"">
                <div class=""col-md-12"">
                    <button type=""button"" class=""btn btn-danger pull-right width-100 fnt-14"" data-dismiss=""modal"">Kapat</button>
                </div>
            </div>
        </div>
    </div>
</div>


<div class=""modal fade"" id=""resultDetailsmq"" role=""dialog"" style=""display: none;"">
    <div class=""modal-dialog"">

        <!-- Modal content-->
        <div class=""modal-content modal-lg"">
            <div class=""modal-header"">
                <i class=""fa fa-times modal-close-icon myclose"" data-dismiss=""modal""></i>
                <h4 class=""modal-title"">Log Detay</h4>
            </div>
            <div class=""modal-body"">
                <div class=""col-md-12"">
");
            WriteLiteral(@"                    <div class=""form-group col-md-12"">
                        <label class=""control-label"">Ortam</label>
                        <textarea rows=""10"" class=""form-control no-resize"" disabled=""disabled"" id=""message""></textarea>
                    </div>

                </div>

                <div class=""xml_content hide"">
                    <div class=""col-md-6"">
                        <div class=""form-group"">
                            <div id=""xmlinput""></div>
                        </div>
                    </div>

                    <div class=""col-md-6"">
                        <div class=""form-group"">
                            <div id=""xmloutput""></div>
                        </div>
                    </div>
                </div>
                <div class=""json_content hide"">
                    <div class=""col-md-6"">
                        <div class=""form-group"">
                            <div id=""jjsonmqinput"" class=""jjson""></div>
              ");
            WriteLiteral(@"          </div>
                    </div>

                    <div class=""col-md-6"">
                        <div class=""form-group"">
                            <div id=""jjsonmqoutput"" class=""jjson""></div>
                        </div>
                    </div>
                </div>




            </div>
            <div class=""modal-footer"">
                <div class=""col-md-12"">
                    <button type=""button"" class=""btn btn-danger pull-right width-100 fnt-14 myclosemq"" data-dismiss=""modal"">Kapat</button>
                </div>
            </div>
        </div>
    </div>
</div>

<div class=""modal fade"" id=""resultDetailsB2c"" role=""dialog"" style=""display: none;"">
    <div class=""modal-dialog modal-lg"">

        <!-- Modal content-->
        <div class=""modal-content "">
            <div class=""modal-header"">
                <i class=""fa fa-times modal-close-icon"" data-dismiss=""modal""></i>
                <h4 class=""modal-title"">Log Detay</h4>
            </div");
            WriteLiteral(@">
            <div class=""modal-body"">
                <div class=""col-md-6"">
                    <div class=""form-group"">
                        <label class=""control-label"">Ortam</label>
                        <input type=""text"" class=""form-control input"" disabled id=""enviromentb2c"" />
                    </div>
                    <div class=""form-group"">
                        <label class=""control-label"">Metot Tipi</label>
                        <input type=""text"" class=""form-control input"" disabled id=""methodTypeb2c"">
                    </div>
                    <div class=""form-group"">
                        <label class=""control-label"">Tip</label>
                        <input type=""text"" class=""form-control input"" disabled id=""typeNameb2c"">
                    </div>
                </div>
                <div class=""col-md-6"">
                    <div class=""form-group"">
                        <label class=""control-label"">Tenant Token</label>
                        <inpu");
            WriteLiteral(@"t type=""text"" class=""form-control input"" disabled id=""tenant_token"">
                    </div>
                    <div class=""form-group"">
                        <label class=""control-label"">Session Id</label>
                        <input type=""text"" class=""form-control input"" disabled id=""sessionId"">
                    </div>
                    <div class=""form-group"">
                        <label class=""control-label"">Zaman</label>
                        <input type=""text"" class=""form-control input"" disabled id=""createDateb2c"">
                    </div>
                </div>
                <div class=""col-md-12"">
                    <div class=""form-group"">
                        <textarea rows=""10"" class=""form-control no-resize"" disabled=""disabled"" id=""errMessage""></textarea>
                    </div>
                </div>
                <div class=""col-md-6"">
                    <div class=""form-group"">
                        <div id=""jjsonforrequest"" class=""jjson""></di");
            WriteLiteral(@"v>
                    </div>
                </div>

                <div class=""col-md-6"">
                    <div class=""form-group"">
                        <div id=""jjsonforresponse"" class=""jjson""></div>
                    </div>
                </div>

            </div>
            <div class=""modal-footer"">
                <div class=""col-md-12"">
                    <button type=""button"" class=""btn btn-danger pull-right width-100 fnt-14"" data-dismiss=""modal"">Kapat</button>
                </div>
            </div>
        </div>
    </div>
</div>



");
            EndContext();
            DefineSection("scripts", async() => {
                BeginContext(16964, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(16970, 105, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f8cc61ba1a00cba6de5ef88b9c30b19891acdae730530", async() => {
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
                BeginContext(17075, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(17081, 105, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f8cc61ba1a00cba6de5ef88b9c30b19891acdae731876", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_5);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_7);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(17186, 6, true);
                WriteLiteral("\r\n    ");
                EndContext();
                BeginContext(17192, 39, false);
                __tagHelperExecutionContext = __tagHelperScopeManager.Begin("script", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagAndEndTag, "f8cc61ba1a00cba6de5ef88b9c30b19891acdae733221", async() => {
                }
                );
                __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
                __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
                __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_8);
                await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
                if (!__tagHelperExecutionContext.Output.IsContentModified)
                {
                    await __tagHelperExecutionContext.SetOutputContentAsync();
                }
                Write(__tagHelperExecutionContext.Output);
                __tagHelperExecutionContext = __tagHelperScopeManager.End();
                EndContext();
                BeginContext(17231, 2, true);
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