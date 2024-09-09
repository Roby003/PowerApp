using Azure;
using BL.UnitOfWork;
using Common.AppSettings;
using DA.Entities;
using DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;

namespace BL.Services
{
    public class RoleService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;

        public RoleService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
        }

        public async Task<int?> ApplyForRole(RoleApplicationDTO application)
        {

            if (await UnitOfWork.Queryable<RoleApplication>().Include(r => r.User).Where(r => r.UserId == application.UserId && r.AppliedRoleId == application.RoleId && r.User.RoleId == application.RoleId).AnyAsync())
                return null;
            var newApplication = new RoleApplication
            {
                UserId = application.UserId,
                AppliedRoleId = application.RoleId,
                IsPending = true,
                CreatedDate = DateTime.Now,
            };

            UnitOfWork.Repository<RoleApplication>().Add(newApplication);
            return await Save();
        }

        public async Task<int?> AcceptApplication(int applicationId)
        {
            var dbApplication = await UnitOfWork.Queryable<RoleApplication>().Include(a => a.User).FirstOrDefaultAsync(r => r.RoleApplicationId == applicationId);
            if (dbApplication == null)
                return null;

            dbApplication.IsPending = false;
            dbApplication.ApprovedDate = DateTime.Now;
            dbApplication.ApprovedBy = CurrentUser.Id();
            var user = dbApplication.User;
            user.RoleId = dbApplication.AppliedRoleId;
            UnitOfWork.Repository<User>().Update(user);
            UnitOfWork.Repository<RoleApplication>().Update(dbApplication);
            return await Save();
        }

        public async Task<int?> RemoveApplication(int applicationId)
        {
            var dbApplication = await UnitOfWork.Queryable<RoleApplication>().FirstOrDefaultAsync(r => r.RoleApplicationId == applicationId);
            if (dbApplication == null)
                return null;

            UnitOfWork.Repository<RoleApplication>().Remove(dbApplication);
            return await Save();
        }
        public async Task<bool> CheckForApplication(Guid userId)
        {
            return await UnitOfWork.Queryable<RoleApplication>().Where(u => u.UserId == userId).AnyAsync();
        }

    }
}

