using Entities.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.RequestFeatures
{
    public class AuthResult
    {
        public TokenResponse Token { get; set; }
        public bool Success { get; set; }
        public string Errors { get; set; }
        public string UserId { get; set; }
    }
}
