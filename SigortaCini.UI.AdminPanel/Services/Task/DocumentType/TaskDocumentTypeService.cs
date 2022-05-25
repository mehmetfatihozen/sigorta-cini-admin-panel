using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.TaskDocument.Type;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Services.Task.DocumentType
{
    public interface ITaskDocumentTypeService
    {
        ApiResult<TaskDocumentTypeCreateResponseDTO> Create(TaskDocumentTypeCreateRequestDTO input);
        ApiResult<TaskDocumentTypeUpdateResponseDTO> Update(uint id, TaskDocumentTypeUpdateRequest input);
        void Delete(uint id);
        ApiResult<IEnumerable<TaskDocumentTypeDTO>> GetAll();
        ApiResult<TaskDocumentTypeDTO> Get(uint id);
    }
    public class TaskDocumentTypeService : ITaskDocumentTypeService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public TaskDocumentTypeService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<TaskDocumentTypeCreateResponseDTO> Create(TaskDocumentTypeCreateRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<TaskDocumentTypeCreateResponseDTO>>("taskdocument/type/", input);
        }

        public void Delete(uint id)
        {
            _restfulClient.Delete<ApiResult<TaskDocumentTypeDTO>>("taskdocument/type/" + id.ToString(), id);
        }

        public ApiResult<TaskDocumentTypeDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<TaskDocumentTypeDTO>>("taskdocument/type/" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<TaskDocumentTypeDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskDocumentTypeDTO>>>("taskdocument/type/getAll");
        }

        public ApiResult<TaskDocumentTypeUpdateResponseDTO> Update(uint id, TaskDocumentTypeUpdateRequest input)
        {
            return _restfulClient.Put<ApiResult<TaskDocumentTypeUpdateResponseDTO>>("taskdocument/type/" + id.ToString(), input);
        }
    }
}
