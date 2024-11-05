using API.Attributes;
using BL.Services;
using DA.Entities;
using DTOs.Exercise;
using DTOs.Query;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.OData.ModelBuilder;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [APIEndpoint]

    public class ExerciseController : ControllerBase
    {
        private readonly ExerciseService exerciseService;

        public ExerciseController(ExerciseService exerciseService)
        {
            this.exerciseService = exerciseService;
        }
        [HttpGet]
        [Route("exercise/getByWorkoutId")]
        public List<int> GetByWorkoutId([FromQuery] int workoutId)
        {
            return exerciseService.GetByWorkoutId(workoutId);
        }


        [HttpPost]
        [Route("exercise")]
        [CheckRole(Common.Enums.Roles.Admin)]

        public async Task<int> AddExercise([FromForm] AddExerciseDTO addExerciseDTO)
        {
            return await exerciseService.AddExercise(addExerciseDTO);
        }

        [HttpPost]
        [Route("exercise/getByCategory")]
        [APIEndpoint(Common.Enums.HttpMethodTypes.Get)]
        public async Task<List<ExerciseListItemDTO>> GetExercisesByCategory(QueryDTO<LikeValueFilterDTO> query)
        {
            return await exerciseService.GetExercisesByCategory(query);
        }

        [HttpGet]
        [Route("exercise/getAll")]
        public async Task<List<ExerciseListItemDTO>> GetExercises([FromQuery] int take, [FromQuery] int skip, [FromQuery] string name="")
        {
            return await exerciseService.GetExercises(take, skip,name);
        }

        [HttpGet]
        [Route("exercise/getByTemplate")]
        public async Task<List<string>> GetExercisesByTemplateId(int templateId)
        {
            return await exerciseService.GetExercisesByTemplate(templateId);
        }

        [HttpDelete]
        [Route("exercise/inactivate")]
        [CheckRole(Common.Enums.Roles.Admin)]

        public async Task<int?> InactivateExercise([FromQuery] int exerciseId)
        {
            return await exerciseService.InactivateExercise(exerciseId);
        }

        [HttpPut]
        [Route("exercise/update")]
        [CheckRole(Common.Enums.Roles.Admin)]

        public async Task<int?> UpdateExercise(UpdateExerciseDTO updatedExercise)
        {
            return await exerciseService.UpdateExercise(updatedExercise);
        }
        [HttpGet]
        [Route("exercise/getForUpdate")]
        public async Task<GetUpdateExerciseDTO?> GetExerciseForUpdate([FromQuery] int exerciseId)
        {
            return await exerciseService.GetExerciseForUpdate(exerciseId);
        }

        [HttpGet]
        [Route("exercise/getImage")]
        public async Task<byte[]?> GetExerciseImage([FromQuery] int exerciseId)
        {
            return await exerciseService.GetExerciseImage(exerciseId);
        }

        [HttpGet]
        [Route("exercise/getInfo")]
        public async Task<List<ExerciseListItemDTO>> GetExercisesInfo([FromQuery] int take, [FromQuery] int skip, [FromQuery] string? exerciseName)
        {
            return await exerciseService.GetExercisesInfo(take, skip, exerciseName);
        }

        [HttpGet]
        [Route("exercise/getInfoByTemplate")]
        public async Task<List<ExerciseListItemDTO>> GetExerciseInfoByTemplate([FromQuery] int templateId)
        {
            return await exerciseService.GetExerciseInfoByTemplate(templateId);
        }

    }
}

