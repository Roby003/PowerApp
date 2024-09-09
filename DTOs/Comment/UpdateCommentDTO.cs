using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Comment
{
    public class UpdateCommentDTO
    {
        public int CommentId { get; set; }
        public string Content { get; set; } = null!;
    }
}
