using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Stats
{
    public class _1RMDTO
    {
        public int ExerciseId {  get; set; }
        public string ExerciseName { get; set; } = null!;
        public List<StatsFor1RMDTO> Stats { get; set; } = new List<StatsFor1RMDTO>();

    }
}
