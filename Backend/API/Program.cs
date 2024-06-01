using Core;
using Mappings;
using Infrastructure;
using API;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
   options.SerializerSettings.Converters.Add(new Newtonsoft.Json.Converters.StringEnumConverter());
});
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen( c =>
{
   // JWT
   var securitySchema = new OpenApiSecurityScheme
   {
      Description = "JWT Auth Bearer Scheme",
      Name = "Authorization",
      In = ParameterLocation.Header,
      Type = SecuritySchemeType.Http,
      Scheme = "Bearer",
      Reference = new OpenApiReference
      {
         Type = ReferenceType.SecurityScheme,
         Id = "Bearer"
      }
   };

   c.AddSecurityDefinition("Bearer", securitySchema);

   var securityRequirement = new OpenApiSecurityRequirement
   {
      {
        securitySchema, new[] {"Bearer"}
      }
   };

   c.AddSecurityRequirement(securityRequirement);
});
builder.Services.AddCoreServiceCollection();
builder.Services.AddDomainProfiles();
builder.Services.AddPersistenceServices(builder.Configuration);
builder.Services.AddAPIServiceCollection();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
