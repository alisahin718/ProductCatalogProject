using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class CaseHistoryRepository : RepositoryBase<CaseHistory>, ICaseHistoryRepository
    {
        private readonly RepositoryContext _context;

        public CaseHistoryRepository(RepositoryContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<CaseHistory> Get(int id)
        {
            var result = await _context.CaseHistories
                .Include(p => p.Product)
                .Include(p => p.Buyer)
                .Include(p => p.Seller)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (result == null)
                throw new KeyNotFoundException("Not Found!");

            return result;
        }



        public override async Task<PaginatedResult<CaseHistory>> GetAll(Filter filter)
        {

            var query = _context.CaseHistories
                .Include(p => p.Product)
                .Include(p => p.Buyer)
                .Include(p => p.Seller)
                .AsQueryable();

            var result = await query.ToPaginatedListAsync(filter.PageNumber, filter.PageSize);

            return result;
        }


        public async Task<IEnumerable<CaseHistory>> GetAllPurchased(string userId)
        {
            return await _context.CaseHistories
                .Include(p => p.Product)
                .Include(p => p.Buyer)
                .Include(p => p.Seller)
                .Where(p => p.BuyerId == userId)
                .ToListAsync();
        }


        public async Task<IEnumerable<CaseHistory>> GetAllSold(string userId)
        {
            return await _context.CaseHistories
                .Include(p => p.Product)
                .Include(p => p.Buyer)
                .Include(p => p.Seller)
                .Where(p => p.SellerId == userId)
                .ToListAsync();
        }
    }
}
