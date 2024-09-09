using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Exercise
{
    public class AddExerciseDTO
    {
        public string Name { get; set; } = null!;
        public List<int> catIds { get; set; } = new List<int>();

        public IFormFile? Image { get; set; }
    }
}
