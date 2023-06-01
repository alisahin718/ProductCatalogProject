using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities.Resources
{
    public class OfferResource
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string OwnerId { get; set; }
        public string ProductName { get; set; }
        public int OfferedPrice { get; set; }
        public int CurrentPrice { get; set; }
        public OfferStatus OfferStatus { get; set; }
    }

    public class SaveOfferResource
    {
        public string UserId { get; set; }
        public int? ProductId { get; set; }
        public int OfferedPrice { get; set; }
        //  public bool IsAccepted { get; set; } = false;
        public OfferStatus OfferStatus { get; set; } = 0;
    }

    public class UpdateOfferResource
    {
        public int OfferedPrice { get; set; }
        public OfferStatus OfferStatus { get; set; } = 0;

    }
    public enum OfferStatus
    {
        BEKLEMEDE = 0,
        KABUL_EDILDI = 1,
        REDDEDİLDİ = 2,
        GERI_CEK = 3,
        SATILDI = 4
    }
}
