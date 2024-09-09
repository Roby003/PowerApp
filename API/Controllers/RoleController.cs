using API.Attributes;
using BL.Services;
using DA.Entities;
using DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [APIEndpoint]
    public class RoleController : ControllerBase
    {
        private RoleService roleService;
        public RoleController(RoleService roleService)
        {
            this.roleService = roleService;
        }


        [HttpPost]
        [Route("role/application/apply")]
        public async Task<int?> ApplyForRole(RoleApplicationDTO roleApplicationDTO)
        {
            return await roleService.ApplyForRole(roleApplicationDTO);
        }

        [HttpPut]
        [Route("role/application/approve")]
        [CheckRole(Common.Enums.Roles.Admin)]
        public async Task<int?> AcceptApplication([FromQuery] int applicationId)
        {
            return await roleService.AcceptApplication(applicationId);
        }


        [HttpDelete]
        [Route("role/application/remove")]
        [CheckRole(Common.Enums.Roles.Admin)]
        public async Task<int?> RemoveApplication([FromQuery] int applicationId)
        {
            return await roleService.RemoveApplication(applicationId);
        }

        [HttpGet]
        [Route("role/application/checkUser")]
        public async Task<bool> CheckForApplication([FromQuery]Guid userId)
        {
            return await roleService.CheckForApplication(userId);
        }
    }
}