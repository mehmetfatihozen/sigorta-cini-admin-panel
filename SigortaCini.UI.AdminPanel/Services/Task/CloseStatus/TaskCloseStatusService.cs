using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.TaskCloseStatus;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Task.CloseStatus
{
    public interface ITaskCloseStatusService
    {
        ApiResult<CreateTaskCloseStatusResponseDTO> Create(CreateTaskCloseStatusRequestDTO input);
        ApiResult<UpdateTaskCloseStatusResponseDTO> Update(uint id, UpdateTaskCloseStatusRequestDTO input);
        ApiResult<IEnumerable<TaskCloseStatusDTO>> GetAll();
        ApiResult<IEnumerable<TaskCloseStatusDTO>> GetByProductMitCatId(uint id);
        ApiResult<TaskCloseStatusDTO> Get(uint id);
    }
    public class TaskCloseStatusService : ITaskCloseStatusService, IScopedService
    {
        private readonly RestfulClient _restfulClient;

        public TaskCloseStatusService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<CreateTaskCloseStatusResponseDTO> Create(CreateTaskCloseStatusRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<CreateTaskCloseStatusResponseDTO>>("task/taskclosestatus/create", input);
        }

        public ApiResult<TaskCloseStatusDTO> Get(uint id)
        {
            return _restfulClient.Get<ApiResult<TaskCloseStatusDTO>>("task/taskclosestatus/GetById?taskCloseStatusId=" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<TaskCloseStatusDTO>> GetByProductMitCatId(uint id)
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskCloseStatusDTO>>>("task/taskclosestatus/GetByProductMitCatId?productMidCatId=" + id.ToString(), null);
        }

        public ApiResult<IEnumerable<TaskCloseStatusDTO>> GetAll()
        {
            return _restfulClient.Get<ApiResult<IEnumerable<TaskCloseStatusDTO>>>("task/taskclosestatus/getAll");
        }

        public ApiResult<UpdateTaskCloseStatusResponseDTO> Update(uint id, UpdateTaskCloseStatusRequestDTO input)
        {
            return _restfulClient.Put<ApiResult<UpdateTaskCloseStatusResponseDTO>>("task/taskclosestatus/Update?id=" + id.ToString(), input);
        }
    }
}
