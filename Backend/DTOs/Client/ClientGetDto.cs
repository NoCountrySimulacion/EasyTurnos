

using System.ComponentModel.DataAnnotations;

namespace DTOs.Client;

public class ClientGetDto
{
    public Guid Id { get; set; }
    [DataType(DataType.Date)]
    public DateTime BirthDate { get; set; }
    public string Email { get; set; }
    public string PhoneNumber { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
}
