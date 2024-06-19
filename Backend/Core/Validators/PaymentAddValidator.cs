using DTOs.Payment;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Validators
{
    public class PaymentAddValidator : AbstractValidator<PaymentAddDto>
    {
        public PaymentAddValidator()
        {
            RuleFor(p => p.Amount)
                .GreaterThan(0).WithMessage("Amount must be greater than zero.");

            RuleFor(p => p.PaymentMethod)
                .IsInEnum().WithMessage("Invalid payment method.");
        } 
    }
}
