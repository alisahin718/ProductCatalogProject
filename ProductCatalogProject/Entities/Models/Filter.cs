namespace Entities.Models
{
    public class Filter
    {
        public int? CategoryId { get; set; }
        public int? ProductId { get; set; }
        public String UserId { get; set; }
        public int PageNumber { get; set; }
        public int PageSize { get; set; }
    }
}
