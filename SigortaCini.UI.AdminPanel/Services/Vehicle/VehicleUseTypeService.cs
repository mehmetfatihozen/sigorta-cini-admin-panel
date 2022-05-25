using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Vehicle.UseType;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Vehicle
{
    public interface IVehicleUseTypeService
    {
        ApiResult<VehicleUseTypeCreateResponseDTO> Create(VehicleUseTypeCreateRequestDTO input);
        ApiResult<VehicleUseTypeUpdateResponseDTO> Update(uint id, VehicleUseTypeUpdateRequestDTO input);
        void Delete(uint id);
        ApiResult<IEnumerable<VehicleUseTypeDTO>> GetAll();
        ApiResult<VehicleUseTypeDTO> Get(uint id);
    }
    public class VehicleUseTypeService : IVehicleUseTypeService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public VehicleUseTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<VehicleUseTypeCreateResponseDTO> Create(VehicleUseTypeCreateRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<VehicleUseTypeCreateResponseDTO>>("vehicle/usetype/", input);
        }

        public void Delete(uint id)
        {
            _restfulClient.Delete<ApiResult<VehicleUseTypeDTO>>("vehicle/usetype/" + id.ToString(), id);
        }

        public ApiResult<VehicleUseTypeDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<VehicleUseTypeDTO>>("vehicle/usetype/" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<VehicleUseTypeDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<VehicleUseTypeDTO>>>("vehicle/usetype/getAll");
        }

        public ApiResult<VehicleUseTypeUpdateResponseDTO> Update(uint id, VehicleUseTypeUpdateRequestDTO input)
        {
            return _restfulClient.Put<ApiResult<VehicleUseTypeUpdateResponseDTO>>("vehicle/usetype/" + id.ToString(), input);
        }
    }
}
