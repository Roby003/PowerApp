using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Category
{
    public class ListItemCategDTO
    {
        public int CategoryId { get; set; }
        public string Name { get; set; } = null!;
    }
}
