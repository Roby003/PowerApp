using BL.UnitOfWork;
using Common.AppSettings;
using DA.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Utils;

namespace BL.Services
{

    public class ImageService : BaseService
    {
        private readonly ClaimsPrincipal CurrentUser;
        private readonly MapperService Mapper;

        public ImageService(MapperService mapper, AppUnitOfWork unitOfWork, ILogger logger, IAppSettings appSettings, ClaimsPrincipal currentUser) : base(unitOfWork, logger, appSettings)
        {
            CurrentUser = currentUser;
            Mapper = mapper;
        }

        public async Task<byte[]> GetImgContentAsync(int? imageId)
        {
            var img = await UnitOfWork.Queryable<Image>().FirstOrDefaultAsync(img => img.ImageId == imageId);
            return img==null ?  (Array.Empty<byte>()) :img.ContentFile;


        }

        public byte[] GetImgContent(int? imageId)
        {
            var img =  UnitOfWork.Queryable<Image>().FirstOrDefault(img => img.ImageId == imageId);
            return img == null ? (Array.Empty<byte>()) : img.ContentFile;


        }
    }
}
