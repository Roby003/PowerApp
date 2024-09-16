using BL.Hubs;
using BL.Logger;
using BL.UnitOfWork;
using Common.AppSettings;
using Microsoft.AspNetCore.SignalR;
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

    public class WebSocketService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;
        private readonly IHubContext<NotificationHub> _hubContext;


        public WebSocketService(IHubContext<NotificationHub> hubContext,MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
            _hubContext = hubContext;
        }
        public async Task SendNotificationToUser(string userId)
        {


            try
            {
                await _hubContext.Clients.Group(userId).SendAsync("ReceiveMessage");
                Console.WriteLine($"Message sent to user {userId}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error sending message to user {userId}: ");
            }

        }
    }

}

  
