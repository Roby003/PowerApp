using Microsoft.AspNetCore.Http;

namespace DTOs.Users
{
    public class UpdateUserDTO
    {
        public Guid Id { get; set; }
        public string Email { get; set; } = null!;
        public string UserName { get; set; } = null!;

        public int RoleId { get; set; }

        public string Password { get; set; } = null!;
        public IFormFile? Image { get; set; }



    }
}
