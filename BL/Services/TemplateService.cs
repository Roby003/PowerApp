using BL.UnitOfWork;
using Common.AppSettings;
using Common.Interfaces;
using DA.Entities;
using DTOs.Exercise;
using DTOs.Template;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.SqlServer.Storage.Internal;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;

namespace BL.Services
{
    public class TemplateService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;
        private readonly ImageService imageService;
        public TemplateService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser, ImageService imageService) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
            this.imageService = imageService;
        }


        public async Task<int> CreateTemplate(AddTemplateDTO addTemplateDTO)
        {

            var template = new Template();
            template.CreatedBy = CurrentUser.Id();
            template.LastModifiedBy = CurrentUser.Id();
            template.CreatedDate = DateTime.Now;
            template.LastModifiedDate = DateTime.Now;
            template.Title = addTemplateDTO.Title;
            var templateExercises = Mapper.Map<TemplateExerciseDTO, TemplateExercise>(addTemplateDTO.exerciseDTOs);
            template.TemplateExercises = templateExercises;

            template.IsActive = true;


            await UnitOfWork.Repository<Template>().AddAsync(template);

            return await UnitOfWork.SaveChanges();

        }

        public async Task<List<TemplateListItemDTO>> GetTemplates(IQueryBuilder query)
        {
            var templates = UnitOfWork.Repository<Template>().GetByQuery(query);
            return await Mapper.Map<Template, TemplateListItemDTO>(templates).ToListAsync();

        }

        public async Task<GetTemplateDTO> GetTemplateById(int templateId)
        {
            var title = await UnitOfWork.Queryable<Template>().Where(t => t.TemplateId == templateId).Select(t => t.Title).FirstOrDefaultAsync();
            if (title == null)
                return null!;

            var exerciseList = await UnitOfWork.Queryable<TemplateExercise>().Include(te => te.Exercise).Where(t => t.TemplateId == templateId).ToListAsync();

            var result = new List<ExerciseTemplateListItemDTO>();
            foreach (var exerciseItem in exerciseList)
            {
                var image = await imageService.GetImgContentAsync(exerciseItem.Exercise.ImageId);
                result.Add(new ExerciseTemplateListItemDTO
                {
                    ExerciseId = exerciseItem.ExerciseId,
                    Name = exerciseItem.Exercise.Name,
                    Image = exerciseItem.Exercise.ImageId != null ? image : Array.Empty<byte>(),
                    Sets = exerciseItem.Sets
                });
            };

            return new GetTemplateDTO { Title = title, ExerciseList = result };
        }

        public async Task<GetTemplateDTO> GetTemplateByName(string name)
        {
            var currentUserId = CurrentUser.Id();
            var title = await UnitOfWork.Queryable<Template>().Where(t => t.IsActive == true).Where(t => t.CreatedBy == currentUserId).Where(t => t.Title == name).Select(t => t.Title).FirstOrDefaultAsync();
            if (title == null)
                return null!;

            var exerciseList = await UnitOfWork.Queryable<TemplateExercise>().Include(te => te.Exercise).Where(t => t.TemplateId == (UnitOfWork.Queryable<Template>().Where(t => t.Title == name).Select(t => t.TemplateId).FirstOrDefault())).ToListAsync();

            var result = new List<ExerciseTemplateListItemDTO>();
            foreach (var exerciseItem in exerciseList)
            {
                var image = await imageService.GetImgContentAsync(exerciseItem.Exercise.ImageId);
                result.Add(new ExerciseTemplateListItemDTO
                {
                    ExerciseId = exerciseItem.ExerciseId,
                    Name = exerciseItem.Exercise.Name,
                    Image = exerciseItem.Exercise.ImageId != null ? image : Array.Empty<byte>(),
                    Sets = exerciseItem.Sets
                });
            };

            return new GetTemplateDTO { Title = title, ExerciseList = result };
        }

        public async Task<int?> RemoveTemplate(int templateId)
        {
            var template = await UnitOfWork.Queryable<Template>().FirstOrDefaultAsync(t => t.TemplateId == templateId);
            if (template == null || template.CreatedBy != CurrentUser.Id())
                return null;

            template.IsActive = false;
            UnitOfWork.Repository<Template>().Update(template);
            return await Save();
        }


        public async Task<bool> TitleIsUsed(string title)
        {
            var currentUserId = CurrentUser.Id();
            return await UnitOfWork.Queryable<Template>().Where(t => t.IsActive == true).Where(t => t.CreatedBy == currentUserId).AnyAsync(u => u.Title == title);
        }


        public async Task<List<TemplateInfoDTO>> GetTemplatesInfo(int take, Guid userId, string? name)
        {
            return UnitOfWork.GetContext().Set<Template>().FromSqlRaw("EXEC GetTemplatesInfo @take={0}, @userId={1}, @name={2}",take, userId, name).AsEnumerable().Select(t=>new TemplateInfoDTO
            {
               TemplateId=t.TemplateId,
               Name = t.Title,
            }).ToList();
        }

    }
}
