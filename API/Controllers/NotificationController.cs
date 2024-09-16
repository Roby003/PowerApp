using API.Attributes;
using BL.Services;
using DTOs.Notification;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        [HttpGet]
        [Route("notification")]
        public async Task<List<ShowNotificationDTO>> GetNotification([FromQuery] int take)
        {
            return await notificationService.GetNotifications(take);
        }


        [HttpGet]
        [Route("notification/checkNew")]
        public async Task<bool> CheckNewNotif()
        {
            return await notificationService.CheckNewNotif();
        }
    }
}
