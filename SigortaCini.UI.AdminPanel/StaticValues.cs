using SigortaCini.Framework.Data.DTO.Admin.Permission;
using SigortaCini.UI.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI
{
    public static class StaticValues
    {
        //public static string BASE_API_URL { get; set; }
        //public static string BASE_API_URL_TEST { get; set; }

        public static string DATAMANAGEMENT_ADMIN_API_URL { get; set; }
        public static string DATAMANAGEMENT_ADMIN_UI_URL { get; set; }

        public static string MULTIQUOTATION_API_URL { get; set; }

        public static Dictionary<int, List<PermissionDTO>> Permissions = new Dictionary<int, List<PermissionDTO>>();
        public static bool InsertPermissionToList(int roleId, List<PermissionDTO> permission)
        {
            lock (Permissions)
            {
                if (!Permissions.ContainsKey(roleId))
                    Permissions.Add(roleId, permission);
                else
                {
                    Permissions.Remove(roleId);
                    Permissions.Add(roleId, permission);
                }
                return true;
            }
        }

        #region REDIS
        public static string REDIS_CONN { get; set; }
        #endregion

        #region SERVICE BUS
        public static string SEVICE_BUS_QUEUE_NAME { get; set; }
        public static string SERVICE_BUS_CONNECTION_STRING { get; set; }
        #endregion

        #region SMS
        public static string SMS_USERNAME { get; set; }
        public static string SMS_PASSWORD { get; set; }
        public static string SMS_USERCODE { get; set; }
        public static string SMS_API_KEY { get; set; }
        public static string SMS_ACCOUNT_ID { get; set; }
        public static string SMS_API_URL { get; set; }
        #endregion

        public static string PASSWORD_POLICY_REGEX => "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})";

        public static string MONGODB_CONNSTR { get; set; }

        public static string STORAGE_GENERAL { get; set; }
        public static string STORAGE_GENERAL_BASE_URL { get; set; }
        public static string STORAGE_GENERAL_CONTAINER { get; set; }
        public static string STORAGE_POLICY { get; set; }
        public static string ENVIRONMENT { get; set; }
    }
}
