using ProductsAPI.Domain.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsAPI.Application.Products
{
    public interface IProductsRepository
    {
        public ICollection<Product> GetAllProducts();
        public Product GetProductById(int id);
        public void DeleteProduct(int id);
        public void AddProduct(Product product);
        public void UpdateProduct(Product product);
    }
}
