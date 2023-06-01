using ProductCatalogProject.Middlewares;

namespace ProductCatalogProject.Extensions
{
    public static class CustomGlobalExceptionExtension
    {
        public static IApplicationBuilder UseCustomGlobalException(this IApplicationBuilder builder)
        {

            return builder.UseMiddleware<CustomGlobalException>();
        }
    }
}
