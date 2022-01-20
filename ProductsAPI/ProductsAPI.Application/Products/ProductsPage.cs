using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsAPI.Application.Products
{
    public class ProductsPage
    {
        public IEnumerable<ProductModel> Products { get; set; }
        public int TotalProducts { get; set; }
    }
}
