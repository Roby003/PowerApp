﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace DA.Entities;

public partial class Vw1Rm
{
    public Guid UserId { get; set; }

    public int WorkoutId { get; set; }

    public DateOnly? CreatedDate { get; set; }

    public int ExerciseId { get; set; }

    public decimal? _1rm { get; set; }

    public int? TemplateId { get; set; }
}