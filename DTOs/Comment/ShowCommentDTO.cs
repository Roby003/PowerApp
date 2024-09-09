using DTOs.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Comment
{
    public class ShowCommentDTO
    {
        public int CommentId { get; set; }
        public string Content { get; set; } = null!;

        public UserListItemDTO User { get; set; } = null!;

        public DateTime CreatedDate { get; set; }

    }
}
