using BL.UnitOfWork;
using Common.AppSettings;
using Common.Enums;
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
                await CreateNotification(newLike);
            }
            else
            {
                UnitOfWork.Repository<Like>().Remove(dbLike);
                await RemoveNotification(dbLike);
            }

            return await Save();

        }

        public async Task CreateNotification(Like like)
        {

            var notification = new Notification();
            notification.IsRead = false;
            notification.CreatedDate = DateTime.Now;
            notification.CreatedBy = CurrentUser.Id();
            notification.WorkoutId = like.WorkoutId;
            notification.NotificationTypeId = (int)NotificationTypes.NewLike;

            notification.TargetId = like.UserId;

            if (UnitOfWork.Queryable<Notification>().Where(n => n.WorkoutId == like.WorkoutId &&
                                                           n.NotificationTypeId == (int)NotificationTypes.NewLike &&
                                                           n.CreatedBy == notification.CreatedBy && n.IsRead == false)
                                                    .Any())
                return;

            var userName = await UnitOfWork.Queryable<User>().Where(u => u.Id == notification.TargetId)
                                                                           .Select(u => u.UserName).FirstOrDefaultAsync();

            var template = UnitOfWork.Queryable<NotificationType>().Where(w => w.NotificationTypeId == notification.NotificationTypeId)
                                                                    .Select(w => w.Template).FirstOrDefault();

            var workoutNote = await UnitOfWork.Queryable<Workout>().Where(w => w.WorkoutId == notification.WorkoutId).Select(w => w.Note).FirstOrDefaultAsync();
            notification.Description = String.Format(template!, userName,workoutNote);
            UnitOfWork.Repository<Notification>().Add(notification);

        }

        public async Task RemoveNotification(Like like)
        {
            var currentUserId = CurrentUser.Id();

            var dbNotification = await UnitOfWork.Queryable<Notification>().Where(n => n.WorkoutId == like.WorkoutId &&
                                                           n.NotificationTypeId == (int)NotificationTypes.NewLike &&
                                                           n.CreatedBy == currentUserId && n.IsRead == false).FirstOrDefaultAsync();
            if (dbNotification == null)
                return;

            UnitOfWork.Repository<Notification>().Remove(dbNotification);
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