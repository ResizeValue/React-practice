using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsAPI.Application.Products
{
    public class ProductsService
    {
        private readonly IProductsRepository _repository;
        public ProductsService(IProductsRepository repository)
        {
            _repository = repository;
        }

        public List<ProductModel> GetAllProducts()
        {
            var products = _repository.GetAllProducts();
            return products.Select(product => new ProductModel
            {
                Id = product.Id,
                Description = product.Description,
                Name = product.Name,
                ShortDescription = product.Short_Description,
                Color = product.Color,
                Count = product.Count,
                Country = product.Country,
                Price = product.Price,
                Rate = product.Rate,
                Size = product.Size,
                Weight = product.Weight,
            }).ToList();
        }

        public ProductsPage GetProducts(int page, int pageSize)
        {
            var products = _repository.GetAllProducts();
            var prodList = products.Skip((page-1) * pageSize).Take(pageSize).Select(product => new ProductModel
            {
                Id = product.Id,
                Description = product.Description,
                Name = product.Name,
                ShortDescription = product.Short_Description,
                Color = product.Color,
                Count = product.Count,
                Country = product.Country,
                Price = product.Price,
                Rate = product.Rate,
                Size = product.Size,
                Weight = product.Weight,
            });

            var prodPage = new ProductsPage
            {
                Products = prodList,
                TotalProducts = products.Count()
            };

            return prodPage;
        }

        public ProductModel GetProduct(int id)
        {
            var product = _repository.GetProductById(id);
            return new ProductModel
            {
                Id = product.Id,
                Description = product.Description,
                Name = product.Name,
                ShortDescription = product.Short_Description,
                Color = product.Color,
                Count = product.Count,
                Country = product.Country,
                Price = product.Price,
                Rate = product.Rate,
                Size = product.Size,
                Weight = product.Weight,
            };
        }

        public void AddProduct(ProductModel product)
        {
            _repository.AddProduct(new Domain.Product.Product
            {
                Id = product.Id,
                Description = product.Description,
                Name = product.Name,
                Short_Description = product.ShortDescription,
                Color = product.Color,
                Count = product.Count,
                Country = product.Country,
                Price = product.Price,
                Rate = product.Rate,
                Size = product.Size,
                Weight = product.Weight,
            });
        }

        public void UpdateProduct(ProductModel product)
        {
            _repository.UpdateProduct(new Domain.Product.Product
            {
                Id = product.Id,
                Description = product.Description,
                Name = product.Name,
                Short_Description = product.ShortDescription,
                Color = product.Color,
                Count = product.Count,
                Country = product.Country,
                Price = product.Price,
                Rate = product.Rate,
                Size = product.Size,
                Weight = product.Weight,
            });
        }

        public void DeleteProduct(int id)
        {
            _repository.DeleteProduct(id);
        }
    }
}
