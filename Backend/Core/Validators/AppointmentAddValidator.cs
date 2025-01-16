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
            RuleFor(a => a.Name)
                .MaximumLength(50).WithMessage("{PropertyName} cannot be more than {MaxLength} characters.");

            RuleFor(a => a.StartDate)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .Must(BeAValidDate).WithMessage("{PropertyName} must be a valid date.")
                .Must(BeInTheFuture).WithMessage("{PropertyName} must be in the future.");

            RuleFor(a => a.EndDate)
                .NotEmpty().WithMessage("{PropertyName} is required.")
                .Must(BeAValidDate).WithMessage("{PropertyName} must be a valid date.")
                .Must((appointment, endDate) => BeInTheFutureAfterStartDate(appointment.StartDate, endDate))
                .WithMessage("{PropertyName} must be in the future or equal to Start Date.");
        }

        private bool BeAValidDate(DateTime date)
        {
            return date != default && date != DateTime.MinValue;
        }

        private bool BeInTheFuture(DateTime date)
        {
            return date > DateTime.Now;
        }

        private bool BeInTheFutureAfterStartDate(DateTime startDate, DateTime endDate)
        {
            return endDate > startDate;
        }
    }
}
