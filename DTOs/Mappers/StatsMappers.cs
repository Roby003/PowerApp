using AutoMapper;
using DA.Entities;
using DTOs.Category;
using DTOs.Stats;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;

namespace DTOs.Mappers
{
    public class StatsMappers : BaseMapper
    {


        public readonly ClaimsPrincipal CurrentUser;

        public StatsMappers(IMapper mapper, ClaimsPrincipal currentUser) : base(mapper)
        {
            CurrentUser = currentUser;
        }
        public override void Config(IMapperConfigurationExpression config)
        {

            config.CreateMap<VwStatsPerExercisePerWeek, NoSetsForExerciseDTO>()
                .ForMember(dest => dest.FirstDayOfWeek, opt => opt.MapFrom(src => src.FirstDayOfWeek!.Value));

            config.CreateMap<VwStatsPerExercisePerWeek, VolumeDataForExerciseDTO>()
                .ForMember(dest => dest.FirstDayOfWeek, opt => opt.MapFrom(src => src.FirstDayOfWeek!.Value));
        }

    }
}
