﻿namespace Domain.Entities
{
    public class Professional : BaseEntity<Guid>
    {
        public ApplicationUser ApplicationUser { get; set; }
        public string Specialty { get; set; } = "No specialty established";
        public string Description { get; set; } = "No Description established";
        public ICollection<ProfessionalClient> ProfessionalClients { get; set; }
        public ICollection<Record> Records { get; set; }
        public ICollection<Slot> Slots { get; set; }
        public ICollection<Appointment> Appointments { get; set; }
    }
}