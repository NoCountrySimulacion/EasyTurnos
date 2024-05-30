namespace Domain.Entities
{
    public class Slot : BaseEntity<Guid>
    {
        public DateTime AvailableSlot { get; set; }
        public Guid ProfessionalId { get; set; }
        public Professional Professional { get; set; }
    }
}
