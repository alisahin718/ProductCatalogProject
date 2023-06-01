using System.ComponentModel.DataAnnotations;

namespace Entities.Resources
{
    public class ColorResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }

    public class SaveColorResource
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
    }
}
