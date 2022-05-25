using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Person;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Person
{
    public interface IPersonService
    {
        ApiResult<IEnumerable<PersonTypeDTO>> GetPersonTypesAsTree();
        ApiResult<IEnumerable<PersonTypeActivityDTO>> GetPersonTypeActivities();
        ApiResult<IEnumerable<PersonTypeDTO>> GetPersonTypes();
        ApiResult<InsertUpdatePersonTypeResponse> InsertUpdatePersonType(InsertUpdatePersonTypeRequest request);
        ApiResult<InsertUpdatePersonTypeActivityResponse> InsertUpdatePersonTypeActivity(InsertUpdatePersonTypeActivityRequest request);
        ApiResult<IEnumerable<PersonDTO>> GetAll();
        ApiResult<PersonResponseDTO> InsertOrUpdatePerson(PersonRequestDTO input);
        ApiResult<PersonResponseDTO> GetPersonById(uint id);
    }
    public class PersonService : IPersonService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public PersonService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<IEnumerable<PersonTypeDTO>> GetPersonTypesAsTree()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<PersonTypeDTO>>>("person/getpersontypesastree", null);
        }

        public ApiResult<IEnumerable<PersonTypeActivityDTO>> GetPersonTypeActivities()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<PersonTypeActivityDTO>>>("person/getpersontypeactivities", null);
        }

        public ApiResult<IEnumerable<PersonTypeDTO>> GetPersonTypes()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<PersonTypeDTO>>>("person/getpersontypes", null);
        }

        public ApiResult<InsertUpdatePersonTypeResponse> InsertUpdatePersonType(InsertUpdatePersonTypeRequest request)
        {
            return _restfulClient.Post<ApiResult<InsertUpdatePersonTypeResponse>>("person/insertupdatepersontype", request);
        }

        public ApiResult<InsertUpdatePersonTypeActivityResponse> InsertUpdatePersonTypeActivity(InsertUpdatePersonTypeActivityRequest request)
        {
            return _restfulClient.Post<ApiResult<InsertUpdatePersonTypeActivityResponse>>("person/insertupdatepersontypeactivity", request);
        }

        public ApiResult<IEnumerable<PersonDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<PersonDTO>>>("person/getall");
        }

        public ApiResult<PersonResponseDTO> InsertOrUpdatePerson(PersonRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<PersonResponseDTO>>("person/insertorupdateperson", input);
        }

        public ApiResult<PersonResponseDTO> GetPersonById(uint id)
        {
            return _restfulClient.Get<ApiResult<PersonResponseDTO>>("person/getpersonbyid?id=" + id.ToString());
        }
    }
}
