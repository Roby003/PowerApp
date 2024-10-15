using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Stats
{
    public class PersonalVolumeDataDTO
    {
        public DateOnly FirstDayOfWeek {  get; set; }
        public int Volume {  get; set; }
    }
}
