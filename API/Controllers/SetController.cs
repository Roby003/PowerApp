using API.Attributes;
using BL.Services;
using Common.Enums;
using DTOs.Query;
using DTOs.Set;
using DTOs.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [APIEndpoint]
    public class SetController : ControllerBase
    {
        private readonly SetService setService;

        public SetController(SetService setService)
        {
            this.setService = setService;
        }   

        [HttpPost]
        [Route("set/create")]
        [Validate<AddSetDTO>]
        public async Task<int> CreateSet(AddSetDTO setDto)
        {
            return await setService.CreateSet(setDto);
        }

        [HttpGet]
        [Route("set/getall")]
        public async Task<List<SetListItemDTO>> GetSetsWithExId([FromQuery]int workoutId, [FromQuery] int exerciseId)
        {
            return await setService.GetSetsWithExId(workoutId, exerciseId);
        }
    }
}
