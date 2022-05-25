using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SigortaCini.UI
{
    public static class Utilities
    {
        private const string Alphabet = "abcdefghijklmnopqrstuvwyxzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        public static string GenerateRandomPin(int length, bool onlyDigits = false)
        {
            Random rand = new Random();
            char[] chars = new char[length];
            int counter = 0;

            while (counter != length)
            {
                var myChar = Alphabet[rand.Next(Alphabet.Length)];
                if (onlyDigits && char.IsDigit(myChar))
                {
                    chars[counter] = myChar;
                    counter++;
                }
                else if (!onlyDigits)
                {
                    chars[counter] = myChar;
                    counter++;
                }
            }

            return new string(chars);
        }

        //public static string GenerateMaskedPhone(this string phone) =>
        //    phone.Length == 10 ? $"{phone.Substring(0, 3)} *** *{phone[7]} {phone.Substring(8, 2)}" : "";

        //public static string GenerateMasked(string text)
        //{
        //    var residual = text.Length - 6;
        //    var stars = "";
        //    for (int i = 0; i < residual; i--)
        //    {
        //        stars += "*";
        //    }
        //    return text.Length > 7 && residual > 0 ? $"{text.Substring(0, 3)} {stars} {text.Substring(text.Length - 3, 3)}" : "";
        //}

    }
}
