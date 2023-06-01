using System.ComponentModel.DataAnnotations;

namespace Entities.Resources
{
    public class UserResource
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Gender { get; set; }
        public string EMail { get; set; }
        public string Password { get; set; }
    }

    public class SaveUserResource
    {
        [Required]
        [StringLength(100)]
        public string FirstName { get; set; }
        [Required]
        [StringLength(100)]
        public string LastName { get; set; }
        public string Gender { get; set; }
        [Required]
        [StringLength(100)]
        public string EMail { get; set; }
        [Required]
        [StringLength(20)]
        public string Password { get; set; }
    }
}
