﻿using Entities.Models;
using FluentValidation;

namespace Services.Validators
{
    public class CategoryValidator : AbstractValidator<Category>
    {
        public CategoryValidator()
        {
            RuleFor(a => a.Name).Must(x => !string.IsNullOrWhiteSpace(x)).WithMessage("İsim Boş Olamaz!");
            RuleFor(a => a.Description).Must(x => !string.IsNullOrWhiteSpace(x)).WithMessage("Açıklama Boş Olamaz!");
            RuleFor(a => a.Name).MaximumLength(100).WithMessage("100 Karakterden Uzun Olamaz!");
            RuleFor(a => a.Description).MaximumLength(500).WithMessage("500 Karakterden Uzun Olamaz!");
        }
    }
}
