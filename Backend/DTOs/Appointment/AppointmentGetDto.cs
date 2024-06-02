using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Utilities.Enums;

namespace DTOs.Appointment
{
    public class AppointmentGetDto
    {
        public DateTime Date { get; set; }
        public DateTime SlotDate { get; set; }
        public bool ConfirmationSent { get; set; }
        public Status Status { get; set; }
    }
}
