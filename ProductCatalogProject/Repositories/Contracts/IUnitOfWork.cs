namespace Repositories.Contracts
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}
