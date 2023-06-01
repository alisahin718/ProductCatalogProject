using System.ComponentModel.DataAnnotations.Schema;

namespace Entities.Models
{
    public class CaseHistory : BaseEntity
    {
        //[ForeignKey("SellerId")]
        public Product Product { get; set; }
        public int? ProductId { get; set; }
        public User Seller { get; set; }
        public String SellerId { get; set; }
        public User Buyer { get; set; }
        public String BuyerId { get; set; }
        public int SoldPrice { get; set; }
        public DateTime CasedDate { get; set; }
    }
}
