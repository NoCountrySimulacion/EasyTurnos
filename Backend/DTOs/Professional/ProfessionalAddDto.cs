using DTOs.Identity;
using DTOs.Slot;

namespace DTOs.Professional
{
    public class ProfessionalAddDto
    {
        public string Specialty { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        //public ICollection<SlotAddDto> Slots { get; set; }

        public RegistrationRequest RegistrationRequest { get; set; } 
    }
}
