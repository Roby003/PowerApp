using DTOs.Set;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Exercise
{
    public class ShowExerciseDTO
    {
        public int ExerciseId { get; set; }
        public string Name { get; set; } = null!;
        public byte[] Image { get; set; } = null!;
        public List<SetListItemDTO> Sets { get; set; } = new();

    }
}
