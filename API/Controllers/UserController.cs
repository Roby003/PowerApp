using API.Attributes;
using BL.Services;
using Common.Enums;
using Common.Interfaces;
using DTOs.Query;
using DTOs.Users;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Authorize]
    [APIEndpoint]
    public class UserController : ControllerBase
    {
        private readonly UserService UserService;

        public UserController(UserService userService)
        {
            UserService = userService;
        }

        [HttpGet]
        [Route("user/{id}")]
        public async Task<UserDetailsDTO?> GetUserById(Guid id)
        {
            return await UserService.GetUserDetailsById(id);
        }
        [HttpPost]
        [Route("users")]
        [APIEndpoint(HttpMethodTypes.Get)]
        public async Task<List<UserListItemDTO>> GetUsers(QueryDTO<LikeValueFilterDTO, InValueListFilterDTO, BetweenValuesFilterDTO> query)
        {
            return await UserService.GetUserList(query);
        }


        [HttpPost]
        [Route("user/register")]
        [AllowAnonymous]
        [Validate<RegisterUserDTO>]
        public async Task<int> RegisterUser(RegisterUserDTO userDTO)
        {

            return await UserService.RegisterUser(userDTO);
        }
        [HttpPut]
        [Route("user/update")]
        [Validate<UpdateUserDTO>]
        public async Task<int?> UpdateUser(UpdateUserDTO userDTO)
        {
            return await UserService.UpdateUser(userDTO);
        }
        [HttpPut]
        [Route("user/deactivate/{userId}")]
        [CheckRole(Roles.Admin)]
        public async Task<int?> DeactivateUser(Guid userId)
        {
            return await UserService.DeactivateUser(userId);
        }
        [HttpDelete]
        [Route("user/{userId}")]
        [CheckRole(Roles.Admin)]
        public async Task<int?> DeleteUser(Guid userId)
        {
            return await UserService.DeleteUser(userId);
        }



        [HttpGet]
        [Route("user/getFollowedUsers")]
        public async Task<List<UserListItemDTO>> GetFollowedUsers([FromQuery] Guid userId, IQueryBuilder query)
        {
            return await UserService.GetFollowedUsers(userId, query);

        }
        [HttpGet]
        [Route("user/getInfo")]
        public async Task<UserInfoDTO> GetUserInfo(Guid userId)
        {
            return await UserService.GetUserInfo(userId);
        }

        [HttpGet]
        [Route("user/getByUsername")]
        public async Task<List<UserListItemDTO>> GetUsersByUsername([FromQuery] string userName)
        {
            return await UserService.GetUsersByUsername(userName);
        }

        [HttpPost]
        [Route("user/followUser")]
        public async Task<int> FollowUser([FromQuery] string followedUserId)
        {
            var followedUserIdGuid = new Guid(followedUserId);
            return await UserService.FollowUser(followedUserIdGuid);
        }
        [HttpGet]
        [Route("user/getFollowedByUsername")]
        public async Task<List<UserListItemDTO>> GetFollowedByUsername([FromQuery] string username, [FromQuery] Guid userId)
        {
            return await UserService.GetFollowedByUsername(username, userId);
        }
        [HttpGet]
        [Route("user/getFollowingByUsername")]
        public async Task<List<UserListItemDTO>> GetFollowingByUsername([FromQuery] string username, [FromQuery] Guid userId)
        {
            return await UserService.GetFollowingByUsername(username, userId);
        }

        [HttpGet]
        [Route("user/getWithApplication")]
        [CheckRole(Roles.Admin)]
        public async Task<List<UserApplicationDTO>> GetUsersWithApplications([FromQuery] int take, [FromQuery] int skip)
        {
            return await UserService.GetUsersWithApplications(take,skip);
        }

        [HttpGet]
        [Route("user/getImage")]
        public async Task<byte[]> GetUserImage([FromQuery] Guid userId)
        {
            return await UserService.GetUserImage(userId);
        }

        [HttpGet]
        [Route("user/getCoaches")]
        public async Task<List<UserSmallListItemDTO>> GetCoachUsers()
        {
            return await UserService.GetCoachUsers();
        }
    }


}
