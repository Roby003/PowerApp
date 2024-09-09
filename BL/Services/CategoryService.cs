using BL.UnitOfWork;
using Common.AppSettings;
using Common.Interfaces;
using DA.Entities;
using DTOs.Category;
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

namespace BL.Services
{
    public class CategoryService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;

        public CategoryService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
        }


        public async Task<int> AddCategory(AddCategoryDTO addCategoryDTO)
        {
            var newCat = Mapper.Map<AddCategoryDTO, Category>(addCategoryDTO);
            newCat.IsActive = true;
            UnitOfWork.Repository<Category>().Add(newCat);
            return await UnitOfWork.SaveChanges();

        }
        public async Task<ListItemCategDTO?> GetCategory(int categoryId)
        {
            var dbCategory = await UnitOfWork.Queryable<Category>().Where(c => c.IsActive == true).FirstOrDefaultAsync(c => c.CategoryId == categoryId);
            if (dbCategory == null)
                return null;
            return Mapper.Map<Category, ListItemCategDTO>(dbCategory);
        }

        public async Task<List<ListItemCategDTO>> GetSubcategories([FromQuery] int categoryId)
        {
            return await Mapper.Map<Category, ListItemCategDTO>(UnitOfWork.Queryable<Category>().Where(c => c.ParentId == categoryId)).ToListAsync();
        }

        public async Task<List<ListItemCategDTO>> GetCategories()
        {
            return await Mapper.Map<Category, ListItemCategDTO>(UnitOfWork.Queryable<Category>().Where(c => c.IsActive == true)).ToListAsync();
        }

        public async Task<List<string>> GetCategoriesByTemplateId(int templateId)
        {
            return await UnitOfWork.Queryable<TemplateExercise>().Include(t => t.Exercise).Include(t => t.Exercise.Categories).Where(t => t.TemplateId == templateId).SelectMany(t => t.Exercise.Categories.Select(c => c.Name)).Distinct().ToListAsync();
        }

        public async Task<int?> UpdateCategory(UpdateCategoryDTO updatedCategory)
        {
            var dbCategory = await UnitOfWork.Queryable<Category>()
                .Where(c => c.IsActive == true)
                .Where(c => c.CategoryId == updatedCategory.CategoryId)
                .FirstOrDefaultAsync();
            if (dbCategory == null)
                return null;

            dbCategory.Name = updatedCategory.Name;
            UnitOfWork.Repository<Category>().Update(dbCategory);
            return await Save();

        }


        public async Task<int?> RemoveCategory(int categoryId)
        {

            var dbCategory = await UnitOfWork.Queryable<Category>()
                .Where(c => c.IsActive == true)
                .Where(c => c.CategoryId == categoryId)
                .FirstOrDefaultAsync();
            if (dbCategory == null)
                return null;

            dbCategory.IsActive = false;
            UnitOfWork.Repository<Category>().Update(dbCategory);
            return await Save();
        }


        public async Task<bool> NameIsUsed(string name, int? id = null)
        {
            return await UnitOfWork.Queryable<Category>().Where(c => c.CategoryId != id).Where(c => c.IsActive == true).Where(c => c.Name == name).AnyAsync();
        }


    }
}

