using BL.UnitOfWork;
using Common.AppSettings;
using Common.Interfaces;
using DA.Entities;
using DTOs.Exercise;
using DTOs.Users;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;
using System.Collections.Generic;
using Microsoft.AspNetCore.Http;


using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using System.Text.RegularExpressions;
using System.Runtime.CompilerServices;

namespace BL.Services
{
    public class ExerciseService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;

        public ExerciseService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
        }
        public List<int> GetByWorkoutId(int workoutId)
        {
            return UnitOfWork.Queryable<Set>().Where(s => s.WorkoutId == workoutId).Select(s => s.ExerciseId).ToList();
        }

        public async Task<int> AddExercise(AddExerciseDTO exerciseDTO)
        {
            var newEx = new Exercise { Name = exerciseDTO.Name };

            newEx.Categories = await UnitOfWork.Queryable<Category>().Where(c => exerciseDTO.catIds.Contains(c.CategoryId)).ToListAsync();
            if (exerciseDTO.Image != null)
            {
                var image = new Image();
                using (var ms = new MemoryStream())
                {
                    exerciseDTO.Image.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    image.ContentFile = fileBytes;
                }
                newEx.Image = image;
            }
            else
            {
                newEx.ImageId = await UnitOfWork.Queryable<Image>().Where(i => i.IsDefaultForExercise == true).Select(i => i.ImageId).FirstOrDefaultAsync();
            }

            UnitOfWork.GetContext().AttachRange(newEx.Categories);
            //fac diferentierea obiectelor de pe memoria locala cu cele din baza de date

            newEx.IsActive = true;
            await UnitOfWork.Repository<Exercise>().AddAsync(newEx);

            return await Save();

        }

        public async Task<List<ExerciseListItemDTO>> GetExercisesByCategory(IQueryBuilder query)
        {
            return Mapper.Map<VwExercise, ExerciseListItemDTO>(
                    await UnitOfWork.Repository<VwExercise>()
                    .GetByQuery(query)
                        .GroupBy(a => a.ExerciseId)
                        .Select(g => g.First())
                        .ToListAsync()
                );

        }

        public async Task<List<ExerciseListItemDTO>> GetExercises(int take, int skip, string exerciseName)
        {

            return Mapper.Map<VwExercise, ExerciseListItemDTO>(
                 await UnitOfWork.Queryable<VwExercise>()
                     .Where(e => e.IsActive == true)
                     .Where(e => String.Empty == exerciseName ? true : e.Name.Contains(exerciseName))
                     .GroupBy(a => a.ExerciseId)
                     .Select(g => g.First())
                     .Skip(skip).Take(take)
                     .ToListAsync()
             );


        }

        public async Task<List<string>> GetExercisesByTemplate(int templateId)
        {
            return await UnitOfWork.Queryable<TemplateExercise>()
                .Include(t => t.Exercise)
                .Where(t => t.TemplateId == templateId)
                .Where(t => t.Exercise.IsActive == true)
                .Select(t => t.Exercise.Name).ToListAsync();
        }

        public async Task<List<ExerciseListItemDTO>> GetExerciseInfoByTemplate(int templateId)

        {
            return Mapper.Map<VwTemplateExerciseExtension,ExerciseListItemDTO>(await UnitOfWork.Queryable<VwTemplateExerciseExtension>().Where(t=>t.TemplateId == templateId).ToListAsync());
        }
        public async Task<int?> InactivateExercise(int exerciseId)
        {
            var exercise = await UnitOfWork.Queryable<Exercise>().Where(e => e.ExerciseId == exerciseId).FirstOrDefaultAsync();
            if (exercise == null)
                return null;
            exercise.IsActive = false;
            UnitOfWork.Repository<Exercise>().Update(exercise);
            return await Save();
        }

        public async Task<int?> UpdateExercise(UpdateExerciseDTO updatedExercise)
        {
            var dbExercise = await UnitOfWork.Queryable<Exercise>().FirstOrDefaultAsync(e => e.ExerciseId == updatedExercise.ExerciseId);
            if (dbExercise == null)
                return null;

            dbExercise.Name = updatedExercise.Name;
            dbExercise.Categories = await UnitOfWork.Queryable<Category>().Where(c => updatedExercise.catIds.Contains(c.CategoryId)).ToListAsync();
            if (updatedExercise.Image != null)
            {
                var image = new Image();
                using (var ms = new MemoryStream())
                {
                    updatedExercise.Image.CopyTo(ms);
                    var fileBytes = ms.ToArray();
                    image.ContentFile = fileBytes;
                }
                dbExercise.Image = image;
            }
            else
            {
                dbExercise.ImageId = await UnitOfWork.Queryable<Image>().Where(i => i.IsDefaultForExercise == true).Select(i => i.ImageId).FirstOrDefaultAsync();
            }

            UnitOfWork.GetContext().AttachRange(dbExercise.Categories);
            UnitOfWork.Repository<Exercise>().Update(dbExercise);

            return await Save();
        }

        public async Task<GetUpdateExerciseDTO?> GetExerciseForUpdate(int exerciseId)
        {
            return await UnitOfWork.Queryable<Exercise>().Include(e => e.Categories).Include(e => e.Image).Where(e => e.ExerciseId == exerciseId).Select(e => new GetUpdateExerciseDTO
            {
                ExerciseId = e.ExerciseId,
                Name = e.Name,
                catIds = e.Categories.Select(c => c.CategoryId).ToList(),
                catNames = e.Categories.Select(c => c.Name).ToList(),
                Image = e.ImageId == null ? Array.Empty<byte>() : e.Image!.ContentFile,
            }).FirstOrDefaultAsync();
        }

        public async Task<byte[]?> GetExerciseImage(int exerciseId)
        {
            return await UnitOfWork.Queryable<Exercise>().Include(e => e.Image).Where(e => e.ExerciseId == exerciseId).Select(e => e.Image.ContentFile).FirstOrDefaultAsync();
        }

        public async Task<List<ExerciseListItemDTO>> GetExercisesInfo(int take, int skip, string? exerciseName)
        {
            return UnitOfWork.GetContext().Set<Exercise>()
                                    .FromSqlRaw("EXEC GetExerciseInfoForStats @take={0},@skip={1},@name={2}", take, skip,exerciseName).AsEnumerable()
                                    .Select(e => new ExerciseListItemDTO { ExerciseId = e.ExerciseId, Name = e.Name, ImageId = e.ImageId }).ToList();
        }


    }
}
