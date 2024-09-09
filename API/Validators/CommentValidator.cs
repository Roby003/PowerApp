using BL.Services;
using DTOs.Category;
using DTOs.Comment;
using Microsoft.AspNetCore.Mvc.Formatters;
using Resources.ValidationMessages;
using Utils;

namespace API.Validators
{
    public class CommentValidators
    {
        public class AddCommentValidator : BaseValidator<AddCommentDTO>, IValidate<AddCommentDTO>
        {
            private readonly CommentService commentService;

            public AddCommentValidator(CommentService commentService)
            {
                this.commentService = commentService;

                ForProperty(c => c.Content)
                    .Check(c => !String.IsNullOrEmpty(c.Content), CommentValidationMessages.ContentRequired);

            }
        }

        public class UpdateCommentValidator : BaseValidator<UpdateCommentDTO>, IValidate<UpdateCommentDTO>
        {
            private readonly CommentService commentService;

            public UpdateCommentValidator(CommentService commentService)
            {
                this.commentService = commentService;

                ForProperty(c => c.Content)
                    .Check(c => !String.IsNullOrEmpty(c.Content), CommentValidationMessages.ContentRequired);

            }
        }
    }
}
