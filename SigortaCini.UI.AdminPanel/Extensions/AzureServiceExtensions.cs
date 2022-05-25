using Microsoft.Azure.KeyVault;
using Microsoft.Azure.Services.AppAuthentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.AdminPanel.Extensions
{
    public static class AzureServiceExtensions
    {
        /// <summary>
        /// Get key vault value
        /// </summary>
        /// <param name="value"></param>
        /// <returns></returns>
        public static async Task<string> GetKeyVault(string value)
        {
            string baseUrl = "";
            if (StaticValues.ENVIRONMENT.StartsWith("prod") || StaticValues.ENVIRONMENT.StartsWith("pre") || StaticValues.ENVIRONMENT.StartsWith("accept"))
                baseUrl = "https://prod-sigortacini-vault.vault.azure.net/secrets/";
            else
                baseUrl = "https://sigortacini-vault.vault.azure.net/secrets/";

            AzureServiceTokenProvider azureServiceTokenProvider = new AzureServiceTokenProvider();
            KeyVaultClient keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback));
            var secret = await keyVaultClient.GetSecretAsync(baseUrl + value).ConfigureAwait(false);
            return secret.Value;
        }
    }
}
