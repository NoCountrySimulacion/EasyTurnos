
namespace DTOs.Client;

public class ClientUpdateDto
{
    //public Guid Id { get; set; }
    public DateTime BirthDate { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string Password { get; set; } = string.Empty;
}
