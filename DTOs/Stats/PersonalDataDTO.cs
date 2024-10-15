using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Stats
{
    public class PersonalDataDTO
    {
        public int Sets {  get; set; }
        public int Volume {  get; set; }
        public decimal AvgRpe { get; set; }
        public decimal ExertionIndex {  get; set; }
        public DateOnly Date {  get; set; }

    }
}
