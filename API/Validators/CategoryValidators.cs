using BL.Services;
using DTOs.Category;
using DTOs.Template;
using Resources.ValidationMessages;
using Utils;

namespace API.Validators
{
    public class CategoryValidators
    {
        public class AddCategoryValidator : BaseValidator<AddCategoryDTO>, IValidate<AddCategoryDTO>
        {
            private readonly CategoryService categoryService;

            public AddCategoryValidator(CategoryService categoryService)
            {
                this.categoryService = categoryService;


                ForProperty(c => c.Name)
                    .Check(c => !String.IsNullOrEmpty(c.Name), CategoryValidationMessages.NameRequired)
                    .Check(async c => !await categoryService.NameIsUsed(c.Name), CategoryValidationMessages.NameIsUsed);

            }
        }

        public class UpdateCategoryValidator : BaseValidator<UpdateCategoryDTO>, IValidate<UpdateCategoryDTO>
        {
            private readonly CategoryService categoryService;

            public UpdateCategoryValidator(CategoryService categoryService)
            {
                this.categoryService = categoryService;

                ForProperty(c => c.Name)
                       .Check(c => !String.IsNullOrEmpty(c.Name), CategoryValidationMessages.NameRequired)
                       .Check(async c => !await categoryService.NameIsUsed(c.Name, c.CategoryId), CategoryValidationMessages.NameIsUsed);

            }
        }
    }
}

