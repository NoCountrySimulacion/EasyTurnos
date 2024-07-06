using Domain.Entities;
using Infrastructure.Data;
using Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;

namespace Infrastructure.Repositories
{
    public abstract class GenericRepository<T, TId> : IGenericRepository<T, TId>
            where T : BaseEntity<TId>
            where TId : IEquatable<TId>
    {
        private readonly ApplicationDbContext _context;
        protected DbSet<T> Entities => _context.Set<T>();

        public GenericRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<T> Insert(T entity)
        {
            var result = await Entities.AddAsync(entity);
            return result.Entity;
        }

        public async Task InsertRange(IEnumerable<T> entities)
        {
            await Entities.AddRangeAsync(entities);
        }

        public virtual async Task<T?> GetById(TId id)
            => await Entities.FirstOrDefaultAsync(x => x.Id.Equals(id));

        public async Task<T?> GetByIdAsync(TId id, params Expression<Func<T, object>>[] includes)
        {
            var query = Entities.AsQueryable();

            foreach (var include in includes)
            {
                query = query.Include(include);
            }

            return await query.FirstOrDefaultAsync(e => EF.Property<TId>(e, "Id").Equals(id));
        }

        public IQueryable<T> GetAll()
            => Entities;

        public void Update(T entity)
        {
            Entities.Update(entity);
        }

        public async Task<bool> Delete(TId id)
        {
            var entity = await GetById(id);

            if (entity == null)
                return false;

            Entities.Remove(entity);

            return true;
        }

        public bool Delete(T entity)
        {
            if (entity == null)
                return false;

            Entities.Remove(entity);

            return true;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
