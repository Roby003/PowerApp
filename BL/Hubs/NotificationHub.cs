using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SignalR;
using System.Net.Http;
using System.Security.Claims;
using Utils;
namespace BL.Hubs
{

    public class NotificationHub : Hub
    {
        private readonly ClaimsPrincipal CurrentUser;
        public NotificationHub(ClaimsPrincipal user)
        {
            CurrentUser = user;
        }
        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();

            var userId = httpContext.Request.Query["userId"]; // Get userIdentifier from query string
            await Groups.AddToGroupAsync(Context.ConnectionId, userId.ToString()); // add user to a group based on their ID
            await base.OnConnectedAsync();
        }
        public override async Task OnDisconnectedAsync(Exception? exception)
        {
            var httpContext = Context.GetHttpContext();

            var userId = httpContext.Request.Query["userId"]; // Get userIdentifier from query string
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, userId.ToString()); // add user to a group based on their ID
            await base.OnDisconnectedAsync(exception);
        }
    }
}
