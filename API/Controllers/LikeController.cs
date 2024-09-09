using API.Attributes;
using BL.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using DTOs.Likes;

namespace API.Controllers
{

    [ApiController]
    [Authorize]
    [APIEndpoint]
    public class LikeController : ControllerBase
    {
        private LikeService likeService;
        public LikeController(LikeService likeService)
        {
            this.likeService = likeService;
        }

        [HttpPost]
        [Route("like")]
        public async Task<int?> LikeWorkout([FromQuery] int workoutId)
        {
            return await likeService.LikeWorkout(workoutId);
        }

        [HttpGet]
        [Route("like/isWorkoutLiked")]
        public async Task<GetLikesInfoDTO> IsWorkoutLiked([FromQuery] int workoutId)
        {
            return await likeService.IsWorkoutLiked(workoutId);
        }

    }
}
