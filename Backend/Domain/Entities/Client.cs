namespace Domain.Entities
{
    public class Client : BaseEntity<Guid>
    {
        public DateTime BirthDate { get; set; }
        public Guid ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public ICollection<ProfessionalClient> ProfessionalClients { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
        public ICollection<Record> Records { get; set; }
    }
}
