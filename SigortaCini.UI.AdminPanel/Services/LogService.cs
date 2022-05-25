using Microsoft.Extensions.Configuration;
using MongoDB.Driver;
using SigortaCini.Framework.IOC.Interfaces;
using SigortaCini.UI.Models.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace SigortaCini.UI.Services
{
    public interface ILogService
    {
        void Insert(LogDTO logDTO);
    }

    public class LogService : ILogService, IScopedService
    {
        readonly IMongoCollection<LogDTO> _logs;
        public LogService(IConfiguration configuration)
        {
            MongoClientSettings settings = MongoClientSettings.FromUrl(
              new MongoUrl(StaticValues.MONGODB_CONNSTR)
            );

            settings.SslSettings =
              new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };

            var mongoClient = new MongoClient(settings);
            _logs = mongoClient.GetDatabase("sigortacini-db-mongo").GetCollection<LogDTO>("logs");
        }

        public void Insert(LogDTO logDTO)
        {
            logDTO.Timestamp = DateTime.Now;

            _logs.InsertOne(logDTO);
        }
    }
}
