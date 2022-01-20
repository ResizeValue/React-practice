using Microsoft.Extensions.DependencyInjection;
using ProductsAPI.Application.Products;
using ProductsAPI.Persistance;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsAPI.InfrastructureIoC
{
    public class DependencyContainer
    {
        public static void RegisterServices(IServiceCollection services)
        {
            services.AddScoped<IProductsRepository, PorductsContext>();

            services.AddScoped<ProductsService>();

        }
    }
}
