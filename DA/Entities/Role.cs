﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace DA.Entities;

public partial class Role
{
    public byte Id { get; set; }

    public string Name { get; set; } = null!;

    public virtual ICollection<RoleApplication> RoleApplications { get; set; } = new List<RoleApplication>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}