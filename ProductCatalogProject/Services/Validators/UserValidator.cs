using Entities.DataTransferObject;
using Entities.Models;
using FluentValidation;

namespace Services.Validators
{
    public class UserValidator : AbstractValidator<User>
    {
        public UserValidator()
        {
            RuleFor(a => a.FirstName).Must(x => !string.IsNullOrWhiteSpace(x)).WithMessage("İsim Boş Olamaz!");
            RuleFor(a => a.LastName).Must(x => !string.IsNullOrWhiteSpace(x)).WithMessage("Soyisim Boş Olamaz!");
            RuleFor(a => a.FirstName).MaximumLength(100).WithMessage("100 Karakterden Uzun Olamaz!");
            RuleFor(a => a.LastName).MaximumLength(100).WithMessage("100 Karakterden Uzun Olamaz!");
        }
    }

    public class UserLoginValidator : AbstractValidator<UserLoginRequest>
    {
        public UserLoginValidator()
        {
            RuleFor(a => a.Email).Must(x => !string.IsNullOrWhiteSpace(x)).WithMessage("Email Boş Olamaz!");
            RuleFor(a => a.Email).EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible).WithMessage("Email Geçerli Olmalı!");
            RuleFor(a => a.Password).Must(x => !string.IsNullOrWhiteSpace(x)).WithMessage("Şifre Boş Olamaz!");
        }
    }

    public class UserRegistirationValidator : AbstractValidator<UserRegistrationDto>
    {
        public UserRegistirationValidator()
        {
            RuleFor(a => a.Email).Must(x => !string.IsNullOrWhiteSpace(x)).WithMessage("Email Boş Olamaz!");
            RuleFor(a => a.Email).EmailAddress(FluentValidation.Validators.EmailValidationMode.AspNetCoreCompatible).WithMessage("Email Geçerli Olmalı!");
            RuleFor(a => a.Password).Must(x => !string.IsNullOrWhiteSpace(x)).WithMessage("Şifre Boş Olamaz!");
            RuleFor(a => a.Password).MaximumLength(20).WithMessage("20 Karakterden Uzun Olamaz!");
            RuleFor(a => a.Password).MinimumLength(8).WithMessage("8 Karakterden Kısa Olamaz!");
            RuleFor(a => a.FirstName).Must(x => !string.IsNullOrWhiteSpace(x)).WithMessage("İsim Boş Olamaz!");
            RuleFor(a => a.LastName).Must(x => !string.IsNullOrWhiteSpace(x)).WithMessage("Soyisim Boş Olamaz!");
            RuleFor(a => a.FirstName).MaximumLength(100).WithMessage("100 Karakterden Uzun Olamaz!");
            RuleFor(a => a.LastName).MaximumLength(100).WithMessage("100 Karakterden Uzun Olamaz!");
        }
    }
}