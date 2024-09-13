﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Notification
{
    public class ShowNotificationDTO
    {

        public Guid CreatedBy { get; set; }

        public int? WorkoutId { get; set; }
        public string Description { get; set; } = null!;
        
        public TimeSpan TimeSpanDiff { get; set; } 

    }
}
