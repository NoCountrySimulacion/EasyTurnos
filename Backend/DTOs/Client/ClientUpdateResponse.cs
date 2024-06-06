using Domain.Entities;

namespace DTOs.Client;

public class ClientUpdateResponse
{
    public Guid Id { get; set; }
    public DateTime BirthDate { get; set; }
    public ApplicationUser ApplicationUser { get; set; }
}
