using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Exercise
{
    public class ExerciseTemplateListItemDTO
    {
        public int ExerciseId { get; set; }

        public string Name { get; set; } = null!;

        public byte[] Image { get; set; }
        public int Sets { get; set; }
    }
}
