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
    public interface ICarBrandParameterService
    {
        ApiResult<CarBrandParameterResponseDTO> Create(CarBrandParameterRequestDTO model);
        ApiResult<IEnumerable<CarBrandParameterResponseDTO>> GetAll();
        ApiResult<CarBrandParameterResponseDTO> Update(CarBrandParameterRequestDTO model);
    }
    public class CarBrandParameterService : ICarBrandParameterService,IScopedService
    {
        readonly RestfulClient _resutfulClient;

        public CarBrandParameterService()
        {
            _resutfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<CarBrandParameterResponseDTO> Create(CarBrandParameterRequestDTO model)
        {
            return _resutfulClient.Post<ApiResult<CarBrandParameterResponseDTO>>("car/carbrandparameter", model);            
        }

        public ApiResult<IEnumerable<CarBrandParameterResponseDTO>> GetAll()
        {
            return _resutfulClient.Get<ApiResult<IEnumerable<CarBrandParameterResponseDTO>>>("car/carbrandparameter/getall");
        }

        public ApiResult<CarBrandParameterResponseDTO> Update(CarBrandParameterRequestDTO model)
        {
            return _resutfulClient.Put<ApiResult<CarBrandParameterResponseDTO>>("car/carbrandparameter");
        }
    }
}
