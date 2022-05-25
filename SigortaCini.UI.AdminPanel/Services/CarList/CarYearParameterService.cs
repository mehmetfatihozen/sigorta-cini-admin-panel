using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.CarList;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.CarList
{
    public interface ICarYearParameterService
    {
        ApiResult<CarYearParameterResponseDTO> Create(CarYearParameterRequestDTO model);
    }
    public class CarYearParameterService
    {
        readonly RestfulClient _restfulClient;
        public CarYearParameterService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<CarYearParameterResponseDTO> Create(CarYearParameterRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<CarYearParameterResponseDTO>>("car/caryearparameter");
        }
    }
}
