using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Exercise
{
    public class GetUpdateExerciseDTO
    {
        public int ExerciseId { get; set; }
        public string Name { get; set; } = null!;
        public List<int> catIds { get; set; } = new List<int>();
        public List<string> catNames { get; set; } = new();
        public byte[] Image { get; set; } = null!;
    }
}
