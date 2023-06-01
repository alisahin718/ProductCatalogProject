using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class CategoryRepository : RepositoryBase<Category>, ICategoryRepository
    {
        private readonly RepositoryContext _context;

        public CategoryRepository(RepositoryContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<Category> Get(int id)
        {
            var result = await _context.Categories
                .FirstOrDefaultAsync(p => p.Id == id);

            if (result == null)
                throw new KeyNotFoundException("Not Found!");

            return result;
        }

        public override async Task<PaginatedResult<Category>> GetAll(Filter filter)
        {

            var query = _context.Categories.AsQueryable();

            var result = await query
                .ToPaginatedListAsync(filter.PageNumber, filter.PageSize);

            return result;

        }
    }
}