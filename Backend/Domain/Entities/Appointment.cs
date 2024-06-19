using Utilities.Enums;

namespace Domain.Entities
{
    public class Appointment : BaseEntity<Guid>
    {
        public string? Name { get; set; }
        public DateTime Date { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        //FK
        public Guid ClientId { get; set; }
        public Guid ProfessionalId { get; set; }
        public Guid? PaymentId { get; set; }
        //Navigation property 
        public Client Client { get; set; }
        public Professional Professional { get; set; }
        public Payment? Payment { get; set; }
    }
}
