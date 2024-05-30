using Microsoft.AspNetCore.Identity;

namespace Domain.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public Professional Professional { get; set; }
        public Guid ProfessionalId { get; set; }
        public Client Client { get; set; }
        public Guid ClientId { get; set; }
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
    }
}
