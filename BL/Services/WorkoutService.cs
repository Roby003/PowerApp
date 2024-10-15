using BL.UnitOfWork;
using Common.AppSettings;
using Common.Enums;
using Common.Implementations;
using DA.Entities;
using DTOs.Exercise;
using DTOs.Set;
using DTOs.Users;
using DTOs.Workout;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;

namespace BL.Services
{
    public class WorkoutService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;

        public WorkoutService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
        }

        public async Task<int> CreateWorkout(LogWorkoutDTO logWorkoutDTO)
        {
            var setsDtos = logWorkoutDTO.setsDto;
            var workout = new Workout();
            workout.CreatedDate = DateTime.Now;
            workout.UserId = CurrentUser.Id();
            workout.LastModifiedBy = CurrentUser.Id();
            workout.LastModifiedDate = DateTime.Now;
            workout.Note = logWorkoutDTO.Note;
            var sets = Mapper.Map<AddSetDTO, DA.Entities.Set>(setsDtos);


            workout.Sets = sets;
            workout.TemplateId = logWorkoutDTO.TemplateId;


            if (logWorkoutDTO.ImageList.Any())
            {
                var imageList = new List<Image>();
                foreach(var item in logWorkoutDTO.ImageList)
                {
                    var image = new Image();
                    using (var ms = new MemoryStream())
                    {
                        item.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        image.ContentFile = fileBytes;
                    }
                    imageList.Add(image);
                }
                workout.Images = imageList;
            }
            else
            {
                workout.Images=new List<Image>();
            }
            await UnitOfWork.Repository<Workout>().AddAsync(workout);
            return await UnitOfWork.SaveChanges();

        }

        public async Task<List<ShowWorkoutDTO>> GetPersonalWorkoutsByActivity(int take, int skip, Guid userId)
        {


            return await UnitOfWork.Queryable<Workout>()
                   .Where(w => w.UserId == userId)
                   .Include(w => w.Sets).ThenInclude(s => s.Exercise).Include(w => w.User).ThenInclude(u => u.Image).Include(w => w.Likes).Include(w => w.Comments).Include(w => w.Images)
                   .OrderByDescending(w => 0.3 * (w.Likes.Count()) + 0.7 * (w.Comments.Count())).Skip(skip).Take(take).Select(w => new ShowWorkoutDTO
                   {
                       WorkoutId = w.WorkoutId,
                       Note = w.Note,
                       CreatedDate = w.CreatedDate,
                       ImageIds = w.Images.Select(i => i.ImageId).ToList(),
                       Exercises = w.Sets.GroupBy(s => s.Exercise).Select(s => new ShowExerciseDTO
                       {
                           ExerciseId = s.Key.ExerciseId,
                           Name = s.Key.Name,
                           Sets = s.Select(set => new SetListItemDTO
                           {
                               Reps = set.Reps,
                               Weight = set.Weight,
                               Rpe = set.Rpe
                           }).ToList(),
                       }).ToList(),
                       User = new DTOs.Users.UserDetailsDTO
                       {
                           Id = w.UserId,
                           UserName = w.User.UserName,
                           Email = w.User.Email,
                           RoleId = w.User.RoleId,
                           Image = w.User.Image.ContentFile,
                       }
                   }).ToListAsync();


        }
        public async Task<List<ShowWorkoutDTO>> GetPersonalWorkouts(int take, int skip, Guid userId)
        {


            return await UnitOfWork.Queryable<Workout>()
                    .Where(w => w.UserId == userId)
                    .Include(w => w.Sets).Include(w => w.User).Include(w=>w.Images)
                    .OrderByDescending(w => w.CreatedDate).Skip(skip).Take(take).Select(w => new ShowWorkoutDTO
                    {
                        WorkoutId = w.WorkoutId,
                        Note = w.Note,
                        CreatedDate = w.CreatedDate,
                        ImageIds = w.Images.Select(i => i.ImageId).ToList(),
                        Exercises = w.Sets.GroupBy(s => s.Exercise).Select(s => new ShowExerciseDTO
                        {
                            ExerciseId = s.Key.ExerciseId,
                            Name = s.Key.Name,
                            Sets = s.Select(set => new SetListItemDTO
                            {
                                Reps = set.Reps,
                                Weight = set.Weight,
                                Rpe = set.Rpe
                            }).ToList(),
                        }).ToList(),
                        User = new DTOs.Users.UserDetailsDTO
                        {
                            Id = w.UserId,
                            UserName = w.User.UserName,
                            Email = w.User.Email,
                            RoleId = w.User.RoleId,
                            Image = w.User.Image.ContentFile,
                        }
                    }).ToListAsync();


        }

        public async Task<ShowWorkoutDTO?> GetWorkoutById(int workoutId)
        {
            return await UnitOfWork.Queryable<Workout>()
                    .Where(w => w.WorkoutId == workoutId)
                    .Include(w => w.Sets).Include(w => w.User).Include(w=>w.Images)
                    .Select(w => new ShowWorkoutDTO
                    {
                        WorkoutId = w.WorkoutId,
                        Note = w.Note,
                        CreatedDate = w.CreatedDate,
                        ImageIds = w.Images.Select(i => i.ImageId).ToList(),
                        Exercises = w.Sets.GroupBy(s => s.Exercise).Select(s => new ShowExerciseDTO
                        {
                            ExerciseId = s.Key.ExerciseId,
                            Name = s.Key.Name,
                            Sets = s.Select(set => new SetListItemDTO
                            {
                                Reps = set.Reps,
                                Weight = set.Weight,
                                Rpe = set.Rpe
                            }).ToList(),
                        }).ToList(),
                        User = new DTOs.Users.UserDetailsDTO
                        {
                            Id = w.UserId,
                            UserName = w.User.UserName,
                            Email = w.User.Email,
                            RoleId = w.User.RoleId,
                            Image = w.User.Image.ContentFile,
                        }
                    }).FirstOrDefaultAsync();
        }

        public bool HasEmptyOrNegativeSets(List<AddSetDTO> setsDto)
        {
          
            if (!setsDto.Any())
                return false;

            var isValid = true;
            foreach (var set in setsDto)
            {
                isValid &= !(set.Reps == null || set.Weight == null || set.Reps <= 0 || set.Weight <= 0);
            }

            return isValid;
        }


        public async Task<List<ShowWorkoutDTO>> GetFollowedWorkoutsByActivity(int take, int skip, Guid userId)
        {
            var currentUserId = CurrentUser.Id();
            var currentUser = await UnitOfWork.Queryable<User>().Include(u => u.FollowedUsers).FirstAsync(u => u.Id == currentUserId);



            return await UnitOfWork.Queryable<Workout>().Where(w => currentUser.FollowedUsers.Contains(w.User))
                .Include(w => w.Sets).Include(w => w.User).Include(w => w.Likes).Include(w => w.Comments).Include(w=>w.Images)
                   .OrderByDescending(w => 0.3 * (w.Likes.Count()) + 0.7 * (w.Comments.Count())).Skip(skip).Take(take).Select(w => new ShowWorkoutDTO
                   {
                       WorkoutId = w.WorkoutId,
                       Note = w.Note,
                       CreatedDate = w.CreatedDate,
                       ImageIds = w.Images.Select(i => i.ImageId).ToList(),
                       Exercises = w.Sets.GroupBy(s => s.Exercise).Select(s => new ShowExerciseDTO
                       {
                           ExerciseId = s.Key.ExerciseId,
                           Name = s.Key.Name,
                           Sets = s.Select(set => new SetListItemDTO
                           {
                               Reps = set.Reps,
                               Weight = set.Weight,
                               Rpe = set.Rpe
                           }).ToList(),
                       }).ToList(),
                       User = new DTOs.Users.UserDetailsDTO
                       {
                           Id = w.UserId,
                           UserName = w.User.UserName,
                           Email = w.User.Email,
                           RoleId = w.User.RoleId,
                           Image = w.User.Image.ContentFile,
                       }
                   }).ToListAsync();

        }

        public async Task<List<ShowWorkoutDTO>> GetFollowedWorkouts(int take, int skip, Guid userId)
        {
            var currentUserId = CurrentUser.Id();
            var followedUserIds = await UnitOfWork.Queryable<User>().Where(u => u.Id == currentUserId).Include(u => u.FollowedUsers).SelectMany(s => s.FollowedUsers.Select(u => u.Id)).Distinct().ToListAsync();


            return await UnitOfWork.Queryable<Workout>()
                    .Where(w => followedUserIds.Contains(w.UserId)).Include(w => w.Sets).ThenInclude(s => s.Exercise).Include(w => w.User).ThenInclude(u => u.Image).Include(w=>w.Images)
                    .OrderByDescending(w => w.CreatedDate).Skip(skip).Take(take).Select(w => new ShowWorkoutDTO
                    {
                        WorkoutId = w.WorkoutId,
                        Note = w.Note,
                        CreatedDate = w.CreatedDate,
                        ImageIds = w.Images.Select(i => i.ImageId).ToList(),

                        Exercises = w.Sets.GroupBy(s => s.Exercise).Select(s => new ShowExerciseDTO
                        {
                            ExerciseId = s.Key.ExerciseId,
                            Name = s.Key.Name,
                            Sets = s.Select(set => new SetListItemDTO
                            {
                                Reps = set.Reps,
                                Weight = set.Weight,
                                Rpe = set.Rpe
                            }).ToList(),
                        }).ToList(),
                        User = new UserDetailsDTO
                        {
                            Id = w.UserId,
                            UserName = w.User.UserName,
                            Email = w.User.Email,
                            RoleId = w.User.RoleId,
                            Image = w.User.Image.ContentFile,
                        }
                    }).ToListAsync();

        }

        public async Task<int?> RemoveWorkout(int workoutId)
        {
            var workout = await UnitOfWork.Queryable<Workout>().Include(w=>w.Images).FirstOrDefaultAsync(w => w.WorkoutId == workoutId);
            if (workout == null || workout.UserId != CurrentUser.Id())
                return null;

            UnitOfWork.Repository<Like>().RemoveRange(UnitOfWork.Queryable<Like>().Where(l => l.WorkoutId == workoutId));
            UnitOfWork.Repository<Comment>().RemoveRange(UnitOfWork.Queryable<Comment>().Where(l => l.WorkoutId == workoutId));
            UnitOfWork.Repository<Notification>().RemoveRange(UnitOfWork.Queryable<Notification>().Where(l => l.WorkoutId == workoutId));
            UnitOfWork.Repository<Set>().RemoveRange(UnitOfWork.Queryable<Set>().Where(l => l.WorkoutId == workoutId));
            UnitOfWork.Repository<Workout>().Update(workout);
            workout.Images.Clear();

            UnitOfWork.Repository<Workout>().Remove(workout);
            return await Save();
        }


        public async Task<GetWorkoutForLogDTO?> GetPreviousWorkoutByTemplateId(int templateId)
        {
            return await UnitOfWork.Queryable<Workout>().Include(w => w.Sets).Where(w => w.TemplateId == templateId).OrderByDescending(w => w.CreatedDate).Select(w => new GetWorkoutForLogDTO
            {
                Note = w.Note,
                Exercises = w.Sets.GroupBy(s => s.Exercise).Select(s => new ShowExerciseDTO
                {

                    ExerciseId = s.Key.ExerciseId,
                    Name = s.Key.Name,
                    Image = s.Key.ImageId == null ? Array.Empty<byte>() : s.First().Exercise.Image.ContentFile,
                    Sets = s.Select(set => new SetListItemDTO
                    {
                        Reps = set.Reps,
                        Weight = set.Weight,
                        Rpe = set.Rpe
                    }).ToList(),
                }).ToList(),

            }).FirstOrDefaultAsync();

        }

        public void CalculateFeaturedWorkout()
        {
            var old_workout = UnitOfWork.Queryable<Workout>().Where(w => w.IsFeatured == true).FirstOrDefault();
            if (old_workout != null)
            {
                old_workout.IsFeatured = false;
                UnitOfWork.Repository<Workout>().Update(old_workout);
            }



            var max_engagement_ranking = UnitOfWork.Queryable<VwWorkoutsThisWeek>().Max(w => 0.3 * (w.LikeCount) + 0.7 * (w.CommentCount));
            var newFeaturedWorkoutId = UnitOfWork.Queryable<VwWorkoutsThisWeek>()
                .Where(w => 0.3 * (w.LikeCount) + 0.7 * (w.CommentCount) == max_engagement_ranking)
                .Select(w => w.WorkoutId)
                .FirstOrDefault();
            var workout = UnitOfWork.Queryable<Workout>().FirstOrDefault(w => w.WorkoutId == newFeaturedWorkoutId);
            if (workout != null)
            {
                workout.IsFeatured = true;
                UnitOfWork.Repository<Workout>().Update(workout);
                Save();
            }
        }

        public async Task<ShowWorkoutDTO?> GetFeaturedWorkout()
        {

            var workout = await UnitOfWork.Queryable<Workout>().Include(w => w.Sets).Include(w => w.User).Where(w => w.IsFeatured == true).FirstOrDefaultAsync();

            if (workout == null)
                return null;
            var exercises = await UnitOfWork.Queryable<Set>().Where(s => s.WorkoutId == workout.WorkoutId).GroupBy(s => s.Exercise).Select(s => new ShowExerciseDTO
            {
                ExerciseId = s.Key.ExerciseId,
                Name = s.Key.Name,
                Sets = s.Select(set => new SetListItemDTO
                {
                    Reps = set.Reps,
                    Weight = set.Weight,
                    Rpe = set.Rpe
                }).ToList(),
            }).ToListAsync();
            var imageIds = await UnitOfWork.Queryable<Workout>().Include(w => w.Images).Where(w => w.WorkoutId == workout.WorkoutId).SelectMany(w => w.Images).Select(i => i.ImageId).ToListAsync();
            var user = await UnitOfWork.Queryable<User>().Include(u => u.Image).Where(u => u.Id == workout.UserId).FirstAsync();
            return new ShowWorkoutDTO
            {
                WorkoutId = workout.WorkoutId,
                Note = workout.Note,
                CreatedDate = workout.CreatedDate,
                Exercises = exercises,
                ImageIds = imageIds,
                User = new DTOs.Users.UserDetailsDTO
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Email = user.Email,
                    RoleId = user.RoleId,
                    Image = user.Image.ContentFile,
                }
            };
        }


    }
}
