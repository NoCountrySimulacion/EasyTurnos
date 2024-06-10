using System.Linq.Expressions;

namespace Infrastructure.Repositories.Interfaces
{
    public interface IGenericRepository<T, TId>
    {
        Task<T> Insert(T entity);
        Task<T?> GetById(TId id);
        Task<T?> GetByIdAsync(TId id, params Expression<Func<T, object>>[] includes);
        IQueryable<T> GetAll();
        void Update(T entity);
        Task<bool> Delete(TId id);
        bool Delete(T Entity);
        Task SaveChangesAsync();
        Task InsertRange(IEnumerable<T> entities);
    }
}
