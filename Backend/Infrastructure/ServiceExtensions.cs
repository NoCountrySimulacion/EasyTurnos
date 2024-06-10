using Domain.Entities;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.EntityFrameworkCore;
using Infrastructure.Repositories.Interfaces;
using Infrastructure.Repositories;
using DTOs.jwt;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Http;
using System.Text.Json;

namespace Infrastructure
{
    public static class ServiceExtensions
    {
        /// <summary>
        /// Extension method to register services
        /// </summary>
        /// <param name="services"></param>
        /// <param name="configuration"></param>
        /// <returns></returns>
        public static IServiceCollection AddPersistenceServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Application Db
            services.AddDbContext<ApplicationDbContext>(options =>
                   options.UseSqlServer(configuration.GetConnectionString("DefaultConnection")));

            //Repositories
            services.AddScoped<IProfessionalRepository, ProfessionalRepository>();
            services.AddScoped<IAppointmentRepository, AppointmentRepository>();
            services.AddScoped<ISlotRepository, SlotRepository>();
            services.AddScoped<IClientRepository, ClientRepository>();
            services.AddScoped<IProfessionalClientRepository, ProfessionalClientRepository>();

            // Identity
            services.AddIdentity<ApplicationUser, ApplicationRole>(opt =>
            {
                opt.Password.RequiredLength = 5;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequireLowercase = true;
                opt.Password.RequireDigit = false;
                opt.Password.RequiredUniqueChars = 3;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>()
            .AddDefaultTokenProviders();

         // JWT
         // This method configures the JWT settings. This line tells the DI container to create an instance of JwtSettings and populate it with the values from "JwtSettings"
         services.Configure<JwtSettings>(configuration.GetSection("JwtSettings"));

         services.AddAuthentication(options =>
         {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
         })
         .AddJwtBearer(o =>
         {
            o.RequireHttpsMetadata = false;
            o.SaveToken = false;
            o.TokenValidationParameters = new TokenValidationParameters
            {
               ValidateIssuerSigningKey = true,
               ValidateIssuer = true,
               ValidateAudience = false,
               ValidateLifetime = true,
               ClockSkew = TimeSpan.Zero,
               ValidIssuer = configuration["JwtSettings:Issuer"],
               ValidAudience = configuration["JwtSettings:Audience"],
               IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JwtSettings:Key"]))
            };

            o.Events = new JwtBearerEvents()
            {
               OnAuthenticationFailed = c =>
               {
                  c.NoResult();
                  c.Response.StatusCode = 500;
                  c.Response.ContentType = "text/plain";
                  return c.Response.WriteAsync(c.Exception.ToString());
               },
               OnChallenge = context =>
               {
                  context.HandleResponse();
                  context.Response.StatusCode = 401;
                  context.Response.ContentType = "application/json";
                  var result = JsonSerializer.Serialize("401 Not authorized");
                  return context.Response.WriteAsync(result);
               },
               OnForbidden = context =>
               {
                  context.Response.StatusCode = 403;
                  context.Response.ContentType = "application/json";
                  var result = JsonSerializer.Serialize("403 Not authorized");
                  return context.Response.WriteAsync(result);
               }
            };
         });

         return services;
        }
    }
}
