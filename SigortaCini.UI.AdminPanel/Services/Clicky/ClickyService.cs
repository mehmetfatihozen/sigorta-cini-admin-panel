using SigortaCini.Framework.Data.DTO;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;

namespace SigortaCini.UI.AdminPanel.Services.Clicky
{
    public interface IClickyService
    {
        ApiResult<object> GetStatAllType();
        ApiResult<object> GetStatByActionType();
        ApiResult<object> GetStatByVisitorsType();
    }

    public class ClickyService : IClickyService, IScopedService
    {
        readonly RestfulClient _restfulClient;

        public ClickyService()
        {
            _restfulClient = new RestfulClient($"{StaticValues.DATAMANAGEMENT_ADMIN_API_URL}");
        }

        public ApiResult<object> GetStatAllType()
        {
            return _restfulClient.Get<ApiResult<object>>("Clicky/GetStatAllType/");
        }

        public ApiResult<object> GetStatByActionType()
        {
            return _restfulClient.Get<ApiResult<object>>("Clicky/GetStatByActionType/");
        }

        public ApiResult<object> GetStatByVisitorsType()
        {
            return _restfulClient.Get<ApiResult<object>>("Clicky/GetStatByVisitorsType/");
        }
    }
}
