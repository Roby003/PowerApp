using AutoMapper;
using DTOs.Set;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;
using DA.Entities;

namespace DTOs.Mappers
{
    public class SetMappers : BaseMapper
    {
        public readonly ClaimsPrincipal CurrentUser;

        public SetMappers(IMapper mapper, ClaimsPrincipal currentUser) : base(mapper)
        {
            CurrentUser = currentUser;
        }
        public override void Config(IMapperConfigurationExpression config)
        {
            config.CreateMap<AddSetDTO, DA.Entities.Set>();

            config.CreateMap<DA.Entities.Set,SetListItemDTO >();
        }
    }
}
