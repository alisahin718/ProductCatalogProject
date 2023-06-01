using Entities.Models;
using Microsoft.EntityFrameworkCore;
using Repositories.Contracts;

namespace Repositories.EFCore
{
    public class UserRepository : IUserRepository
    {
        private readonly RepositoryContext _context;

        public UserRepository(RepositoryContext context)
        {
            _context = context;
        }

        public async Task<User> Get(string id)
        {
            var result = await _context.Users
                .FirstOrDefaultAsync(p => p.Id == id);

            if (result == null)
                throw new KeyNotFoundException("Not Found!");

            return result;
        }

        public async Task<IEnumerable<User>> GetAll()
        {
            return await _context.Users
                .ToListAsync();
        }

        public void Remove(User appUser)
        {
            _context.User.Remove(appUser);
        }
    }
}
