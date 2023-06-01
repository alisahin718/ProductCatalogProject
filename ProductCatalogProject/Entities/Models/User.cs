using Microsoft.AspNetCore.Identity;

namespace Entities.Models
{
    public class User : IdentityUser
    {
        public String FirstName { get; set; }
        public String LastName { get; set; }
        public Gender Gender { get; set; } = 0;
    }
    public enum Gender
    {
        NOT_SPECİFİED = 0,
        MALE = 1,
        FEMALE = 2
    }
}
