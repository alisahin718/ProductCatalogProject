using Entities.Models;

namespace Repositories.Contracts
{
    public interface IOfferRepository : IRepositoryBase<Offer>
    {
        Task<IEnumerable<Offer>> GetMyOffers(string userId);
        Task<IEnumerable<Offer>> GetMyProducts(string userId);
        Task<bool> IsOfferable(Offer offer);
    }
}
