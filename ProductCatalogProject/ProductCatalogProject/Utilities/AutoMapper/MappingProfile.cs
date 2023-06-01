using AutoMapper;
using Entities.DataTransferObject;
using Entities.Models;
using Entities.RequestFeatures;
using Entities.Resources;

namespace ProductCatalogProject.Utilities.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserResource>()
            .ForMember(x => x.Password, opt => opt.MapFrom(x => x.PasswordHash));
            CreateMap<SaveUserResource, User>();

            CreateMap<Brand, BrandResource>();
            CreateMap<SaveBrandResource, Brand>();
            CreateMap<PaginatedResult<Brand>, PaginatedResult<BrandResource>>();

            CreateMap<Category, CategoryResource>();
            CreateMap<SaveCategoryResource, Category>();
            CreateMap<PaginatedResult<Category>, PaginatedResult<CategoryResource>>();

            CreateMap<Color, ColorResource>();
            CreateMap<SaveColorResource, Color>();
            CreateMap<PaginatedResult<Color>, PaginatedResult<ColorResource>>();

            CreateMap<Condition, ConditionResource>();
            CreateMap<SaveConditionResource, Condition>();
            CreateMap<PaginatedResult<Condition>, PaginatedResult<ConditionResource>>();

            CreateMap<FilterResource, Filter>();

            CreateMap<Offer, OfferResource>()
                .ForMember(x => x.UserName, opt => opt.MapFrom(x => x.User.UserName))
                .ForMember(x => x.ProductName, opt => opt.MapFrom(x => x.Product.Name))
                .ForMember(x => x.CurrentPrice, opt => opt.MapFrom(x => x.Product.BuyItNowPrice))
                .ForMember(x => x.OwnerId, opt => opt.MapFrom(x => x.Product.UserId));
            CreateMap<SaveOfferResource, Offer>();
            CreateMap<UpdateOfferResource, Offer>();
            CreateMap<PaginatedResult<Offer>, PaginatedResult<OfferResource>>();

            CreateMap<Product, ProductResource>()
              .ForMember(x => x.ColorName, opt => opt.MapFrom(x => x.Color.Name))
              .ForMember(x => x.ConditionStatus, opt => opt.MapFrom(x => x.Condition.Status))
              .ForMember(x => x.Owner, opt => opt.MapFrom(x => x.User.UserName))
              .ForMember(x => x.BrandName, opt => opt.MapFrom(x => x.Brand.Name))
              .ForMember(x => x.CategoryName, opt => opt.MapFrom(x => x.Category.Name));
            CreateMap<SaveProductResource, Product>();
            CreateMap<PaginatedResult<Product>, PaginatedResult<ProductResource>>();

            CreateMap<CaseHistory,CaseHistoryResource>()
                .ForMember(x => x.BuyerName, opt => opt.MapFrom(x => x.Buyer.UserName))
                .ForMember(x => x.SellerName, opt => opt.MapFrom(x => x.Seller.UserName))
                .ForMember(x => x.ProductName, opt => opt.MapFrom(x => x.Product.Name));
            CreateMap<SaveCaseHistoryResource, CaseHistory>();
            CreateMap<PaginatedResult<CaseHistory>, PaginatedResult<CaseHistoryResource>>();

            
        }
    }
}
