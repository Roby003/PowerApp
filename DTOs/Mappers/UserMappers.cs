using AutoMapper;
using Common.Enums;
using DA.Entities;
using DTOs.Users;
using System.Security.Claims;
using Utils;

namespace DTOs.Mappers
{
    public class UserMappers : BaseMapper
    {
        public readonly ClaimsPrincipal CurrentUser;

        public UserMappers(IMapper mapper, ClaimsPrincipal currentUser) : base(mapper)
        {
            CurrentUser = currentUser;
        }
        public override void Config(IMapperConfigurationExpression config)
        {
            config.CreateMap<RegisterUserDTO, User>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(dest => dest.CreatedDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.LastModifiedDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.IsActive, opt => opt.MapFrom(src => true))
                .ForMember(dest => dest.RoleId, opt => opt.MapFrom(src => (byte)Roles.Visitor));


            config.CreateMap<UpdateUserDTO, User>()
                .ForMember(dest => dest.LastModifiedDate, opt => opt.MapFrom(src => DateTime.Now));

            config.CreateMap<User, UserDetailsDTO>();
              
            config.CreateMap<User, UserListItemDTO>()
                .ForMember(dest => dest.Image, opt => opt.MapFrom(src => src.Image.ContentFile));
        }
    }
}
