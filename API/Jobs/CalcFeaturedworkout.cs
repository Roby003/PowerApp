using BL.Services;

namespace API.Jobs
{
    public class CalcFeaturedworkout
    {
        public readonly WorkoutService workoutService;
        public CalcFeaturedworkout(WorkoutService workoutService)
        {
            this.workoutService = workoutService;
        }

        public  void  Calc()
        {
             workoutService.CalculateFeaturedWorkout();
        }
    }
}
