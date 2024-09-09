using BL.Services;
using DTOs.Template;
using DTOs.Workout;
using Resources.ValidationMessages;
using Utils;

namespace API.Validators
{
    
        public class WorkoutValidators
    {
            public class AddWorkoutValidator : BaseValidator<LogWorkoutDTO>, IValidate<LogWorkoutDTO>
            {
                private readonly WorkoutService workoutService;

            public AddWorkoutValidator(WorkoutService workoutService)
            {
                this.workoutService = workoutService;

                ForProperty(w => w.setsDto).Check(w => workoutService.HasEmptyOrNegativeSets(w.setsDto),WorkoutValidationMessages.ContainsEmptySets);

                }
            }
        }
    
}
