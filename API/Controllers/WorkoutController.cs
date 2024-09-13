using API.Attributes;
using BL.Services;
using Common.Enums;
using DTOs.Query;
using DTOs.Set;
using DTOs.Users;
using DTOs.Workout;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [APIEndpoint]
    public class WorkoutController : ControllerBase
    {
        private readonly WorkoutService workoutService;

        public WorkoutController(WorkoutService workoutService)
        {
            this.workoutService = workoutService;
        }

        [HttpPost]
        [Route("workout")]
        [Validate<LogWorkoutDTO>]
        public async Task<int> CreateWorkout(LogWorkoutDTO logWorkoutDTO)
        {
            return await workoutService.CreateWorkout(logWorkoutDTO);
        }

        [HttpGet]
        [Route("workout/getPersonal")]
        public async Task<List<ShowWorkoutDTO>> GetPersonalWorkouts([FromQuery] int take, [FromQuery] int skip, [FromQuery] Guid userId)
        {
            return await workoutService.GetPersonalWorkouts(take, skip, userId);
        }
        [HttpGet]
        [Route("workout/getPersonalByActivity")]
        public async Task<List<ShowWorkoutDTO>> GetPersonalWorkoutsByActivity([FromQuery] int take, [FromQuery] int skip, [FromQuery] Guid userId)
        {
            return await workoutService.GetPersonalWorkoutsByActivity(take, skip, userId);
        }

        [HttpGet]
        [Route("workout/getFollowed")]
        public async Task<List<ShowWorkoutDTO>> GetFollowedWorkouts([FromQuery] int take, [FromQuery] int skip, [FromQuery] Guid userId)
        {
            return await workoutService.GetFollowedWorkouts(take, skip, userId);
      
        }
        [HttpGet]
        [Route("workout/getFollowedByActivity")]
        public async Task<List<ShowWorkoutDTO>> GetFollowedWorkoutsByActivity([FromQuery] int take, [FromQuery] int skip, [FromQuery] Guid userId)
        {
            return await workoutService.GetFollowedWorkoutsByActivity(take, skip, userId);

        }

        [HttpGet]
        [Route("workout/getById")]
        public async Task<ShowWorkoutDTO?> GetWorkoutById([FromQuery] int workoutId)
        {
            return await workoutService.GetWorkoutById(workoutId);
        }
        [HttpDelete]
        [Route("workout/remove")]
        public async Task<int?> RemoveWorkout([FromQuery] int workoutId)
        {
            return await workoutService.RemoveWorkout(workoutId);
        }

        [HttpGet]
        [Route("workout/getPreviousByTemplateId")]
        public async Task<GetWorkoutForLogDTO?> GetPreviousWorkoutByTemplateId([FromQuery] int templateId)
        {
            return await workoutService.GetPreviousWorkoutByTemplateId(templateId);
        }

        [HttpGet]
        [Route("workout/getFeatured")]
        public async Task<ShowWorkoutDTO> GetFeaturedWorkout()
        {
            return await workoutService.GetFeaturedWorkout();
        }
    }
}
