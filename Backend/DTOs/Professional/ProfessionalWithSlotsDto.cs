using DTOs.Slot;

namespace DTOs.Professional
{
    public class ProfessionalWithSlotsDto
    {
        public Guid Id { get; set; }
        public string Specialty { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ICollection<SlotGetDto> Slots { get; set; }
    }


}
