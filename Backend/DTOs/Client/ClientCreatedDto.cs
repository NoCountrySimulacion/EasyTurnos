namespace DTOs.Client;

public class ClientCreatedDto
{
    public Guid UserId { get; set; }
    public string Token { get; set; } = string.Empty;
}
