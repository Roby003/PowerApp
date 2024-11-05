using AutoMapper;
using DA.Entities;
using DTOs.Category;
using DTOs.Notification;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;

namespace DTOs.Mappers
{

    public class NotificationMappers : BaseMapper
    {
        public readonly ClaimsPrincipal CurrentUser;

        public NotificationMappers(IMapper mapper, ClaimsPrincipal currentUser) : base(mapper)
        {
            CurrentUser = currentUser;
        }
        public override void Config(IMapperConfigurationExpression config)
        {
            config.CreateMap<DA.Entities.Notification, ShowNotificationDTO>()
                .ForMember(dest => dest.TimeSpanDiff,opt=>opt.MapFrom(src=>DateTime.Now-src.CreatedDate));
        }
    }
}
