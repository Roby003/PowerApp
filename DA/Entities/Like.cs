﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace DA.Entities;

public partial class Like
{
    public int LikeId { get; set; }

    public Guid UserId { get; set; }

    public int WorkoutId { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual Workout Workout { get; set; } = null!;
}