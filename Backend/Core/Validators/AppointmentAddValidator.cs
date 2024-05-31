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

        }
    }
}
