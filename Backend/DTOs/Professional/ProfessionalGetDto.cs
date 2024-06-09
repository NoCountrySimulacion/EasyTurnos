namespace DTOs.Professional
{
    public class ProfessionalGetDto
    {
        public Guid Id { get; set; }
        public string Speciality { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string FirstName { get; set; } = string.Empty;
        public string LastName { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
    }
}
