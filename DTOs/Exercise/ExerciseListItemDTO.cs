using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Exercise
{
    public class ExerciseListItemDTO
    {
        public int ExerciseId { get; set; }

        public string Name { get; set; } = null!;

        public int? ImageId { get; set; }

    }
}
