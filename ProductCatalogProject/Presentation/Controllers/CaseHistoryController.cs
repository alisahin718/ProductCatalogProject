using AutoMapper;
using Entities.Models;
using Entities.Resources;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Contracts;

namespace Presentation.Controllers
{
    [Route("api/CaseHistories")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class CaseHistoryController : ControllerBase
    {
        private readonly ICaseHistoryRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public CaseHistoryController(IMapper mapper, ICaseHistoryRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }




        [HttpPost("purchased")]
        public async Task<IEnumerable<CaseHistoryResource>> GetPurchaseHistories([FromBody] string userId)
        {
            var caseHistories = await _repository.GetAllPurchased(userId);
            var result = _mapper.Map<List<CaseHistory>, List<CaseHistoryResource>>(caseHistories.ToList());
            return result;
        }


        [HttpPost("sold")]
        public async Task<IEnumerable<CaseHistoryResource>> GetSoldHistories([FromBody] string userId)
        {
            var caseHistories = await _repository.GetAllSold(userId);
            var result = _mapper.Map<List<CaseHistory>, List<CaseHistoryResource>>(caseHistories.ToList());
            return result;
        }




        [HttpGet("{id}")]
        public async Task<IActionResult> GetPurchaseHistory(int id)
        {
            var caseHistories = await _repository.Get(id);
            var caseHistoryResource = _mapper.Map<CaseHistory, CaseHistoryResource>(caseHistories);
            return Ok(caseHistoryResource);
        }





        [HttpPost]
        public async Task<IActionResult> CreatePurchaseHistory(SaveCaseHistoryResource caseHistoryResource)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = _mapper.Map<SaveCaseHistoryResource, CaseHistory>(caseHistoryResource);
            _repository.Add(result);

            await _unitOfWork.CompleteAsync();
            return Created("~api/purchaseHistories", result);
        }





        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePurchaseHistory(int id, SaveCaseHistoryResource caseHistoryResource)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var purchaseHistory = await _repository.Get(id);
            _mapper.Map<SaveCaseHistoryResource, CaseHistory>(caseHistoryResource, purchaseHistory);

            await _unitOfWork.CompleteAsync();
            return NoContent();
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePurchaseHistory(int id)
        {

            var purchaseHistory = await _repository.Get(id);
            _repository.Remove(purchaseHistory);

            await _unitOfWork.CompleteAsync();
            return NoContent();
        }
    }
}
