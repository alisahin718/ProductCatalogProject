using EmailService;
using EmailService.Contracts;
using Hangfire;
using ProductCatalogProject.Extensions;
using Repositories.Contracts;
using Repositories.EFCore;
using Services;

var builder = WebApplication.CreateBuilder(args);





builder.Services.AddEndpointsApiExplorer();
builder.Services.ConfigureSwagger();

builder.Services.ConfigureSqlContext(builder.Configuration);
builder.Services.ConfigureHangfireContext(builder.Configuration);

builder.Services.AddAutoMapper(typeof(Program));
builder.Services.ConfigureCors();

builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IBrandRepository, BrandRepository>();
builder.Services.AddScoped<IConditionRepository, ConditionRepository>();
builder.Services.AddScoped<IColorRepository, ColorRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IOfferRepository, OfferRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<ICaseHistoryRepository, CaseHistoryRepository>();
builder.Services.AddScoped<IUnitOfWork, UnitOfWork>();

builder.Services.ConfigureMail(builder.Configuration);
builder.Services.AddScoped<IEmailSender, EmailSender>();

builder.Services.AddControllers();


builder.Services.ConfigureJWT(builder.Configuration);
builder.Services.AddScoped<TokenGenerator>();

builder.Services.ConfigureIdentity();








var app = builder.Build();


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseHttpsRedirection();

app.UseHangfireDashboard();
GlobalJobFilters.Filters.Add(new AutomaticRetryAttribute { Attempts = 5 });

app.UseCustomGlobalException();



app.UseRouting();

app.UseCors("CorsPolicy");
app.UseAuthentication();
app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});




app.Run();
