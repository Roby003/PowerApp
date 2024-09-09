﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace DA.Entities;

public partial class Comment
{
    public int CommentId { get; set; }

    public Guid UserId { get; set; }

    public string Content { get; set; } = null!;

    public int WorkoutId { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid LastModifiedBy { get; set; }

    public DateTime LastModifiedDate { get; set; }

    public virtual User LastModifiedByNavigation { get; set; } = null!;

    public virtual User User { get; set; } = null!;

    public virtual Workout Workout { get; set; } = null!;
}