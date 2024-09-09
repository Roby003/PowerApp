using DTOs.Exercise;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Template
{
    public class GetTemplateDTO
    {
        public string Title { get; set; } = null!;
        public List<ExerciseTemplateListItemDTO> ExerciseList { get; set; } = new();
    }
}
