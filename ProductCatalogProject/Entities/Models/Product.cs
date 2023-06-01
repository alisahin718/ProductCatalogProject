namespace Entities.Models
{
    public class Product : BaseEntity
    {
        public String Name { get; set; }
        public String Description { get; set; }
        public String PictureUrl { get; set; }
        public int BuyItNowPrice { get; set; }
        public bool IsOfferable { get; set; }
        public bool IsSold { get; set; }
        public Condition Condition { get; set; }
        public int ConditionId { get; set; }
        public User User { get; set; }
        public String UserId { get; set; }
        public Color Color { get; set; }
        public int? ColorId { get; set; }
        public Brand Brand { get; set; }
        public int? BrandId { get; set; }
        public Category Category { get; set; }
        public int CategoryId { get; set; }
    }
}
