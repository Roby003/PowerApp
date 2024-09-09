using API.Jobs;
using Hangfire;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    public class JobController : ControllerBase
    {
        [HttpPost]
        [Route("calculateFeatured")]
        public ActionResult CreateBackGroundJob()
        {
            BackgroundJob.Enqueue<CalcFeaturedworkout>(x => x.Calc());
            return Ok();
        }

        [HttpPost]
        [Route("createRecurring")]
        public ActionResult CreateReccuringJob()
        {
            RecurringJob.AddOrUpdate<CalcFeaturedworkout>("Featured Workout",   x =>   x.Calc(), "0 0 * * 0");
            return Ok();
        }



}
}
