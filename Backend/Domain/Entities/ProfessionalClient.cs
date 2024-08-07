﻿namespace Domain.Entities
{
    public class ProfessionalClient : BaseEntity<Guid>
    {
        public Guid ProfessionalId { get; set; }
        public Professional Professional { get; set; }
        public Guid ClientId { get; set; }
        public Client Client { get; set; }
    }
}
