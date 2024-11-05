using Utils;

namespace DTOs.Users
{
    public class UserDetailsDTO: IAuthUser
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = null!;
        public string Email { get; set; } = null!;
        public byte RoleId { get; set; }
        public byte[]? Image {  get; set; } = new byte[0];
        public string? Description { get; set; }
    }
}
