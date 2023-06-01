using Entities.Models;
using Entities.RequestFeatures;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class ConditionRepository : RepositoryBase<Condition>, IConditionRepository
    {
        private readonly RepositoryContext _context;

        public ConditionRepository(RepositoryContext context) : base(context)
        {
            _context = context;
        }

        public override async Task<Condition> Get(int id)
        {
            var result = await _context.Conditions
                .FirstOrDefaultAsync(p => p.Id == id);

            if (result == null)
                throw new KeyNotFoundException("Not Found!");

            return result;
        }
        public override async Task<PaginatedResult<Condition>> GetAll(Filter filter)
        {
            var query = _context.Conditions.AsQueryable();

            var result = await query
                .ToPaginatedListAsync(filter.PageNumber, filter.PageSize);

            return result;
        }
    }
}
