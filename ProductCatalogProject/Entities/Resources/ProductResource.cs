using System.ComponentModel.DataAnnotations;

namespace Entities.Resources
{
    public class ProductResource
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string PictureUrl { get; set; }
        public int BuyItNowPrice { get; set; }
        public bool IsOfferable { get; set; }
        public bool IsSold { get; set; }
        public string ConditionStatus { get; set; }
        public string Owner { get; set; }
        public string UserId { get; set; }
        public string ColorName { get; set; }
        public string BrandName { get; set; }
        public string CategoryName { get; set; }
    }

    public class SaveProductResource
    {
        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        [StringLength(500)]
        public string Description { get; set; }
        [Required]
        public string PictureUrl { get; set; }
        [Required]
        public int BuyItNowPrice { get; set; }
        public bool IsOfferable { get; set; } = false;
        public bool IsSold { get; set; } = false;
        [Required]
        public int ConditionId { get; set; }
        public string UserId { get; set; }
        public int? ColorId { get; set; }
        public int? BrandId { get; set; }
        [Required]
        public int CategoryId { get; set; }
    }
}
