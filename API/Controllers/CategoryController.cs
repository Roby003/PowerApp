using API.Attributes;
using BL.Services;
using Common.Interfaces;
using DTOs.Category;
using DTOs.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;
using System.Reflection.Metadata.Ecma335;

namespace API.Controllers
{

    [ApiController]
    [Authorize]
    [APIEndpoint]
    public class CategoryController : ControllerBase
    {
        private CategoryService categoryService;
        public CategoryController(CategoryService categoryService)
        {
            this.categoryService = categoryService;
        }

        [HttpPost]
        [Route("category")]
        [Validate<AddCategoryDTO>]
        [CheckRole(Common.Enums.Roles.Admin)]

        public async Task<int> AddCategory(AddCategoryDTO addCategoryDTO)
        {
            return await categoryService.AddCategory(addCategoryDTO);
        }

        [HttpGet]
        [Route("category/getById")]
        public async Task<ListItemCategDTO?> GetCategory([FromQuery] int categoryId)
        {
            return await categoryService.GetCategory(categoryId);
        }


        [HttpGet]
        [Route("category/getAll")]
        [APIEndpoint(Common.Enums.HttpMethodTypes.Get)]
        public async Task<List<ListItemCategDTO>> GetCategories()
        {
            return await categoryService.GetCategories();
        }

        [HttpGet]
        [Route("category/getByTemplate")]
        public async Task<List<string>> GetCategoryNamesByTemplate([FromQuery] int templateId)
        {
            return await categoryService.GetCategoriesByTemplateId(templateId);
        }

        [HttpPut]
        [Route("category/update")]
        [Validate<UpdateCategoryDTO>]
        [CheckRole(Common.Enums.Roles.Admin)]

        public async Task<int?> UpdateCategory(UpdateCategoryDTO updatedCategory)
        {
            return await categoryService.UpdateCategory(updatedCategory);
        }


        [HttpDelete]
        [Route("category/remove")]
        [CheckRole(Common.Enums.Roles.Admin)]

        public async Task<int?> RemoveCategory([FromQuery] int categoryId)
        {
            return await categoryService.RemoveCategory(categoryId);
        }

    }
}
