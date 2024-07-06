namespace Domain.Entities
{
    public class Slot : BaseEntity<Guid>
    {
        public string Day {  get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public Guid ProfessionalId { get; set; }
        public Professional Professional { get; set; }
    }
}
