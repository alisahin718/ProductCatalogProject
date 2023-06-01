using Entities.Models;

namespace Repositories.Contracts
{
    public interface IUserRepository
    {
        Task<User> Get(string id);
        Task<IEnumerable<User>> GetAll();

        void Remove(User user);
    }
}
