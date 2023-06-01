using Entities.Models;
using Entities.RequestFeatures;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public abstract class RepositoryBase<TEntity> : IRepositoryBase<TEntity> where TEntity : class
    {
        private readonly RepositoryContext _context;
        protected RepositoryBase(RepositoryContext context)
        {
            _context = context;
        }

        public void Add(TEntity entity)
        {
            _context.Set<TEntity>().Add(entity);
        }

        public void Remove(TEntity entity)
        {
            _context.Set<TEntity>().Remove(entity);
        }

        public abstract Task<TEntity> Get(int id);
        public abstract Task<PaginatedResult<TEntity>> GetAll(Filter filter);
    }
}
