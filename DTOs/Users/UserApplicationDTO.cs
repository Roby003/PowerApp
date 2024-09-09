using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Users
{
    public class UserApplicationDTO
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; } = null!;
        public int NoWorkouts { get; set; }
        public int NoFollowers { get; set; }
        public int ApplicationId { get; set; }
    }
}
