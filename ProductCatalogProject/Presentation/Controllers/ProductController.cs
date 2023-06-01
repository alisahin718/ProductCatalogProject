using AutoMapper;
using Entities.Models;
using Entities.RequestFeatures;
using Entities.Resources;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Repositories.Contracts;

namespace Presentation.Controllers
{
    [Route("api/[controller]s")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public ProductController(IMapper mapper, IProductRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }



        [AllowAnonymous]
        [HttpGet]
        public async Task<PaginatedResult<ProductResource>> GetProducts([FromQuery] FilterResource filterResource)
        {
            var filter = _mapper.Map<FilterResource, Filter>(filterResource);
            var products = await _repository.GetAll(filter);

            var result = _mapper.Map<PaginatedResult<Product>, PaginatedResult<ProductResource>>(products);

            return result;
        }





        [HttpGet("{id}")]
        public async Task<IActionResult> GetProduct([FromRoute] int id)
        {
            var product = await _repository.Get(id);

            var productResource = _mapper.Map<Product, ProductResource>(product);
            return Ok(productResource);
        }





        [HttpPost]
        public async Task<IActionResult> CreateProduct(SaveProductResource productResource)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = _mapper.Map<SaveProductResource, Product>(productResource);
            _repository.Add(result);

            await _unitOfWork.CompleteAsync();
            return Created("~api/products", result);
        }





        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, SaveProductResource productResource)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var product = await _repository.Get(id);
            _mapper.Map<SaveProductResource, Product>(productResource, product);

            await _unitOfWork.CompleteAsync();
            return NoContent();
        }


        [HttpPut("Sell/{id}")]
        public async Task<IActionResult> SellProduct(int id, [FromBody] string userId)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var product = await _repository.Get(id);
            SaveCaseHistoryResource purchaseInfo = new();
            purchaseInfo.ProductId = product.Id;
            purchaseInfo.BuyerId = userId;
            purchaseInfo.SellerId = product.UserId;
            purchaseInfo.CasedDate = DateTime.Now;
            purchaseInfo.SoldPrice = product.BuyItNowPrice;

            var result = _mapper.Map<SaveCaseHistoryResource, CaseHistory>(purchaseInfo);

            await _repository.CreateSellInformation(result);
            product.IsSold = true;
            SaveProductResource productResource = new SaveProductResource();
            productResource.BrandId = product.BrandId;
            productResource.BuyItNowPrice = product.BuyItNowPrice;
            productResource.CategoryId = product.CategoryId;
            productResource.ColorId = product.ColorId;
            productResource.ConditionId = product.ConditionId;
            productResource.Description = product.Description;
            productResource.IsOfferable = product.IsOfferable;
            productResource.IsSold = true;
            productResource.Name = product.Name;
            productResource.PictureUrl = product.PictureUrl;
            productResource.UserId = product.UserId;
            await UpdateProduct(id, productResource);
      
           


            await _unitOfWork.CompleteAsync();
            return NoContent();
        }


        [HttpPost("BuyWithOffer")]
        public async Task<IActionResult> BuyWithOffer([FromBody] int id)
        {
            if (!ModelState.IsValid)
                return BadRequest();


            //will do with stored procedure
            await _repository.BuyWithOffer(id);
            await _unitOfWork.CompleteAsync();
            return NoContent();
        }


        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {

            var product = await _repository.Get(id);
            _repository.Remove(product);

            await _unitOfWork.CompleteAsync();
            return NoContent();
        }
    }
}
