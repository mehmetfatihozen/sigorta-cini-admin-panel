using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.OfferReport;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.OfferReport
{
    public interface IOfferReportService
    {
        ApiResult<IEnumerable<OfferReportByProductDTO>> GetOfferReportByProduct(OfferReportByProductFilterDTO input);
        ApiResult<IEnumerable<OfferReportByCompanyDTO>> GetOfferReportByCompany(OfferReportByCompanyFilterDTO input);
        ApiResult<string> CreateOfferReportExcelFile(OfferReportByProductFilterDTO input);
    }

    public class OfferReportService : IOfferReportService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public OfferReportService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<IEnumerable<OfferReportByProductDTO>> GetOfferReportByProduct(OfferReportByProductFilterDTO input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<OfferReportByProductDTO>>>("OfferReport/GetOfferReportByProduct", input);
        }

        public ApiResult<IEnumerable<OfferReportByCompanyDTO>> GetOfferReportByCompany(OfferReportByCompanyFilterDTO input)
        {
            return _restfulClient.Post<ApiResult<IEnumerable<OfferReportByCompanyDTO>>>("OfferReport/GetOfferReportByCompany", input);
        }

        public ApiResult<string> CreateOfferReportExcelFile(OfferReportByProductFilterDTO input)
        {
            return _restfulClient.Post<ApiResult<string>>("OfferReport/CreateOfferReportExcelFile", input);
        }
    }
}
