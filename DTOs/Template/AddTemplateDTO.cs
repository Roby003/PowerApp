using DTOs.Exercise;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Template
{
    public class AddTemplateDTO
    {
        public string Title { get; set; } = null!;
        public List<TemplateExerciseDTO> exerciseDTOs = new List<TemplateExerciseDTO>();
    }
}
