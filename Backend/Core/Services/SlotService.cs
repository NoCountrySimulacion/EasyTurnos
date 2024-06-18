using AutoMapper;
using Core.Services.Interfaces;
using Domain.Entities;
using DTOs;
using DTOs.Slot;
using Infrastructure.Repositories.Interfaces;
using Microsoft.Extensions.Logging;

namespace Core.Services
{
    public class SlotService : ISlotService
    {

        private readonly IMapper _mapper;
        private readonly ISlotRepository _slotRepository;
        private readonly ILogger<SlotService> _logger;

        public SlotService(IMapper mapper, ISlotRepository slotRepository, ILogger<SlotService> logger)
        {
            _mapper = mapper;
            _slotRepository = slotRepository;
            _logger = logger;
        }

        public async Task<ServiceResponse<bool>> AddSlots(List<SlotAddDto> addSlots, Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                var newSlots = _mapper.Map<List<Slot>>(addSlots);
                foreach (var slot in newSlots)
                {
                    slot.ProfessionalId = professionalId;
                }
                await _slotRepository.InsertRange(newSlots);
                await _slotRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Slots added successfully";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }
        public async Task<ServiceResponse<bool>> DeleteSlots(Guid professionalId, List<Guid> slotIds)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                if (await _slotRepository.DeleteSlots(professionalId, slotIds))
                    await _slotRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Range deleted successfully.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<bool>> DeleteAllSlotsByProfessionalId(Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<bool>();

            try
            {
                if (await _slotRepository.DeleteAllSlotsByProfessionalId(professionalId))
                    await _slotRepository.SaveChangesAsync();

                serviceResponse.Data = true;
                serviceResponse.Message = "Range deleted successfully.";
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }

        public async Task<ServiceResponse<List<SlotGetDto>>> GetAllSlots(Guid professionalId)
        {
            var serviceResponse = new ServiceResponse<List<SlotGetDto>>();

            try
            {
                serviceResponse.Data = await _slotRepository.GetAllSlots(professionalId);
            }
            catch (Exception ex)
            {
                serviceResponse.Success = false;
                serviceResponse.Message = ex.Message;
                _logger.LogError(ex, ex.Message);
            }

            return serviceResponse;
        }
    }
}
