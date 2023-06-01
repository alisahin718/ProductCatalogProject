using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class ProductRepository : RepositoryBase<Product>, IProductRepository
    {
        private readonly RepositoryContext _context;

        public ProductRepository(RepositoryContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<Product> Get(int id)
        {
            var result = await _context.Products
                .Include(p => p.Color)
                .Include(p => p.Brand)
                .Include(p => p.Condition)
                .Include(p => p.Category)
                .Include(p => p.User)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (result == null)
                throw new KeyNotFoundException("Not Found!");

            return result;
        }



        public override async Task<PaginatedResult<Product>> GetAll(Filter filter)
        {
            var query = _context.Products
                .Include(p => p.Color)
                .Include(p => p.Brand)
                .Include(p => p.Condition)
                .Include(p => p.Category)
                .Include(p => p.User)
                .AsQueryable();

            if (filter.CategoryId.HasValue)
                query = query.Where(p => p.CategoryId == filter.CategoryId.Value).AsQueryable();

            var result = await query.ToPaginatedListAsync(filter.PageNumber, filter.PageSize);

            return result;
        }




        public async Task CreateSellInformation(CaseHistory caseHistoryInfo)
        {
            await Task.Run(() => _context.CaseHistories.Add(caseHistoryInfo));
        }





        public async Task BuyWithOffer(int id)
        {
            //will do with stored procedure
            //  string StoredProc = "exec proc_BuyWithOffer " + "@offerId = " + id;
            SqlParameter param1 = new SqlParameter("@offerId", id);
            await Task.Run(() => _context.Database.ExecuteSqlRaw("exec proc_BuyWithOffer @offerId", param1));

        }
    }
}
