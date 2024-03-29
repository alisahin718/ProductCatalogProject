﻿using AutoMapper;
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
    public class BrandController :ControllerBase
    {
        private readonly IBrandRepository _repository;
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        public BrandController(IMapper mapper, IBrandRepository repository, IUnitOfWork unitOfWork)
        {
            _repository = repository;
            _mapper = mapper;
            _unitOfWork = unitOfWork;
        }




        [HttpGet]
        public async Task<PaginatedResult<BrandResource>> GetProducts([FromQuery] FilterResource filterResource)
        {
            var filter = _mapper.Map<FilterResource, Filter>(filterResource);
            var brands = await _repository.GetAll(filter);

            var result = _mapper.Map<PaginatedResult<Brand>, PaginatedResult<BrandResource>>(brands);

            return result;
        }






        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrand(int id)
        {
            var brand = await _repository.Get(id);
            var brandResource = _mapper.Map<Brand, BrandResource>(brand);
            return Ok(brandResource);
        }





        [HttpPost]
        public async Task<IActionResult> CreateBrand(SaveBrandResource brandResource)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var result = _mapper.Map<SaveBrandResource, Brand>(brandResource);
            _repository.Add(result);

            await _unitOfWork.CompleteAsync();
            return Created("~api/brands", result);
        }





        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBrand(int id, SaveBrandResource brandResource)
        {
            if (!ModelState.IsValid)
                return BadRequest();

            var brand = await _repository.Get(id);
            _mapper.Map<SaveBrandResource, Brand>(brandResource, brand);

            await _unitOfWork.CompleteAsync();
            return NoContent();
        }




        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {

            var brand = await _repository.Get(id);
            _repository.Remove(brand);

            await _unitOfWork.CompleteAsync();
            return NoContent();
        }
    }
}
