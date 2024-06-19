using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities.Enums;

namespace DTOs.Payment
{
    public class PaymentGetDto
    {
        public decimal Amount { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
    }
}
