using Newtonsoft.Json.Linq;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.Framework.Restful;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace SigortaCini.UI.Services
{
    public interface ISmsService
    {
        bool SendSms(string phone, string content);
    }

    public class SmsService : ISmsService, IScopedService
    {
        readonly RestfulClient _restfulClient;
        public SmsService()
        {
            _restfulClient = new RestfulClient(StaticValues.SMS_API_URL);
        }

        public bool SendSms(string phone, string content)
        {
            //request for create sms transaction
            var result = _restfulClient.RawRequest("SendUnicodeSms", RestSharp.Method.POST, new RestfulParameter[]
            {
                new RestfulParameter
                {
                    Name = "Content-Type",
                    Value = "application/x-www-form-urlencoded; charset=utf-8",
                    Type = RestSharp.ParameterType.HttpHeader
                },
                new RestfulParameter
                {
                    Name = "application/x-www-form-urlencoded",
                    Value =
                    $"UserName={StaticValues.SMS_USERNAME}&" +
                    $"Password={StaticValues.SMS_PASSWORD}&" +
                    $"UserCode={StaticValues.SMS_USERCODE}&" +
                    $"ApiKey={StaticValues.SMS_API_KEY}&" +
                    $"AccountID={StaticValues.SMS_ACCOUNT_ID}&" +
                    "SendDate=&" +
                    "ValidityPeriod=60&" +
                    "Originator=SigortaCini&Title=Kullan%C4%B1c%C4%B1%20Bilgilendirme&" +
                    $"TemplateText={System.Net.WebUtility.UrlEncode(content)}&" +
                    $"GsmNumbers=[\"{phone}\"]&" +
                    "ParametersForGsmNumbers=&" +
                    "IsUtf8Allowed=true",
                    Type = RestSharp.ParameterType.RequestBody
                }
            });
            Regex regex = new Regex("<TRANSACTION_ID>(.*)</TRANSACTION_ID>");
            var match = regex.Match(result);
            string transactionId = match.Groups[1].ToString();

            //request for approve sms transaction
            var transaction = _restfulClient.RawRequest("ConfirmSmsTransaction", RestSharp.Method.GET, new RestfulParameter[]
            {
                new RestfulParameter
                {
                    Name = "UserName",
                    Value = StaticValues.SMS_USERNAME,
                    Type=RestSharp.ParameterType.QueryString
                },
                new RestfulParameter
                {
                    Name = "Password",
                    Value = StaticValues.SMS_PASSWORD,
                    Type=RestSharp.ParameterType.QueryString
                },
                    new RestfulParameter
                {
                    Name = "UserCode",
                    Value = StaticValues.SMS_USERCODE,
                    Type = RestSharp.ParameterType.QueryString
                },
                new RestfulParameter
                {
                    Name = "TransactionID",
                    Value = transactionId,
                    Type = RestSharp.ParameterType.QueryString
                }
            });

            return transaction != null ? true : throw new ArgumentException("Sms gönderilemedi!");
        }
    }
}
