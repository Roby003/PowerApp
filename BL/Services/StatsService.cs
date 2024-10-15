using BL.UnitOfWork;
using Common.AppSettings;
using DA.Entities;
using DTOs.Stats;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;

namespace BL.Services
{
    public class StatsService : BaseService
    {


        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;

        public StatsService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
        }

        public async Task<List<NoSetsForExerciseDTO>> GetNumberOfSetsForExercise(int exerciseId, Guid userId)
        {
            return Mapper.Map<VwStatsPerExercisePerWeek, NoSetsForExerciseDTO>(await UnitOfWork.Queryable<VwStatsPerExercisePerWeek>()
                                                                            .Where(e => e.ExerciseId == exerciseId && e.UserId == userId)
                                                                            .OrderBy(e => e.FirstDayOfWeek).ToListAsync());
        }
        public async Task<List<VolumeDataForExerciseDTO>> GetVolumeDataForExercise(int exerciseId, Guid userId)
        {
            return Mapper.Map<VwStatsPerExercisePerWeek, VolumeDataForExerciseDTO>(await UnitOfWork.Queryable<VwStatsPerExercisePerWeek>()
                                                                            .Where(e => e.ExerciseId == exerciseId && e.UserId == userId)
                                                                            .OrderBy(e => e.FirstDayOfWeek).ToListAsync());
        }

        public async Task<List<StatsForTemplateProgressDTO>> GetStatsForTemplateProgress(int templateId)
        {
            return await UnitOfWork.Queryable<VwStatsForTemplateProgress>().Where(s => s.TemplateId == templateId)
                .Select(s => new StatsForTemplateProgressDTO
                {
                    IncreaseFromLastWorkout = s.IncreaseFromLastWorkout * 100 - 100,
                    TotalVolume = s.WorkoutVolume,
                    WorkoutDate = s.CreatedDate!.Value,
                }
                ).ToListAsync();
        }

        public async Task<List<StatsFor1RMDTO>> GetStats1RM(int exerciseId, Guid userId)
        {

            return await UnitOfWork.Queryable<Vw1Rm>().Where(s => s.ExerciseId == exerciseId && s.UserId == userId)
                .Select(s => new StatsFor1RMDTO
                {
                    _1RM = s._1rm,
                    WorkoutDate = s.CreatedDate!.Value,

                }).ToListAsync();
        }

        public async Task<List<StatsFor1RMDTO>> GetStats1RMbyTemplate(int exerciseId, int templateId)
        {
            return await UnitOfWork.Queryable<Vw1Rm>().Where(s => s.ExerciseId == exerciseId && s.TemplateId == templateId)
                  .Select(s => new StatsFor1RMDTO
                  {
                      _1RM = s._1rm,
                      WorkoutDate = s.CreatedDate!.Value,

                  }).ToListAsync();

        }


        public async Task<PersonalAvgExertionDataDTO> GetPersonalAvgExertion(Guid userId)
        {
            var aux = await UnitOfWork.Queryable<VwAvgExertion>().Where(s => s.UserId == userId).Select(v => new PersonalAvgExertionDataDTO { AvgLast3Weeks = v.AvgLast3Weeks, AvgOverTime = v.AvgOverTime }).FirstOrDefaultAsync();
            return aux ?? new PersonalAvgExertionDataDTO { AvgOverTime = null, AvgLast3Weeks = null };
        }

        public async Task<List<PersonalDataDTO>> GetPersonalData(Guid userId)
        {
            return await UnitOfWork.Queryable<VwStatsPerWeek>().Where(s => s.UserId == userId).Select(v => new PersonalDataDTO
            {
                AvgRpe = v.AvgRpe.Value,
                ExertionIndex = v.ExertionIndex.Value,
                Sets = v.NoSets.Value,
                Volume = v.TotalVolume.Value,
                Date = v.FirstDayOfWeek.Value,
            }).ToListAsync();
        }

        

    }
}
