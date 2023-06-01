using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Resources
{
    public class CaseHistoryResource
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string SellerName { get; set; }
        public string BuyerName { get; set; }
        public int SoldPrice { get; set; }
        public DateTime CasedDate { get; set; }
    }

    public class SaveCaseHistoryResource
    {
        public int? ProductId { get; set; }
        public string SellerId { get; set; }
        public string BuyerId { get; set; }
        public int SoldPrice { get; set; }
        public DateTime CasedDate { get; set; }
    }
}
