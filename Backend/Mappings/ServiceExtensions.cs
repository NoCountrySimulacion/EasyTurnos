using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace Mappings
{
    public static class ServiceExtensions
    {
        public static IServiceCollection AddDomainProfiles(this IServiceCollection services)
        {
            services.AddAutoMapper(Assembly.GetExecutingAssembly());

            return services;
        }
    }
}
