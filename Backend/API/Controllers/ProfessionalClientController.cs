﻿using Core.Services.Interfaces;
using Domain.Entities;
using DTOs;
using DTOs.Client;
using DTOs.Identity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Runtime.Intrinsics.X86;

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

    [HttpPost("RegisterClient")]
    public async Task<ActionResult<RegistrationResponse>> RegisterClientUser(Guid professionalId, ClientAddDto clientAddDto)
    {
        return Ok(await _clientService.RegisterClientUser(professionalId, clientAddDto));
    }

    [HttpGet("{clientId}")]
    public async Task<ActionResult> GetClientById(Guid professionalId, Guid clientId)
    {
        var result = await _clientService.GetClientById(professionalId, clientId);
        if (result == null)
        {
            return StatusCode(500, new { message = "Internal server error occurred." });
        }

        if (result.Success)
        {
            if (result.Data == null)
            {
                return NotFound(new { message = $"Client with ID {clientId} not found." });
            }
            return Ok(result);
        }
        else
        {
            if (result.Message == "Professional-client relationship not found." || result.Message == "Client not found.")
            {
                return NotFound(result);
            }
            return BadRequest(new { message = result.Message });
        }
    }

    [HttpGet]
    public async Task<ActionResult<ServiceResponse<List<ClientListDto>>>> GetAllClients(Guid professionalId)
    {
        var result = await _clientService.GetClients(professionalId);
        if (result == null)
        {
            return StatusCode(500, new { message = "Internal server error occurred." });
        }

        if (result.Success)
        {
            if (result.Data == null || result.Data.Count == 0)
            {
                return NoContent();
            }

            return Ok(result);
        }
        else
        {
            return BadRequest(new { message = result.Message });
        }
    }

    [HttpDelete("{clientId}")]
    public async Task<IActionResult> RemoveProfessionalClientRelation(Guid professionalId, Guid clientId)
    {
        var result = await _clientService.RemoveProfessionalClientRelation(professionalId, clientId);

        if (result.Success)
        {
            return Ok(result);
        }
        else if (result.Message == "Relation not found.")
        {
            return NotFound(result);
        }
        else
        {
            return BadRequest(result);
        }
    }

    [HttpPut("{clientId}")]
    public async Task<IActionResult> UpdateClientAsync(Guid professionalId, Guid clientId, ClientUpdateDto clientRequest)
    {
        var result = await _clientService.UpdateClientAsync(professionalId, clientId, clientRequest);

        if (result.Success)
        {
            return Ok(result);
        }
        else if (result.Message == "Professional - client relationship not found.")
        {
            return NotFound(result);
        }
        else if (result.Message == "Email is already in use.")
        {
            return Conflict(result);
        }
        else if (result.Message == "Client not found.")
        {
            return NotFound(result);
        }
        else
        {
            return BadRequest(result);
        }
    }
}