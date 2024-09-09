using Microsoft.AspNetCore.Http;

namespace DTOs.Users
{
    public class RegisterUserDTO
    {
        public string Email { get; set; } = null!;
        public string Password { get; set; } = null!;
        public string UserName { get; set; } = null!;

        public IFormFile? Image { get; set; }

    }
}
