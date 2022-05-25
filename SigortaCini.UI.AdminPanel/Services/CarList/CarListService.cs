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
    public interface ICarListService
    {
        ApiResult<IEnumerable<CarListViewResponseDTO>> GetAll(uint? brandId, string typeCode);
        ApiResult<CarListViewResponseDTO> Update(CarListViewRequestDTO model);
        ApiResult<CarListSearchResponseDTO> Search(CarListSearchRequestDTO model);
        ApiResult<bool> ImportCarsFromExcel(CarListImportDTO file);
    }

    public class CarListService : ICarListService, IScopedService
    {
        readonly RestfulClient _restfulClient;
        public CarListService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<CarListViewResponseDTO>> GetAll(uint? brandId, string typeCode)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CarListViewResponseDTO>>>("car/carlist/getall", new { brandId, typeCode });
        }

        public ApiResult<CarListSearchResponseDTO> Search(CarListSearchRequestDTO model)
        {
            return _restfulClient.Post<ApiResult<CarListSearchResponseDTO>>("car/carlist/search", model);
        }

        public ApiResult<CarListViewResponseDTO> Update(CarListViewRequestDTO model)
        {
            return _restfulClient.Put<ApiResult<CarListViewResponseDTO>>("car/carlist", model);
        }

        public ApiResult<bool> ImportCarsFromExcel(CarListImportDTO file)
        {
            return _restfulClient.Post<ApiResult<bool>>($"car/carlist/ImportCarsFromExcel", file);
        }
    }
}
