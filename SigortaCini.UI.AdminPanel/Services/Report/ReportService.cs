using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Report;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;

namespace SigortaCini.UI.AdminPanel.Services.Report
{
    public interface IReportService
    {
        ApiResult<ProductReportResponseDTO> ProductReport(ProductReportRequestDTO input);
        ApiResult<CompanyReportResponseDTO> CompanyReport(CompanyReportRequestDTO input);
    }

    public class ReportService : IReportService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public ReportService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<ProductReportResponseDTO> ProductReport(ProductReportRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<ProductReportResponseDTO>>("report/ProductReport", input);
        }

        public ApiResult<CompanyReportResponseDTO> CompanyReport(CompanyReportRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<CompanyReportResponseDTO>>("report/CompanyReport", input);
        }
    }
}
