using BL.Services;
using DTOs.Template;
using DTOs.Users;
using Resources.ValidationMessages;
using Utils;

namespace API.Validators
{
    public class TemplateValidators
    {
        public class AddTemplateValidator : BaseValidator<AddTemplateDTO>, IValidate<AddTemplateDTO>
        {
            private readonly TemplateService templateService;

            public AddTemplateValidator(TemplateService templateService)
            {
                this.templateService = templateService;

               
                ForProperty(t => t.Title)
                    .Check(async t => !await templateService.TitleIsUsed(t.Title), TemplateValidationMessages.TitleAlreadyUsed);

            }
        }
    }
}
