using BL.UnitOfWork;
using Common.AppSettings;
using Common.Enums;
using Common.Interfaces;
using DA.Entities;
using DTOs.Users;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Utils;

namespace BL.Services
{
    public class UserService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;
        private readonly WebSocketService webSocketService;

        public UserService(WebSocketService webSocketService,MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
            this.webSocketService = webSocketService;
        }

        public async Task<UserDetailsDTO?> GetUserDetailsById(Guid id)
        {
            var user = await UnitOfWork.Queryable<User>().Include(u => u.Image).FirstOrDefaultAsync(u => u.Id == id);
            if (user == null)
            {
                return null;
            }
            return new UserDetailsDTO
            {
                Id = user.Id,
                UserName = user.UserName,
                Email = user.Email,
                RoleId = user.RoleId,
                Image = user.Image.ContentFile,
                Description = user.Description
            };
        }


        public async Task<UserDetailsDTO?> GetUserDetailsByCredentials(string email, string password)
        {
            var user = await UnitOfWork.Queryable<User>().FirstOrDefaultAsync(u => u.Email == email);
            if (user == null || !(await SecurityExtensions.ComparePasswords(user.Password!, email, password, user.Id.ToString())))
            {
                return null;
            }
            return Mapper.Map<User, UserDetailsDTO>(user);
        }


        public async Task<List<UserListItemDTO>> GetUserList(IQueryBuilder query)
        {
            return await Mapper.Map<User, UserListItemDTO>(UnitOfWork.Repository<User>().GetByQuery(query)).ToListAsync();
        }


        public async Task<int> RegisterUser(RegisterUserDTO newUser)
        {
            var newDbUser = new User
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                LastModifiedDate = DateTime.Now,
                IsActive = true,
                RoleId = (byte)Roles.Visitor,
                Email = newUser.Email,
                UserName = newUser.UserName,
                Description = newUser.Description
            };

            newDbUser.CreatedBy = newDbUser.Id;
            newDbUser.LastModifiedBy = newDbUser.Id;
            newDbUser.Password = await SecurityExtensions.GetPasswordHashString(newDbUser.Email, newUser.Password, newDbUser.Id.ToString());

            if (newUser.Image != null)
            {
                var image = new Image();
                using (var ms = new MemoryStream())
                {
                    newUser.Image.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    image.ContentFile = fileBytes;
                }
                newDbUser.Image = image;
            }
            else
            {
                newDbUser.ImageId = await UnitOfWork.Queryable<Image>().Where(i => i.IsDefaultForUser == true).Select(i => i.ImageId).FirstOrDefaultAsync();
            }
            UnitOfWork.Repository<User>().Add(newDbUser);
            return await Save();
        }


        public async Task<int?> UpdateUser(UpdateUserDTO updatedUser)
        {
            if (CurrentUser.Id() != updatedUser.Id)
                return null;

            var dbUser = await UnitOfWork.Queryable<User>().FirstOrDefaultAsync(u => u.Id == updatedUser.Id);


            if (dbUser == null)
            {
                return null;
            }

            dbUser.Email = updatedUser.Email;
            dbUser.UserName = updatedUser.UserName;
            dbUser.Description = updatedUser.Description;

            if (updatedUser.Image != null)
            {
                var image = new Image();
                using (var ms = new MemoryStream())
                {
                    updatedUser.Image.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    image.ContentFile = fileBytes;
                }
                dbUser.Image = image;
            }

            dbUser.LastModifiedBy = CurrentUser.Id();
            dbUser.Password = await SecurityExtensions.GetPasswordHashString(dbUser.Email, updatedUser.Password!, dbUser.Id.ToString());
            UnitOfWork.Repository<User>().Update(dbUser);

            return await Save();
        }


        public async Task<bool> CheckOldPasswordHash(UpdateUserDTO updatedUser)
        {
            var user = await UnitOfWork.Queryable<User>().FirstOrDefaultAsync(u => u.Id == updatedUser.Id);
            if (user == null)
            { return false; }
            return (user.Password == await SecurityExtensions.GetPasswordHashString(user.Email, updatedUser.Password, updatedUser.Id.ToString()));
        }


        public async Task<int?> DeactivateUser(Guid userId)
        {
            var dbUser = await UnitOfWork.Queryable<User>().FirstOrDefaultAsync(u => u.Id == userId);
            if (dbUser == null)
            {
                return null;
            }
            dbUser.IsActive = false;
            dbUser.LastModifiedBy = CurrentUser.Id();
            dbUser.LastModifiedDate = DateTime.Now;
            UnitOfWork.Repository<User>().Update(dbUser);

            return await Save();
        }


        public async Task<int?> DeleteUser(Guid userId)
        {
            var dbUser = await UnitOfWork.Queryable<User>().FirstOrDefaultAsync(u => u.Id == userId);
            if (dbUser == null)
            {
                return null;
            }
            UnitOfWork.Repository<User>().Remove(dbUser);

            return await Save();
        }


        public async Task<bool> IsEmailUsed(string email, Guid? currentUserId = null)
        {
            return await UnitOfWork.Queryable<User>().Where(u => currentUserId == null || u.Id != currentUserId).AnyAsync(u => u.Email == email);
        }


        public async Task<bool> IsUsernameUsed(string username, Guid? currentUserId = null)
        {

            return await UnitOfWork.Queryable<User>().Where(u => currentUserId == null || u.Id != currentUserId).AnyAsync(u => u.UserName == username);

        }




        public async Task<List<UserListItemDTO>> GetFollowedUsers(Guid userId, IQueryBuilder query)
        {
            return await Mapper.Map<User, UserListItemDTO>(UnitOfWork.Repository<User>().GetByQuery(query).Include(u => u.FollowedUsers)).ToListAsync();
        }


        public async Task<UserInfoDTO> GetUserInfo(Guid userId)
        {
            var currentUserId = CurrentUser.Id();
            bool followingFlag = await UnitOfWork.Queryable<User>()
                .Where(u => u.Id == currentUserId).Include(u => u.FollowedUsers)
                .SelectMany(u => u.FollowedUsers).AnyAsync(u => u.Id == userId);


            return await UnitOfWork.Queryable<User>()
                .Include(u => u.FollowedUsers)
                .Include(u => u.WorkoutUsers)
                .Include(u => u.Users)
                .Where(u => u.Id == userId).Select(u => new UserInfoDTO
                {
                    RoleId = u.RoleId,
                    Image = u.Image.ContentFile,
                    Email = u.Email,
                    UserName = u.UserName,
                    NoWorkouts = u.WorkoutUsers.Count(),
                    NoFollowingUsers = u.FollowedUsers.Count(),
                    NoFollowedUsers = u.Users.Count(),
                    FollowingFlag = followingFlag,
                    Description = u.Description,
                }).FirstAsync();

        }

        public async Task<List<UserListItemDTO>> GetUsersByUsername(string username)
        {

            return await Mapper.Map<User, UserListItemDTO>(
                UnitOfWork.Queryable<User>()
                .Where(u => u.UserName.Contains(username))
                 ).Take(10).ToListAsync();
        }


        public async Task<List<UserListItemDTO>> GetFollowingByUsername(string username, Guid userId)
        {
            return await Mapper.Map<User, UserListItemDTO>(UnitOfWork.Queryable<User>()
                .Include(u => u.FollowedUsers)
                .Where(u => u.Id == userId)
                .SelectMany(u => u.FollowedUsers)
                .Where(u => u.UserName.Contains(username))).ToListAsync();
        }


        public async Task<List<UserListItemDTO>> GetFollowedByUsername(string username, Guid userId)
        {
            return await Mapper.Map<User, UserListItemDTO>(UnitOfWork.Queryable<User>()
                .Include(u => u.Users)
                .Where(u => u.Id == userId)
                .SelectMany(u => u.Users)
                .Where(u => u.UserName.Contains(username))).ToListAsync();
        }

        public async Task<List<UserListItemDTO>> GetFollowedAll(Guid guid)
        {
            return await Mapper.Map<User, UserListItemDTO>(UnitOfWork.Queryable<User>().Include(u => u.Users).Where(u => u.Id == guid).SelectMany(u => u.Users)).ToListAsync();
        }
        public async Task<List<UserListItemDTO>> GetFollowingAll(Guid guid)
        {
            return await Mapper.Map<User, UserListItemDTO>(UnitOfWork.Queryable<User>().Include(u => u.FollowedUsers).Where(u => u.Id == guid).SelectMany(u => u.FollowedUsers)).ToListAsync();
        }
        public async Task<int> FollowUser(Guid userId)
        {
            var currentUserId = CurrentUser.Id();
            var currentUser = UnitOfWork.Queryable<User>().Include(u => u.FollowedUsers).FirstOrDefault(u => u.Id == currentUserId);
            var followedUser = UnitOfWork.Queryable<User>().FirstOrDefault(u => u.Id == userId);

            if (currentUser == null || followedUser == null)
            {
                throw new Exception();
            }

            currentUser.LastModifiedDate = DateTime.Now;
            followedUser.LastModifiedDate = DateTime.Now;

            UnitOfWork.Repository<User>().Update(currentUser);
            if (currentUser.FollowedUsers.Contains(followedUser))
            {
                currentUser.FollowedUsers.Remove(followedUser);
                await RemoveNotification(userId);
            }
            else
            {

                UnitOfWork.Repository<User>().Update(followedUser);
                currentUser.FollowedUsers.Add(followedUser);
                await CreateNotification(userId);
            }
            return await Save();

        }

        public async Task CreateNotification(Guid targetUserId)
        {
            var notification = new Notification();
            notification.IsRead = false;
            notification.CreatedDate = DateTime.Now;
            notification.CreatedBy = CurrentUser.Id();
            notification.NotificationTypeId = (int)NotificationTypes.NewFollow;

            notification.TargetId = targetUserId;

            if (UnitOfWork.Queryable<Notification>().Any(n => n.CreatedBy == notification.CreatedBy &&
                                                         n.IsRead == false &&
                                                         n.NotificationTypeId == (int)NotificationTypes.NewFollow &&
                                                         n.TargetId == notification.TargetId))
                return;

            var template = await UnitOfWork.Queryable<NotificationType>().Where(n => n.NotificationTypeId == notification.NotificationTypeId).Select(n => n.Template).FirstOrDefaultAsync();

            var userName = await UnitOfWork.Queryable<User>().Where(u => u.Id == notification.CreatedBy).Select(u => u.UserName).FirstOrDefaultAsync();

            notification.Description = String.Format(template!, userName);
            UnitOfWork.Repository<Notification>().Add(notification);
            await webSocketService.SendNotificationToUser(notification.TargetId.ToString()!);

        }

        public async Task RemoveNotification(Guid targetUserId)
        {
            var currentUserId = CurrentUser.Id();
            var dbNotification = await UnitOfWork.Queryable<Notification>().Where(n => n.IsRead == false && 
                                                                                  n.CreatedBy == currentUserId && 
                                                                                  n.TargetId == targetUserId && 
                                                                                  n.NotificationTypeId == (int)NotificationTypes.NewFollow)
                                                                          .FirstOrDefaultAsync();
            if (dbNotification == null) return;
            UnitOfWork.Repository<Notification>().Remove(dbNotification);

        }
        public async Task<List<UserApplicationDTO>> GetUsersWithApplications(int take, int skip)
        {
            return await UnitOfWork.Queryable<RoleApplication>()
                .Include(r => r.User)
                .Where(r => r.IsPending == true && r.AppliedRoleId == (byte)Roles.Coach)
                .OrderByDescending(r => r.CreatedDate)
                .Skip(skip)
                .Take(take)
               .Select(r => new UserApplicationDTO
               {
                   NoWorkouts = r.User.WorkoutUsers.Count(),
                   NoFollowers = r.User.Users.Count(),
                   UserId = r.UserId,
                   UserName = r.User.UserName,
                   ApplicationId = r.RoleApplicationId,
               }).ToListAsync();

        }

        public async Task<byte[]> GetUserImage(Guid userId)
        {
            var usrImg = await UnitOfWork.Queryable<User>().Include(u => u.Image).Where(u => u.Id == userId).Select(u => u.Image.ContentFile).FirstOrDefaultAsync();
            if (usrImg == null)
                return await UnitOfWork.Queryable<Image>().Where(i => i.IsDefaultForUser == true).Select(i => i.ContentFile).FirstAsync();
            return usrImg;
        }

        public async Task<List<UserSmallListItemDTO>> GetCoachUsers()
        {
            var currentUserId = CurrentUser.Id();
            var currentUser = UnitOfWork.Queryable<User>().Where(u => u.Id == currentUserId).First();
            return await UnitOfWork.Queryable<User>().Include(u => u.Users)
                .Where(u => u.RoleId == (byte)Roles.Coach)
                .Where(u => u.Id != currentUserId)
                .Where(u => !u.Users.Contains(currentUser))
                .OrderByDescending(u => u.CreatedDate)
                .Take(5)
                .Select(u => new UserSmallListItemDTO { UserId = u.Id, UserName = u.UserName }).ToListAsync();
        }
    }
}
