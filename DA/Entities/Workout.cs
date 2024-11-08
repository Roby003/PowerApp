﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace DA.Entities;

public partial class Workout
{
    public int WorkoutId { get; set; }

    public Guid UserId { get; set; }

    public DateTime CreatedDate { get; set; }

    public Guid LastModifiedBy { get; set; }

    public DateTime LastModifiedDate { get; set; }

    public string? Note { get; set; }

    public int? TemplateId { get; set; }

    public bool? IsFeatured { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual User LastModifiedByNavigation { get; set; } = null!;

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<Set> Sets { get; set; } = new List<Set>();

    public virtual Template? Template { get; set; }

    public virtual User User { get; set; } = null!;

    public virtual ICollection<Image> Images { get; set; } = new List<Image>();
}