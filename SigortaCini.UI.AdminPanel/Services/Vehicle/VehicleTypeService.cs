using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Vehicle.Type;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Vehicle
{
    public interface IVehicleTypeService
    {
        ApiResult<VehicleTypeDTO> Create(VehicleTypeDTO input);
        ApiResult<VehicleTypeDTO> Update(VehicleTypeDTO input);
        void Delete(uint id);
        ApiResult<IEnumerable<VehicleTypeDTO>> GetAll();
        ApiResult<VehicleTypeDTO> Get(uint id);
    }
    public class VehicleTypeService : IVehicleTypeService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public VehicleTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<VehicleTypeDTO> Create(VehicleTypeDTO input)
        {
            return _restfulClient.Post<ApiResult<VehicleTypeDTO>>("vehicle/type/", input);
        }

        public void Delete(uint id)
        {
            _restfulClient.Delete<ApiResult<VehicleTypeDTO>>("vehicle/type/" + id.ToString(), id);
        }

        public ApiResult<VehicleTypeDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<VehicleTypeDTO>>("vehicle/type/" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<VehicleTypeDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<VehicleTypeDTO>>>("vehicle/type/getAll");
        }

        public ApiResult<VehicleTypeDTO> Update(VehicleTypeDTO input)
        {
            return _restfulClient.Put<ApiResult<VehicleTypeDTO>>("vehicle/type/" + input.VehicleTypeId.ToString(), input);
        }
    }
}
