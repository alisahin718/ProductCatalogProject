using Entities.Models;

namespace Repositories.Contracts
{
    public interface IProductRepository : IRepositoryBase<Product>
    {
        Task CreateSellInformation(CaseHistory caseHistoryInfo);
        Task BuyWithOffer(int id);
    }
}
