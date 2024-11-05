using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Stats
{
    public class StatsForTemplateProgressDTO
    {
        public DateOnly WorkoutDate { get; set; }
        public int? TotalVolume { get; set; } = null!;
        public decimal? IncreaseFromLastWorkout { get; set; }
    }
}
