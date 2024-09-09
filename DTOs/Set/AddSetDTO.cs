using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Set
{
    public class AddSetDTO
    {
        public int ExerciseId { get; set; }

        public int? Reps { get; set; }

        public int? Weight { get; set; }

        public int? Rpe { get; set; } = 0;

    }
}
