using BL.Services;
using DTOs.Users;
using Microsoft.AspNetCore.Mvc.Formatters;
using Resources.ValidationMessages;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Utils;

namespace API.Validators
{
    public class RegisterUserValidator : BaseValidator<RegisterUserDTO>, IValidate<RegisterUserDTO>
    {
        private readonly UserService UserService;

        public RegisterUserValidator(UserService userService)
        {
            UserService = userService;

            ForProperty(p => p.Email)
                .Check(p => !String.IsNullOrEmpty(p.Email), UserValidationMessages.EmailRequired)
                .Check(p => p.Email.IsValidEmail(), UserValidationMessages.EmailNotValid)
                .Check(async p => !await UserService.IsEmailUsed(p.Email), UserValidationMessages.EmailAlreadyUsed);
            ForProperty(p => p.Password)
                .Check(p => !String.IsNullOrEmpty(p.Password), UserValidationMessages.PasswordRequired)
                .Check(p => Regex.IsMatch(p.Password, "^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"), UserValidationMessages.PasswordNotValid);
            ForProperty(p => p.UserName)
                .Check(p => !String.IsNullOrEmpty(p.UserName), UserValidationMessages.UsernameRequierd)
                .Check(async p => !await UserService.IsUsernameUsed(p.UserName), UserValidationMessages.UsernameAleradyUsed);
        }
    }
    public class UpdateUserValidator : BaseValidator<UpdateUserDTO>, IValidate<UpdateUserDTO>
    {
        private readonly UserService UserService;
        private readonly ClaimsPrincipal CurrentUser;


        public UpdateUserValidator(UserService userService, ClaimsPrincipal currentUser)
        {
            UserService = userService;
            CurrentUser = currentUser;

            ForProperty(p => p.Email)
                .Check(p => !String.IsNullOrEmpty(p.Email), UserValidationMessages.EmailRequired)
                .Check(p => p.Email.IsValidEmail(), UserValidationMessages.EmailNotValid)
                .Check(async p => !await UserService.IsEmailUsed(p.Email, currentUser.Id()), UserValidationMessages.EmailAlreadyUsed);
            ForProperty(p => p.UserName)
            .Check(p => !String.IsNullOrEmpty(p.UserName), UserValidationMessages.UsernameRequierd)
            .Check(async p => !await UserService.IsUsernameUsed(p.UserName, currentUser.Id()), UserValidationMessages.UsernameAleradyUsed);
            ForProperty(p => p.Password)
                .Check(async p => await UserService.CheckOldPasswordHash(p), UserValidationMessages.IncorrectPassword);
        }
    }
}
