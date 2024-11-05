using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Stats
{
    public class PersonalExertionDataDTO
    {
        public DateOnly FirstDayOfWeek {  get; set; }
        public decimal ExertionIndex { get; set; }
    }
}
