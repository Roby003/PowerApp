using DTOs.Set;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Workout
{
    public class LogWorkoutDTO
    {
        public string? Note { get; set; } = null!;
        public int? TemplateId { get; set; }
        public List<AddSetDTO> setsDto { get; set; } = new List<AddSetDTO>();
        public List<IFormFile> ImageList { get; set; } = new List<IFormFile>();
    }
 }
