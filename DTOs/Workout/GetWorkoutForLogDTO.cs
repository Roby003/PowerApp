using DTOs.Exercise;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Workout
{
    public class GetWorkoutForLogDTO
    {
        public string? Note {  get; set; }
        public List<ShowExerciseDTO> Exercises { get; set; } = new();

    }
}
