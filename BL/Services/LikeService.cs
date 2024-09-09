using BL.UnitOfWork;
using Common.AppSettings;
using DA.Entities;
using DTOs.Likes;
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
    public class LikeService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;

        public LikeService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
        }

        public async Task<int?> LikeWorkout(int workoutId)
        {
            var currentUserId = CurrentUser.Id();

            var dbLike = await UnitOfWork.Queryable<Workout>().Include(w => w.Likes).Where(w => w.WorkoutId == workoutId).SelectMany(w => w.Likes).Where(l => l.UserId == currentUserId && l.WorkoutId == workoutId).FirstOrDefaultAsync();

            if (dbLike == null)
            {
                var newLike = new Like()
                {
                    WorkoutId = workoutId,
                    UserId = currentUserId
                };
                UnitOfWork.Repository<Like>().Add(newLike);
            }
            else
            {
                UnitOfWork.Repository<Like>().Remove(dbLike);
            }

            return await Save();

        }

        public async Task<GetLikesInfoDTO?> IsWorkoutLiked(int workoutId)
        {
            var currentUserId = CurrentUser.Id();
            if (!await UnitOfWork.Queryable<Workout>().Where(w => w.WorkoutId == workoutId).AnyAsync())
                return null;


            var dto = await UnitOfWork.Queryable<Like>().Where(c => c.WorkoutId == workoutId).GroupBy(l => l.WorkoutId).Select(l => new GetLikesInfoDTO
            {
                IsLiked = l.Where(g => g.UserId == currentUserId).Any(),
                LikesCount = l.Count(),
            }).FirstOrDefaultAsync();

            if (dto == null)
                return new GetLikesInfoDTO
                {
                    IsLiked = false,
                    LikesCount = 0,
                };
            return dto;
        }


    }
}