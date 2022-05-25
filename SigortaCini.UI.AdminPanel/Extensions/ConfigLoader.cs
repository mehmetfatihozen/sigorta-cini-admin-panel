using Microsoft.Extensions.Configuration;
using SigortaCini.UI.AdminPanel.Extensions;

namespace SigortaCini.UI.Extensions
{
    public static class ConfigLoader
    {
        public static void Load(IConfiguration configuration, Microsoft.AspNetCore.Hosting.IHostingEnvironment _currentEnvironment)
        {

            StaticValues.MONGODB_CONNSTR = configuration["MONGODB-CONNSTR"];
            StaticValues.REDIS_CONN = configuration["REDIS-CONNSTR"];

            StaticValues.SMS_ACCOUNT_ID = configuration["SMS-ACCOUNT-ID"];

            StaticValues.SMS_API_KEY = configuration["SMS-API-KEY"];

            StaticValues.SMS_API_URL = configuration["SMS-API-URL"];

            StaticValues.SMS_PASSWORD = configuration["SMS-PASSWORD"];

            StaticValues.SMS_USERCODE = configuration["SMS-USERCODE"];
            StaticValues.SMS_USERNAME = configuration["SMS-USERNAME"];

            StaticValues.STORAGE_GENERAL = configuration["BLOB-PRODSIGORTACINISTORAGE-STORAGE"];
            StaticValues.STORAGE_POLICY = configuration["BLOB-PRODSIGORTACINIPOLICYDOC-STORAGE"];

            StaticValues.ENVIRONMENT = _currentEnvironment.EnvironmentName.ToLowerInvariant();
            switch (_currentEnvironment.EnvironmentName.ToLowerInvariant())
            {
                case "safrandev":
                    SafranDevSetting(configuration);
                    break;
                case "uat":
                    UatSetting(configuration);
                    break;
                case "acceptance":
                    AcceptanceSetting(configuration);
                    break;
                case "prod":
                    ProductionSetting(configuration);
                    break;
                case "pre-prod":
                    PreProdSetting(configuration);
                    break;
                default:
                    SafranDevSetting(configuration);
                    break;
            }
        }
        private static void PreProdSetting(IConfiguration configuration)
        {
            StaticValues.DATAMANAGEMENT_ADMIN_API_URL = $"https://{configuration["Admin-API-Pre-Prod-URL"]}/";
            StaticValues.MULTIQUOTATION_API_URL = $"https://{configuration["SC-MultiQuatation-Engine-Pre-Prod-URL"]}/";
            StaticValues.STORAGE_GENERAL_BASE_URL = "https://prodsigortacinistorage.blob.core.windows.net/";
            StaticValues.STORAGE_GENERAL_CONTAINER = "production";
            StaticValues.DATAMANAGEMENT_ADMIN_UI_URL = $"https://{configuration["Admin-UI-Pre-Prod-URL"]}";
        }

        private static void SafranDevSetting(IConfiguration configuration)
        {
            StaticValues.DATAMANAGEMENT_ADMIN_API_URL = $"https://{configuration["Admin-API-Safrandev-URL"]}/";
            StaticValues.MULTIQUOTATION_API_URL = $"https://{configuration["SC-MultiQuatation-Engine-Safrandev-URL"]}/";
            StaticValues.STORAGE_GENERAL_BASE_URL = "https://sigortacinistorage.blob.core.windows.net/";
            StaticValues.STORAGE_GENERAL_CONTAINER = "safrandev";
            StaticValues.DATAMANAGEMENT_ADMIN_UI_URL = $"https://{configuration["Admin-UI-Safrandev-URL"]}";
        }

        private static void ProductionSetting(IConfiguration configuration)
        {
            StaticValues.DATAMANAGEMENT_ADMIN_API_URL = $"https://{configuration["Admin-API-Prod-URL"]}/";
            StaticValues.MULTIQUOTATION_API_URL = $"https://{configuration["SC-MultiQuatation-Engine-Prod-URL"]}/";
            StaticValues.STORAGE_GENERAL_BASE_URL = "https://prodsigortacinistorage.blob.core.windows.net/";
            StaticValues.STORAGE_GENERAL_CONTAINER = "production";
            StaticValues.DATAMANAGEMENT_ADMIN_UI_URL = $"https://{configuration["Admin-UI-Prod-URL"]}";
        }

        private static void AcceptanceSetting(IConfiguration configuration)
        {
            StaticValues.DATAMANAGEMENT_ADMIN_API_URL = $"https://{configuration["Admin-API-Acceptance-URL"]}/";
            StaticValues.MULTIQUOTATION_API_URL = $"https://{configuration["SC-MultiQuatation-Engine-Acceptance-URL"]}/";
            StaticValues.STORAGE_GENERAL_BASE_URL = "https://prodsigortacinistorage.blob.core.windows.net/";
            StaticValues.STORAGE_GENERAL_CONTAINER = "production";
            StaticValues.DATAMANAGEMENT_ADMIN_UI_URL = $"https://{configuration["Admin-UI-Acceptance-URL"]}";
        }

        private static void UatSetting(IConfiguration configuration)
        {
            StaticValues.DATAMANAGEMENT_ADMIN_API_URL = $"https://{configuration["Admin-API-UAT-URL"]}/";
            StaticValues.MULTIQUOTATION_API_URL = $"https://{configuration["SC-MultiQuatation-Engine-UAT-URL"]}/";
            StaticValues.STORAGE_GENERAL_BASE_URL = "https://sigortacinistorage.blob.core.windows.net/";
            StaticValues.STORAGE_GENERAL_CONTAINER = "uat";
            StaticValues.DATAMANAGEMENT_ADMIN_UI_URL = $"https://{configuration["Admin-UI-UAT-URL"]}";
        }
    }
}
