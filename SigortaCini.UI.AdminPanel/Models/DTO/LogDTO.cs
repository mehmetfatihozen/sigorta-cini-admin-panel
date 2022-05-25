using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.Models.DTO
{
    public class LogDTO
    {
        public ObjectId Id { get; set; }

        [BsonElement("Text")]
        public string Text { get; set; }

        [BsonElement("Type")]
        public string Type { get; set; }

        [BsonElement("Timestamp")]
        public DateTime Timestamp { get; set; }
    }
}
