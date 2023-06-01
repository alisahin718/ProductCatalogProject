namespace Entities.Models
{
    public class Offer : BaseEntity
    {
        public User User { get; set; }
        public String UserId { get; set; }
        public Product Product { get; set; }
        public int? ProductId { get; set; }
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
