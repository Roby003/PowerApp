using BL.UnitOfWork;
using Common.AppSettings;
using DA.Entities;
using DTOs.Comment;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel.Design;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;

namespace BL.Services
{
    public class CommentService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;

        public CommentService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
        }

        public async Task<int> AddComment(AddCommentDTO newComment)
        {

            var comment = new Comment
            {
                UserId = CurrentUser.Id(),
                Content = newComment.Content,
                WorkoutId = newComment.WorkoutId,
                CreatedDate = DateTime.Now,
                LastModifiedBy = CurrentUser.Id(),
                LastModifiedDate = DateTime.Now,
            };

            UnitOfWork.Repository<Comment>().Add(comment);
            return await Save();
        }

        public async Task<List<ShowCommentDTO>> GetCommentsByWorkout(int workoutId, int take)
        {
            return await UnitOfWork.Queryable<Comment>().Include(c => c.User).Where(c => c.WorkoutId == workoutId).Take(take).Select(c => new ShowCommentDTO()
            {
                CommentId = c.CommentId,
                Content = c.Content,
                CreatedDate = c.CreatedDate,
                User = new DTOs.Users.UserListItemDTO
                {
                    Id = c.UserId,
                    UserName = c.User.UserName,
                    RoleId = c.User.RoleId,
                    Image = c.User.Image.ContentFile,
                }

            }).ToListAsync();
        }

        public async Task<int> GetNumberOfCommentsByWorkout(int workoutId)
        {
            return await UnitOfWork.Queryable<Comment>().Where(c => c.WorkoutId == workoutId).CountAsync();
        }

        public async Task<int?> RemoveComment(int commentId)
        {
            var currentUserId = CurrentUser.Id();
            var dbComment = await UnitOfWork.Queryable<Comment>().Include(c => c.Workout).Where(c => c.UserId == currentUserId || c.Workout.UserId == currentUserId).FirstOrDefaultAsync(c => c.CommentId == commentId);
            if (dbComment == null)
                return null;

            UnitOfWork.Repository<Comment>().Remove(dbComment);
            return await Save();
        }

        public async Task<int?> UpdateComment(UpdateCommentDTO newComment)
        {
            var currentUserId = CurrentUser.Id();

            var dbComment = await UnitOfWork.Queryable<Comment>().Where(c => c.UserId == currentUserId).FirstOrDefaultAsync(c => c.CommentId == newComment.CommentId);
            if (dbComment == null)
                return null;

            dbComment.Content = newComment.Content;
            dbComment.LastModifiedDate = DateTime.Now;
            dbComment.LastModifiedBy = CurrentUser.Id();

            UnitOfWork.Repository<Comment>().Update(dbComment);
            return await Save();
        }

        public async Task<UpdateCommentDTO?> GetCommentById(int commentId)
        {
            return await UnitOfWork.Queryable<Comment>().Where(c => c.CommentId == commentId).Select(c => new UpdateCommentDTO
            {
                CommentId = c.CommentId,
                Content = c.Content
            }).FirstOrDefaultAsync();
        }
    }
}
