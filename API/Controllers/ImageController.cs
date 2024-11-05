using API.Attributes;
using BL.Services;
using Common.Enums;
using DTOs.Image;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Identity.Client;

namespace API.Controllers
{
    [ApiController]
    [APIEndpoint]

    public class ImageController : ControllerBase
    {
        private ImageService imageService;
        public ImageController(ImageService imageService)
        {
            this.imageService = imageService;
        }

        [HttpGet]
        [Route("/image")]
        public async Task<byte[]> GetImage([FromQuery] int imageId)
        {
            return await imageService.GetImgContentAsync(imageId);
        }

        [HttpPost]
        [Route("/image/getList")]
        [APIEndpoint(HttpMethodTypes.Get)]
        public async Task<List<byte[]>> GetImgList(ImageListDTO dto)
        {
            return await imageService.GetImgListByIds(dto);
        }
    }
}
