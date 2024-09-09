using AutoMapper;
using DTOs.Category;
using DTOs.Exercise;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;

namespace DTOs.Mappers
{
   
        public class CategoryMappers : BaseMapper
        {
            public readonly ClaimsPrincipal CurrentUser;

            public CategoryMappers(IMapper mapper, ClaimsPrincipal currentUser) : base(mapper)
            {
                CurrentUser = currentUser;
            }
            public override void Config(IMapperConfigurationExpression config)
            {
                config.CreateMap<AddCategoryDTO,DA.Entities.Category>();
                config.CreateMap<DA.Entities.Category, ListItemCategDTO>();
            }
        }
}
