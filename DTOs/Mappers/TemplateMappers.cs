using AutoMapper;
using DA.Entities;
using DTOs.Exercise;
using DTOs.Template;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;

namespace DTOs.Mappers
{

    public class TemplateMappers : BaseMapper
    {
        public readonly ClaimsPrincipal CurrentUser;

        public TemplateMappers(IMapper mapper, ClaimsPrincipal currentUser) : base(mapper)
        {
            CurrentUser = currentUser;
        }

        public override void Config(IMapperConfigurationExpression config)
        {


            config.CreateMap<TemplateExerciseDTO, DA.Entities.TemplateExercise>();
            config.CreateMap<DA.Entities.Template, TemplateListItemDTO>();
            config.CreateMap<VwTemplateExerciseExtension,ExerciseListItemDTO>();
        }
    }
}
