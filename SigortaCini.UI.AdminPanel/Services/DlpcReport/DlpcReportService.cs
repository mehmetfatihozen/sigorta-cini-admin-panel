using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.DlpcReport;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;

namespace SigortaCini.UI.AdminPanel.Services.DlpcReport
{
    public interface IDlpcReportService
    {
        ApiResult<DlpcReportResponseDTO> GetDLPCReport(DlpcReportRequestDTO input);
    }

    public class DlpcReportService : IDlpcReportService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public DlpcReportService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<DlpcReportResponseDTO> GetDLPCReport(DlpcReportRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<DlpcReportResponseDTO>>("DlpcReport/GetDLPCReport", input);
        }
    }
}
