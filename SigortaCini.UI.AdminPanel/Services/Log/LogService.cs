using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.Data.DTO.Admin.Logs;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.NoSQL.DTO;
using SigortaCini.Framework.Restful;
using System.Collections.Generic;

namespace SigortaCini.UI.AdminPanel.Services.Log
{
    public interface ILogService
    {
        ApiResult<IList<B2BLogResponseDTO>> SearchB2BLog(LogSearchRequestDTO input);
        ApiResult<IList<B2CLogResponseDTO>> SearchB2CLog(LogSearchRequestDTO input);
        ApiResult<IList<MQLogResponseDTO>> SearchMQLog(LogSearchRequestDTO input);

        ApiResult<B2BLogResponseDTO> B2BLogGetById(uint id);
        ApiResult<B2CLogResponseDTO> B2CLogGetById(string id);
        ApiResult<MQLogResponseDTO> MQLogGetById(uint id);

        ApiResult<IList<B2BLogResponseDTO>> GetLastB2BLog();
        ApiResult<IList<B2CLogResponseDTO>> GetLastB2CLog();
        ApiResult<IList<MQLogResponseDTO>> GetLastMQLog();
    }
    public class LogService : ILogService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public LogService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}"); ;
        }

        public ApiResult<B2BLogResponseDTO> B2BLogGetById(uint id)
        {
            return _restfulClient.Get<ApiResult<B2BLogResponseDTO>>($"log/B2BLogGetById?id={ id }", null);
        }

        public ApiResult<B2CLogResponseDTO> B2CLogGetById(string id)
        {
            return _restfulClient.Get<ApiResult<B2CLogResponseDTO>>($"log/B2CLogGetById?id={ id }", null);
        }

        public ApiResult<IList<B2BLogResponseDTO>> GetLastB2BLog()
        {
            return _restfulClient.Get<ApiResult<IList<B2BLogResponseDTO>>>($"log/GetLastB2BLog", null);
        }

        public ApiResult<IList<B2CLogResponseDTO>> GetLastB2CLog()
        {
            return _restfulClient.Get<ApiResult<IList<B2CLogResponseDTO>>>($"log/GetLastB2CLog", null);
        }

        public ApiResult<IList<MQLogResponseDTO>> GetLastMQLog()
        {
            return _restfulClient.Get<ApiResult<IList<MQLogResponseDTO>>>($"log/GetLastMQLog", null);
        }

        public ApiResult<LogInsertDTO> GetLogById(string id)
        {
            return _restfulClient.Get<ApiResult<LogInsertDTO>>($"log/getlogbyid?id={ id }", null);
        }

        public ApiResult<MQLogResponseDTO> MQLogGetById(uint id)
        {
            return _restfulClient.Get<ApiResult<MQLogResponseDTO>>($"log/MQLogGetById?id={ id }", null);
        }

        public ApiResult<IList<B2BLogResponseDTO>> SearchB2BLog(LogSearchRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<IList<B2BLogResponseDTO>>>("log/SearchB2BLog", input);
        }

        public ApiResult<IList<B2CLogResponseDTO>> SearchB2CLog(LogSearchRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<IList<B2CLogResponseDTO>>>("log/SearchB2CLog", input);
        }

        public ApiResult<IList<MQLogResponseDTO>> SearchMQLog(LogSearchRequestDTO input)
        {
            return _restfulClient.Post<ApiResult<IList<MQLogResponseDTO>>>("log/SearchMQLog", input);
        }
    }
}
