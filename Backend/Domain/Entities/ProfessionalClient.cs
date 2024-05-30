namespace Domain.Entities
{
    public class ProfessionalClient
    {
        public Guid ProfessionalId { get; set; }
        public Professional Professional { get; set; }
        public Guid ClientId { get; set; }
        public Client Client { get; set; }
    }
}
