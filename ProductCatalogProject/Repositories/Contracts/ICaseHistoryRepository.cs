using Entities.Models;

namespace Repositories.Contracts
{
    public interface ICaseHistoryRepository : IRepositoryBase<CaseHistory>
    {
        Task<IEnumerable<CaseHistory>> GetAllSold(string userId);
        Task<IEnumerable<CaseHistory>> GetAllPurchased(string userId);
    }
}
