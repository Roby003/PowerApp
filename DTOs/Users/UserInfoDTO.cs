using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Users
{
    public class UserInfoDTO
    {
        public string Email { get; set; } = null!;
        public string UserName { get; set; } = null!;
        public int RoleId { get; set; }
        public int NoWorkouts { get; set; }
        public int NoFollowedUsers { get; set; }
        public int NoFollowingUsers { get; set; }
        public bool FollowingFlag { get; set; }
        public byte[] Image { get; set; } = new byte[0];
        public string? Description { get; set; }
    }
}
