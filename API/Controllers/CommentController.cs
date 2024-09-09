using API.Attributes;
using BL.Services;
using DTOs.Comment;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [APIEndpoint]
    public class CommentController : ControllerBase
    {
        private CommentService commentService;
        public CommentController(CommentService commentService)
        {
            this.commentService = commentService;
        }

        [HttpPost]
        [Route("comment")]
        [Validate<AddCommentDTO>]
        public async Task<int> AddComment(AddCommentDTO commentDTO)
        {
            return await commentService.AddComment(commentDTO);
        }

        [HttpGet]
        [Route("comment/getByWorkout")]
        public async Task<List<ShowCommentDTO>> GetCommentsByWorkout([FromQuery] int workoutId, [FromQuery] int take)
        {
            return await commentService.GetCommentsByWorkout(workoutId, take);
        }


        [HttpGet]
        [Route("comment/getNumberByWorkout")]
        public async Task<int> GetNumberOfCommentsByWorkout([FromQuery] int workoutId)
        {
            return await commentService.GetNumberOfCommentsByWorkout(workoutId);
        }

        [HttpPut]
        [Route("comment/update")]
        [Validate<UpdateCommentDTO>]
        public async Task<int?> UpdateComment(UpdateCommentDTO newComment)
        {
            return await commentService.UpdateComment(newComment);
        }

        [HttpDelete]
        [Route("comment/remove")]
        public async Task<int?> RemoveComment([FromQuery] int commentId)
        {
            return await commentService.RemoveComment(commentId);
        }

        [HttpGet]
        [Route("comment/getById")]
        public async Task<UpdateCommentDTO?> GetCommentById([FromQuery] int commentId)
        {
            return await commentService.GetCommentById(commentId);
        }
    }

}