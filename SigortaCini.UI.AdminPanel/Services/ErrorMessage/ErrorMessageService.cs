using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.ErrorMessage;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.ErrorMessage
{
    public interface IErrorMessageService
    {
        ApiResult<IEnumerable<ErrorMessageDTO>> GetAll();
        ApiResult<ErrorMessageDTO> GetById(uint id);
        ApiResult<ErrorMessageDTO> Create(ErrorMessageDTO model);
        ApiResult<ErrorMessageDTO> Update(ErrorMessageDTO model);
        ApiResult<bool> Delete(uint id);
    }

    public class ErrorMessageService : IErrorMessageService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public ErrorMessageService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<IEnumerable<ErrorMessageDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<ErrorMessageDTO>>>("ErrorMessage/GetAll");
        }

        public ApiResult<ErrorMessageDTO> GetById(uint id)
        {
            return _restfulClient.Get<ApiResult<ErrorMessageDTO>>("ErrorMessage/GetById", new { id });
        }

        public ApiResult<ErrorMessageDTO> Create(ErrorMessageDTO model)
        {
            return _restfulClient.Post<ApiResult<ErrorMessageDTO>>("ErrorMessage/Create", model);
        }

        public ApiResult<ErrorMessageDTO> Update(ErrorMessageDTO model)
        {
            return _restfulClient.Put<ApiResult<ErrorMessageDTO>>("ErrorMessage/Update", model);
        }

        public ApiResult<bool> Delete(uint id)
        {
            return _restfulClient.Delete<ApiResult<bool>>("ErrorMessage/" + id.ToString(), id);
        }
    }
}
