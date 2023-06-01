using AutoMapper;
using Entities.Models;
using Entities.RequestFeatures;
using Entities.Resources;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Contracts;
using System.Linq;

namespace Presentation.Controllers
{
    [Route("api/[controller]s")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [ApiController]
    public class OfferController : ControllerBase
    {
        private readonly IOfferRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public OfferController(IMapper mapper, IOfferRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }




        [HttpGet]
        public async Task<PaginatedResult<OfferResource>> GetProducts([FromQuery] FilterResource filterResource)
        {
            var filter = _mapper.Map<FilterResource, Filter>(filterResource);
            var offers = await _repository.GetAll(filter);

            var result = _mapper.Map<PaginatedResult<Offer>, PaginatedResult<OfferResource>>(offers);

            return result;
        }




        [HttpGet("{id}")]
        public async Task<IActionResult> GetOffer(int id)
        {
            var offer = await _repository.Get(id);
            var offerResource = _mapper.Map<Offer, OfferResource>(offer);
            return Ok(offerResource);
        }





        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> CreateOffer(SaveOfferResource offerResource)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = _mapper.Map<SaveOfferResource, Offer>(offerResource);

            var isOfferable = await _repository.IsOfferable(result);
            if (isOfferable)
                _repository.Add(result);
            else
                return BadRequest();


            await _unitOfWork.CompleteAsync();
            return Created("~api/offers", result);
        }





        [HttpPost("/api/myOffers")]
        public async Task<IActionResult> GetMyOffers([FromBody] string userId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var offers = await _repository.GetMyOffers(userId);
            var offerResource = _mapper.Map<List<Offer>, List<OfferResource>>(offers.ToList())
                .Where(o => !(o.OfferStatus == Entities.Resources.OfferStatus.GERI_CEK || o.OfferStatus == Entities.Resources.OfferStatus.SATILDI));
            return Ok(offerResource);
        }



        [HttpPost("/api/myProducts")]
        public async Task<IActionResult> GetMyProducts([FromBody] string userId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var offers = await _repository.GetMyProducts(userId);
            var offerResource = _mapper.Map<List<Offer>, List<OfferResource>>(offers.ToList())
                .Where(o => o.OfferStatus != Entities.Resources.OfferStatus.REDDEDİLDİ || o.OfferStatus != Entities.Resources.OfferStatus.SATILDI);
            return Ok(offerResource);
        }





        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOffer(int id, [FromBody] UpdateOfferResource newOffer)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var offer = await _repository.Get(id);
            _mapper.Map<UpdateOfferResource, Offer>(newOffer, offer);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }





        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOffer(int id)
        {

            var offer = await _repository.Get(id);
            _repository.Remove(offer);

            await _unitOfWork.CompleteAsync();
            return NoContent();
        }
    }
}
