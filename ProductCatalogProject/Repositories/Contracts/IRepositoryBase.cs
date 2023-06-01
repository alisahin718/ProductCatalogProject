using Entities.Models;
using Entities.RequestFeatures;

namespace Repositories.Contracts
{
    public interface IRepositoryBase<TEntity> where TEntity : class
    {
        Task<TEntity> Get(int id);
        Task<PaginatedResult<TEntity>> GetAll(Filter filter);
        void Add(TEntity entity);
        void Remove(TEntity entity);
    }
}
