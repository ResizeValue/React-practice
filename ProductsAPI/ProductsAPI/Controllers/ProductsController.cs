using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProductsAPI.Application.Products;

namespace ProductsAPI.UI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ProductsService _service;
        public ProductsController(ProductsService service)
        {
            _service = service;
        }

        [HttpGet]
        public IActionResult GetProducts(int page, int pageSize)
        {
            return Ok(_service.GetProducts(page, pageSize));
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetProduct(int id)
        {
            return Ok(_service.GetProduct(id));
        }

        [HttpPut]
        [Route("update")]
        public IActionResult UpdateProduct([FromBody] ProductModel product)
        {
            _service.UpdateProduct(product);
            return Ok();
        }

        [HttpPost]
        [Route("add")]
        public IActionResult AddProduct([FromBody]ProductModel product)
        {
            _service.AddProduct(product);
            return Ok();
        }

        [HttpDelete]
        [Route("delete/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            _service.DeleteProduct(id);
            return Ok();
        }
    }
}
