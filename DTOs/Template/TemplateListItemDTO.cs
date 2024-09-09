using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTOs.Template
{
    public class TemplateListItemDTO
    {
        public int TemplateId { get; set; }
        public string Title { get; set; } = null!;
        public DateTime CreatedDate { get; set; }

    }
}
