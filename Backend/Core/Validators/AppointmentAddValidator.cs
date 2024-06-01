using DTOs.Appointment;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Validators
{
    public class AppointmentAddValidator : AbstractValidator<AppointmentAddDto>
    {
        public AppointmentAddValidator()
        {
            RuleFor(a => a.SlotDate)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .Must(BeAValidDate).WithMessage("{PropertyName} must be a valid date.")
                .Must(BeInTheFuture).WithMessage("{PropertyName} must be in the future.");
        }

        private bool BeAValidDate(DateTime date)
        {
            return date != default && date != DateTime.MinValue;
        }

        private bool BeInTheFuture(DateTime date)
        {
            return date > DateTime.UtcNow;
        }
    }
}
