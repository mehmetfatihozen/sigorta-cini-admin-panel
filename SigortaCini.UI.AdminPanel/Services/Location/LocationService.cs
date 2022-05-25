using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Location;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Location
{
    public interface ILocationService
    {
        ApiResult<IEnumerable<CityDTO>> GetAllCities();
        ApiResult<IEnumerable<CityDTO>> GetCitiesByCountryId(int id);
        ApiResult<IEnumerable<CountryDTO>> GetAllCountries();
        ApiResult<IEnumerable<DistrictDTO>> GetDistrictByCityId(int id);
    }
    public class LocationService : ILocationService, IScopedService
    {

        readonly RestfulClient _restfulClient;

        public LocationService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<CityDTO>> GetAllCities()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CityDTO>>>("location/GetAllCities");
        }

        public ApiResult<IEnumerable<CountryDTO>> GetAllCountries()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CountryDTO>>>("location/GetAllCountries");
        }

        public ApiResult<IEnumerable<CityDTO>> GetCitiesByCountryId(int id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<CityDTO>>>("location/GetCitiesByCountryId?id=" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<DistrictDTO>> GetDistrictByCityId(int id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<DistrictDTO>>>("location/GetDistrictByCityId?id=" + id.ToString(), null);
        }
    }
}
