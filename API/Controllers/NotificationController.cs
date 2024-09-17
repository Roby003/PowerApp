using API.Attributes;
using BL.Services;
using Common.Implementations;
using DTOs.Notification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Diagnostics.CodeAnalysis;

namespace API.Controllers
{

    [ApiController]
    [Authorize]
    [APIEndpoint]
    public class NotificationController : ControllerBase
    {
        private NotificationService notificationService;
        public NotificationController(NotificationService notificationService)
        {
            this.notificationService = notificationService;
        }

        //[HttpGet]
        //[Route("notification/markRead")]
        //public async Task<List<ShowNotificationDTO>> GetNotificationMarkAsRead([FromQuery] int take)
        //{
        //    return await notificationService.GetNotificationsMarkAsRead(take);
        //}

        [HttpGet]
        [Route("notification")]
        public async Task<NotificationsListDTO> GetNotifications([FromQuery] int take)
        {
            return await notificationService.GetNotifications(take);
        }


        [HttpPost]
        [Route("notification/markRead")]
        public async Task<int> MarkAsRead(NotifMarkReadDTO list)
        {
            return await notificationService.MarkAsRead(list);
        }

        [HttpGet]
        [Route("notification/checkNew")]
        public async Task<bool> CheckNewNotif()
        {
            return await notificationService.CheckNewNotif();
        }



    }
}
