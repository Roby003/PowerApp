﻿// <auto-generated> This file has been auto generated by EF Core Power Tools. </auto-generated>
#nullable enable
using System;
using System.Collections.Generic;

namespace DA.Entities;

public partial class Food
{
    public int FoodId { get; set; }

    public string Name { get; set; } = null!;

    public int NutritionalVal { get; set; }

    public virtual ICollection<MealFood> MealFoods { get; set; } = new List<MealFood>();
}