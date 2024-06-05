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
        public Guid Id { get; set; }
        public string? Name { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public bool ConfirmationSent { get; set; }
        public Status Status { get; set; }
        public Guid ProfessionalId { get; set; }
        public Guid ClientId { get; set; }
    }
}
