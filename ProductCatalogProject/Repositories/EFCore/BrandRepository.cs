using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class BrandRepository : RepositoryBase<Brand>, IBrandRepository
    {
        private readonly RepositoryContext _context;

        public BrandRepository(RepositoryContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<Brand> Get(int id)
        {
            var result = await _context.Brands.FirstOrDefaultAsync(p => p.Id == id);


            if (result == null)
                throw new KeyNotFoundException("Not Found!");


            return result;
        }
        public override async Task<PaginatedResult<Brand>> GetAll(Filter filter)
        {

            var query = _context.Brands.AsQueryable();

            var result = await query.ToPaginatedListAsync(filter.PageNumber, filter.PageSize);

            return result;
        }
    }
}
