using API.Attributes;
using BL.Services;
using DTOs.Stats;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [ApiController]
    [Authorize]
    [APIEndpoint]
    public class StatsController : ControllerBase
    {
        private StatsService statsService;
        public StatsController(StatsService statsService)
        {
            this.statsService = statsService;
        }

        [HttpGet]
        [Route("stats/exercise")]
        public async Task<List<StatsForExerciseDTO>> GetStatsForExercise([FromQuery] int exerciseId, [FromQuery] Guid userId)
        {
            return await statsService.GetStatsForExercise(exerciseId, userId);
        }


        [HttpGet]
        [Route("stats/exercise/1RM")]
        public async Task<List<StatsFor1RMDTO>> GetStatsFor1RM ([FromQuery] int exerciseId, [FromQuery] Guid userId)
        {
            return await statsService.GetStats1RM(exerciseId, userId);
        }
    }
}
