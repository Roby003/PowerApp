using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Likes
{
    public class GetLikesInfoDTO
    {
        public bool IsLiked { get; set; }
        public int LikesCount { get; set; }
    }
}
