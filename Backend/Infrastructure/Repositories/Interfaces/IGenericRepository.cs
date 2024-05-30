namespace Infrastructure.Repositories.Interfaces
{
    public interface IGenericRepository<T, TId>
    {
        Task<T> Insert(T entity);
        Task<T?> GetById(TId id);
        IQueryable<T> GetAll();
        void Update(T entity);
        Task<bool> Delete(TId id);
        bool Delete(T Entity);
        Task SaveChangesAsync();
    }
}
