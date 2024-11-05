using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Stats
{
    public class StatsFor1RMDTO
    {
        public DateOnly WorkoutDate { get; set; }
        public decimal? _1RM {  get; set; }
    }
}
