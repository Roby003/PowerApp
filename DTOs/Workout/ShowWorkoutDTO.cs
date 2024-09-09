using DTOs.Exercise;
using DTOs.Users;
using System;
using System.Collections.Generic;
using System.Diagnostics.Contracts;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Workout
{
    public class ShowWorkoutDTO
    {
        public int WorkoutId { get; set; } 
        public string? Note { get; set; }
        public DateTime CreatedDate { get; set; }
        public List<ShowExerciseDTO> Exercises { get; set; } = new();

        public UserDetailsDTO User { get; set; } = null!;
    }
}
