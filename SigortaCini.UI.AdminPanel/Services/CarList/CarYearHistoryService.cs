using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.CarList;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.CarList
{
    public interface ICarYearHistoryService
    {
        ApiResult<IEnumerable<CarYearHistoryResponseDTO>> GetAll(CarYearHistoryRequestDTO model);
    }
    public class CarYearHistoryService : ICarYearHistoryService,IScopedService
    {
        readonly RestfulClient _restfulClient;
        public CarYearHistoryService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<CarYearHistoryResponseDTO>> GetAll(CarYearHistoryRequestDTO model)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CarYearHistoryResponseDTO>>>("car/caryearhistory/getall");
        }
    }
}
