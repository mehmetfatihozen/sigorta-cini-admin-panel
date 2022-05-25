using SigortaCini.Framework.Cryptology;
using SigortaCini.Framework.IOC.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI.Services
{
    public interface ICryptoService
    {
        string BCryptHash(string password);
        bool BCryptVerify(string password, string hash);
        string JWTEncode(object data);
        T JWTDecode<T>(string crypted);
    }

    public class CryptoService : ICryptoService, ISingletonService
    {
        readonly JWT _jwt;
        readonly SigortaCini.Framework.Cryptology.BCrypt _bCrypt;
        public CryptoService()
        {
            _jwt = new JWT();
            _bCrypt = new SigortaCini.Framework.Cryptology.BCrypt();
        }
        public T JWTDecode<T>(string crypted)
        {
            return _jwt.Decode<T>(crypted);
        }

        public string JWTEncode(object data)
        {
            return _jwt.Encode(data);
        }

        public string BCryptHash(string password)
        {
            return _bCrypt.Hash(password);
        }

        public bool BCryptVerify(string password, string hash)
        {
            return _bCrypt.Verify(password, hash);
        }
    }
}
