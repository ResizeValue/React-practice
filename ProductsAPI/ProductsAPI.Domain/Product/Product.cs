﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ProductsAPI.Domain.Product
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Short_Description { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public float Rate { get; set; }
        public string Color { get; set; }
        public int Count { get; set; }
        public string Country { get; set; }
        public float Weight { get; set; }
        public string Size { get; set; }
    }
}
