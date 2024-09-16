using BL.Hubs;
using BL.UnitOfWork;
using Common.AppSettings;
using DA.Entities;
using DTOs.Notification;
using Microsoft.AspNetCore.SignalR;
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

    public class NotificationService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;

        public NotificationService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
            

        }


        public async Task<List<ShowNotificationDTO>> GetNotifications(int take)
        {

            var currentUserId= CurrentUser.Id();
            var notifications = await UnitOfWork.Queryable<Notification>().Where(n => n.TargetId == currentUserId).OrderByDescending(n=>n.CreatedDate).Take(take).ToListAsync();
            var notifToSend = Mapper.Map<Notification, ShowNotificationDTO>(notifications);

            notifications.ForEach(notification => { notification.IsRead = true; });
            UnitOfWork.Repository<Notification>().UpdateRange(notifications);
            await Save();
            return notifToSend;
        }

        public async Task<bool> CheckNewNotif()
        {
            var currentUserId = CurrentUser.Id();
            return await UnitOfWork.Queryable<Notification>().Where(u => u.TargetId == currentUserId && u.IsRead == false).AnyAsync();
        }
   
    }
}
