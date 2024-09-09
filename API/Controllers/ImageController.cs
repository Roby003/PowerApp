using API.Attributes;
using BL.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
    }
}
