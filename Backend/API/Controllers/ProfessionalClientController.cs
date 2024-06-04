using Core.Services.Interfaces;
using DTOs.Client;
using DTOs.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

//[Authorize(Roles = "Professional")]
[Route("api/professionals/{professionalId}/clients")]
[ApiController]
public class ProfessionalClientController : ControllerBase
{
    private readonly IClientService _clientService;

    public ProfessionalClientController(IClientService clientService)
    {
        _clientService = clientService;
    }

    //[HttpPost]
    //public async Task<ActionResult<ClientCreatedDto>> AddClient(Guid professionalId, ClientAddDto clientAddDto)
    //{
    //    return Ok(await _clientService.AddClientAsync(professionalId, clientAddDto));
    //}

    [HttpPost("RegisterClient")]
    public async Task<ActionResult<RegistrationResponse>> RegisterClientUser(Guid professionalId, ClientAddDto clientAddDto)
    {
        return Ok(await _clientService.RegisterClientUser(professionalId, clientAddDto));
    }

    [HttpGet("{clientId}")]
    public async Task<ActionResult> GetClientById(Guid clientId)
    {
        var result = await _clientService.GetClientById(clientId);
        if (result != null)
            return Ok(result);
        else
            return NotFound(new { message = $"Client with ID {clientId} not found." });
    }
}