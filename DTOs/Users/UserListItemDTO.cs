using Microsoft.Extensions.Primitives;

namespace DTOs.Users
{
    public class UserListItemDTO
    {
        public Guid Id { get; set; }
        public string UserName { get; set; } = null!;
        public byte RoleId { get; set; }
        public byte[] Image { get; set; } = new byte[0];
    }
}
