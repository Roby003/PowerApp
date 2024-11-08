﻿using BL.UnitOfWork;
using Common.AppSettings;
using DA.Entities;
using DTOs.Image;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using System.Xml;
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

        public async Task<List<byte[]>> GetImgListByIds(ImageListDTO dto)
        {
            return await UnitOfWork.Queryable<Image>().Where(i => dto.ImageIds.Contains(i.ImageId)).Select(i=>i.ContentFile).ToListAsync();
        }

      
    }
}
