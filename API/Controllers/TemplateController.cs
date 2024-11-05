using API.Attributes;
using BL.Services;
using Common.Interfaces;
using DTOs.Exercise;
using DTOs.Query;
using DTOs.Template;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ApiController]
    [Authorize]
    [APIEndpoint]
    public class TemplateController : ControllerBase
    {
        private readonly TemplateService templateService;

        public TemplateController(TemplateService templateService)
        {
            this.templateService = templateService;
        }

        [HttpPost]
        [Route("template")]
        [Validate<AddTemplateDTO>]
        public async Task<int> AddTemplate(AddTemplateDTO addTemplateDTO)
        {
            return await templateService.CreateTemplate(addTemplateDTO);
        }

        [HttpPost]
        [Route("/template/getAll")]
        [APIEndpoint(Common.Enums.HttpMethodTypes.Get)]
        public async Task<List<TemplateListItemDTO>> GetTemplates(QueryDTO<LikeValueFilterDTO> query)
        {
            return await templateService.GetTemplates(query);
        }

        [HttpGet]
        [Route("/template/getById")]
        public async Task<GetTemplateDTO> GetTemplateById([FromQuery] int templateId)
        {
            return await templateService.GetTemplateById(templateId);
        }
        [HttpGet]
        [Route("/template/getByTitle")]
        public async Task<GetTemplateDTO> GetTemplateByTitle([FromQuery] string title)
        {
            return await templateService.GetTemplateByName(title);
        }

        [HttpDelete]
        [Route("/template/remove")]
        public async Task<int?> RemoveTemplate([FromQuery] int templateId)
        {
            return await templateService.RemoveTemplate(templateId);
        }

        [HttpGet]
        [Route("/template/getInfo")]
        public async Task<List<TemplateInfoDTO>> GetTemplatesInfo([FromQuery] int take, [FromQuery] Guid userId, [FromQuery] string? name)
        {
            return await templateService.GetTemplatesInfo(take, userId, name);
        }

        [HttpGet]
        [Route("/template/getMostUsedInfo")]
        public async Task<TemplateInfoDTO> GetMostUsedTemplateInfo([FromQuery] Guid userId)
        {
            return await templateService.GetMostUsedTemplateInfo(userId);
        }
    }
}
