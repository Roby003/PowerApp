using Common.Implementations;
using DA.Context;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Data.SqlClient;

namespace BL.UnitOfWork
{
    public class AppUnitOfWork: UnitOfWork<PowerAppContext>
    {
        public AppUnitOfWork(PowerAppContext context)
            : base(context)
        {
        }

        public Repository<T, PowerAppContext> Repository<T>()
            where T : class, new()
        {
            return new Repository<T, PowerAppContext>(Context);
        }

        public IQueryable<T> Queryable<T>()
            where T : class, new()
        {
            return new Repository<T, PowerAppContext>(Context).Query;
        }

        public PowerAppContext GetContext()
        {
            return Context;
        }

        public IQueryable<T> TrackedQueryable<T>()
            where T : class, new()
        {
            return new Repository<T, PowerAppContext>(Context).TrackedQuery;
        }
        private IQueryable<T> ExecuteQueryProcedure<T>(string name, params SqlParameter[] args) where T: class
        {
            var query = $"EXEC {name} {string.Join(", ", args.Select(s => $"@{s.ParameterName}"))}";

            return Context.Set<T>().FromSqlRaw(query, args);
        }

        private async Task<int> ExecuteProcedure(string name, params SqlParameter[] args)
        {
            return await Context.Database.ExecuteSqlAsync($"EXEC {name} {string.Join(", ", args.Select(s => $"@{s.ParameterName}"))}");
        }
    }
}
