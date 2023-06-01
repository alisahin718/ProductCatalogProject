using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class ColorRepository : RepositoryBase<Color>, IColorRepository
    {
        private readonly RepositoryContext _context;

        public ColorRepository(RepositoryContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<Color> Get(int id)
        {
            var result = await _context.Colors
                .FirstOrDefaultAsync(p => p.Id == id);

            if (result == null)
                throw new KeyNotFoundException("Not Found!");

            return result;
        }
        public override async Task<PaginatedResult<Color>> GetAll(Filter filter)
        {

            var query = _context.Colors.AsQueryable();

            var result = await query
                .ToPaginatedListAsync(filter.PageNumber, filter.PageSize);

            return result;

        }
    }
}