using BL.UnitOfWork;
using Common.AppSettings;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;
using DA.Entities;
using DTOs.Set;
using Microsoft.EntityFrameworkCore;

namespace BL.Services
{
    public class SetService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;

        public SetService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
        }

        public async Task<int> CreateSet(AddSetDTO setDto)
        {
            var set = Mapper.Map<AddSetDTO, Set>(setDto);
            await UnitOfWork.Repository<Set>().AddAsync(set);
            return await UnitOfWork.SaveChanges();

        }


        public async Task<List<SetListItemDTO>> GetSetsWithExId(int workoutId, int exerciseId)
        {
            var sets = UnitOfWork.Queryable<Set>().Where(s => s.ExerciseId == exerciseId && s.WorkoutId == workoutId);

            var setsAsDto = await Mapper.Map<Set, SetListItemDTO>(sets).ToListAsync();

            return setsAsDto;
        }




    }
}
