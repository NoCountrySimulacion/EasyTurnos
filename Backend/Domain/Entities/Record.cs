namespace Domain.Entities
{
    public class Record : BaseEntity<Guid>
    {
        public DateTime Date { get; set; }
        public string Description { get; set; }
        public Guid ClientId { get; set; }
        public Client Client { get; set; }
        public Guid ProfessionalId { get; set; }
        public Professional Professional { get; set; }
    }
}
