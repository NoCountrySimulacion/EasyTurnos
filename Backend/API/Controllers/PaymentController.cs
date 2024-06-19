using Core.Services.Interfaces;
using DTOs;
using DTOs.Payment;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {

        private readonly IPaymentService _paymentService;

        public PaymentController(IPaymentService paymentService)
        {
            _paymentService = paymentService;
        }

        [HttpPost("{appointmentId}")]
        public async Task <ActionResult<ServiceResponse<PaymentGetDto>>> AddPayment(Guid appointmentId, PaymentAddDto newPayment)
        {
            var response = await _paymentService.AddPayment(appointmentId, newPayment);
            return Ok(response);
        }
    }
}
