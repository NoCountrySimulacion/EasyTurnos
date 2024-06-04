using Azure;
using Core.Services.Interfaces;
using DTOs;
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

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<ClientListDto>>>> GetAllClients()
    {
        var result = await _clientService.GetClients();
        if (result == null)
        {
            return StatusCode(500, new { message = "Internal server error occurred." });
        }

        if (result.Success)
        {
            if (result.Data == null || result.Data.Count == 0)
            {
                return NotFound(new { message = "No clients found." });
            }

            return Ok(result);
        }
        else
        {
            return BadRequest(new { message = result.Message });
        }
    }
}