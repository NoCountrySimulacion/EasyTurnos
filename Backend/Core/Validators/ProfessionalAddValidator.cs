using DTOs.Professional;
using FluentValidation;

namespace Core.Validators
{
    public class ProfessionalAddValidator : AbstractValidator<ProfessionalAddDto>
    {
        public ProfessionalAddValidator()
        {
            RuleFor(p => p.Speciality)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .MaximumLength(100).WithMessage("{PropertyName} cannot be more than {MaxLength} characters");

            RuleFor(p => p.Description)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .MaximumLength(520).WithMessage("{PropertyName} cannot be more than {MaxLength} characters");
        }
    }
}
