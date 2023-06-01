using System.ComponentModel.DataAnnotations;

namespace Entities.Resources
{
    public class ConditionResource
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public string Description { get; set; }
    }

    public class SaveConditionResource
    {
        [Required]
        [StringLength(100)]
        public string Status { get; set; }
        [Required]
        [StringLength(500)]
        public string Description { get; set; }
    }
}
