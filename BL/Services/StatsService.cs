using BL.UnitOfWork;
using Common.AppSettings;
using DA.Entities;
using DTOs.Stats;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<List<StatsForExerciseDTO>> GetStatsForExercise(int exerciseId, Guid userId)
        {
            return Mapper.Map<VwStatsPerExercisePerWeek, StatsForExerciseDTO>(await UnitOfWork.Queryable<VwStatsPerExercisePerWeek>()
                                                                            .Where(e => e.ExerciseId == exerciseId && e.UserId == userId)
                                                                            .OrderBy(e => e.FirstDayOfWeek).ToListAsync());
        }

        public async Task<List<StatsForTemplateProgressDTO>> GetStatsForTemplateProgress(int templateId)
        {
            return await UnitOfWork.Queryable<VwStatsForTemplateProgress>().Where(s => s.TemplateId == templateId)
                .Select(s => new StatsForTemplateProgressDTO
                {
                    IncreaseFromLastWorkout = s.IncreaseFromLastWorkout,
                    TotalVolume = s.WorkoutVolume,
                    WorkoutDate = UnitOfWork.Queryable<Workout>().Where(w => w.WorkoutId == s.WorkoutId).Select(w => w.CreatedDate).First()
                }
                ).ToListAsync();
        }

        public async Task<List<StatsFor1RMDTO>> GetStats1RM(int exerciseId, Guid userId)
        {

            return await UnitOfWork.Queryable<Vw1Rm>().Where(s => s.ExerciseId == exerciseId && s.Userid == userId)
                .Select(s => new StatsFor1RMDTO
                {
                    _1RM = s._1rm,
                    WorkoutDate = UnitOfWork.Queryable<Workout>().Where(w => w.WorkoutId == s.WorkoutId).Select(w => w.CreatedDate).FirstOrDefault()
                })
                .ToListAsync();
        }

    }
}
