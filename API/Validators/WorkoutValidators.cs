using BL.Services;
using DTOs.Set;
using DTOs.Template;
using DTOs.Workout;
using Newtonsoft.Json;
using Resources.ValidationMessages;
using Utils;

namespace API.Validators
{
    
        public class WorkoutValidators
    {
            public class AddWorkoutValidator : BaseValidator<IFormCollection>, IValidate<IFormCollection>
            {
                private readonly WorkoutService workoutService;

            public AddWorkoutValidator(WorkoutService workoutService)
            {
                this.workoutService = workoutService;

                ForProperty(w => w).Check(w => workoutService.HasEmptyOrNegativeSets(JsonConvert.DeserializeObject<List<AddSetDTO>>(w["setsDto"])),WorkoutValidationMessages.ContainsEmptySets);

                }
            }
        }
    
}
