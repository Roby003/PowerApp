using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Users
{
    public class UserSmallListItemDTO
    {
        public Guid UserId { get; set; }
        public string UserName { get; set; } = null!;
    }
}
