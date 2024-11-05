using API.Attributes;
using BL.Services;
using DTOs.Exercise;
using DTOs.Stats;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

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
        [Route("stats/exercise/sets")]
        public async Task<List<NoSetsForExerciseDTO>> GetSetsForExercise([FromQuery] int exerciseId, [FromQuery] Guid userId)
        {
            return await statsService.GetNumberOfSetsForExercise(exerciseId, userId);
        }

        [HttpGet]
        [Route("stats/exercise/volume")]
        public async Task<List<VolumeDataForExerciseDTO>> GetVolumeDataForExercise([FromQuery] int exerciseId, [FromQuery] Guid userId)
        {
            return await statsService.GetVolumeDataForExercise(exerciseId, userId);
        }


        [HttpGet]
        [Route("stats/exercise/1RM")]
        public async Task<List<StatsFor1RMDTO>> GetStatsFor1RM([FromQuery] int exerciseId, [FromQuery] Guid userId)
        {
            return await statsService.GetStats1RM(exerciseId, userId);
        }

        [HttpGet]
        [Route("stats/exercise/1RMbyTemplate")]
        public async Task<List<StatsFor1RMDTO>> GetStatsFor1RMbyTemplate([FromQuery] int exerciseId, [FromQuery] int templateId)
        {
            return await statsService.GetStats1RMbyTemplate(exerciseId, templateId);
        }

        [HttpGet]
        [Route("stats/template/volume")]
        public async Task<List<StatsForTemplateProgressDTO>> GetVolumeDataForTemplate([FromQuery] int templateId)
        {
            return await statsService.GetStatsForTemplateProgress(templateId);
        }

        [HttpGet]
        [Route("stats/personal/exertion/avg")]
        public async Task<PersonalAvgExertionDataDTO> GetPersonalAvgExertion([FromQuery] Guid userId)
        {
            return await statsService.GetPersonalAvgExertion(userId);
        }
        [HttpGet]
        [Route("stats/personal")]
        public async Task<List<PersonalDataDTO>> GetPersonalData([FromQuery] Guid userId)
        {
            return await
                statsService.GetPersonalData(userId);
        }


    }
}
