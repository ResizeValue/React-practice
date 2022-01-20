using ProductsAPI.Application.Products;
using ProductsAPI.Domain.Product;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsAPI.Persistance
{
    public class PorductsContext : IProductsRepository
    {
        private static List<Product> products = new List<Product>
        {
            new Product()
            {
                Id = 1,
                Name = "Product 1",
                Description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta perferendis, enim cumque nostrum itaque quas officia ullam cum accusantium. Aut.",
                Short_Description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, distinctio?",
                Color = "Black",
                Count = 2,
                Country = "China",
                Size = "22x22",
                Rate = 5,
                Price = 22012,
                Weight = 25.5f
            },
            new Product()
            {
                Id = 2,
                Name = "Product 2",
                Description = "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dicta perferendis, enim cumque nostrum itaque quas officia ullam cum accusantium. Aut.",
                Short_Description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis, distinctio?",
                Color = "Black",
                Count = 2,
                Country = "Germany",
                Size = "22x22",
                Rate = 7,
                Price = 5000,
                Weight = 10.5f
            },
            new Product()
            {
                Id = 3,
                Name = "Product 3",
                Description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque repellendus mollitia maiores minima quam, dolores aliquam facere quibusdam assumenda pariatur. cum accusantium. Aut.",
                Short_Description = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo neque blanditiis voluptatem iste, omnis sed aliquam quia ducimus aspernatur corrupti, repudiandae.",
                Color = "Blue",
                Count = 5,
                Country = "Poland",
                Size = "20x10",
                Rate = 8,
                Price = 10000,
                Weight = 20.5f
            }
        };

        public void AddProduct(Product product)
        {
            product.Id = products.Count + 1;
            products.Add(product);
        }

        public void UpdateProduct(Product product)
        {
            var index = products.IndexOf(products.FirstOrDefault(p => p.Id.Equals(product.Id)));
            products[index] = product;
        }

        public void DeleteProduct(int id)
        {
            products.Remove(products.FirstOrDefault(p => p.Id.Equals(id)));
        }

        public ICollection<Product> GetAllProducts()
        {
            return products;
        }

        public Product GetProductById(int id)
        {
            return products.FirstOrDefault(p => p.Id.Equals(id));
        }
    }
}
