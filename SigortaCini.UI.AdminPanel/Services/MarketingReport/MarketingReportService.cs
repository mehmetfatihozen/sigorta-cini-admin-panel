using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Marketing;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.MarketingReport
{
    public interface IMarketingReportService
    {
        ApiResult<List<MarketingReportResponseDTO>> GetMarketingReport(MarketingReportRequestDTO input);
    }

    public class MarketingReportService : IMarketingReportService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public MarketingReportService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<List<MarketingReportResponseDTO>> GetMarketingReport(MarketingReportRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<List<MarketingReportResponseDTO>>>("MarketingReport/GetMarketingReport", input);
        }
    }
}
