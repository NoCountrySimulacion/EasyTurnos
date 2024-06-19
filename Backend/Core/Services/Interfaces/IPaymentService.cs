using DTOs;
using DTOs.Payment;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Core.Services.Interfaces
{
    public interface IPaymentService
    {
        Task<ServiceResponse<PaymentGetDto>> AddPayment(Guid appointmentId, PaymentAddDto newPayment);
    }
}
