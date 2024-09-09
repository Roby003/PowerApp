using Microsoft.EntityFrameworkCore.Metadata;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Comment
{
    public class AddCommentDTO
    {
        public string Content { get; set; } = null!;

        public int WorkoutId { get; set; }


    }
}
