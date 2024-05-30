using Utilities.Enums;

namespace Domain.Entities
{
    public class Appointment : BaseEntity<Guid>
    {
        public DateTime Date { get; set; }
        public DateTime SlotDate { get; set; }
        public bool ConfirmationSent { get; set; }
        public Status Status { get; set; }
        //FK
        public Guid ClientId { get; set; }
        public Guid ProfessionalId { get; set; }
        public Guid PaymentId { get; set; }
        //Navigation property 
        public Client Client { get; set; }
        public Professional Professional { get; set; }
        public Payment Payment { get; set; }
    }
}
