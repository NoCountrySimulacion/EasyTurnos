using Utilities.Enums;

namespace Domain.Entities
{
    public class Payment : BaseEntity<Guid>
    {
        public decimal Amount { get; set; }
        public PaymentMethod PaymentMethod { get; set; }
        //FK
        public Guid AppointmentId { get; set; }
        //Navigation property
        public Appointment Appointment { get; set; }
    }
}
