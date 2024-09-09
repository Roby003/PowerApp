using AutoMapper;
using DTOs.Exercise;
using DA;
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
    
        public class ExerciseMappers : BaseMapper
        {
            public readonly ClaimsPrincipal CurrentUser;

            public ExerciseMappers(IMapper mapper, ClaimsPrincipal currentUser) : base(mapper)
            {
                CurrentUser = currentUser;
            }

            public override void Config(IMapperConfigurationExpression config)
            {


                config.CreateMap<VwExercise,ExerciseListItemDTO>();
            }
        }
    
}
