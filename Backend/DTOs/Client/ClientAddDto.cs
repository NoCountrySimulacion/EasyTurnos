
using DTOs.Identity;

namespace DTOs.Client;

public class ClientAddDto
{
    public DateTime BirthDate { get; set; }
    public RegistrationRequest RegistrationRequest { get; set; }
}
