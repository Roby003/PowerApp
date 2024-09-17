using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Notification
{
    public  class NotificationsListDTO
    {
        public List<ShowNotificationDTO> NewNotifications = new List<ShowNotificationDTO>();
        public List<ShowNotificationDTO> OldNotifications = new List<ShowNotificationDTO>();
    }
}
