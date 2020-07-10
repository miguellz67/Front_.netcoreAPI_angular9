import { Component, OnInit } from '@angular/core';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { Product } from 'src/app/_models/Product';
import { Category } from 'src/app/_models/Category';

import { ProductService } from 'src/app/_services/product/product.service';
import { CategoryService } from 'src/app/_services/category/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [
    { provide: CarouselConfig, useValue: { interval: 2500, noPause: true, showIndicators: false } }
  ]
})
export class HomeComponent implements OnInit {
  urlImg = 'http://localhost:5000/images/';
  imagemName: string;
  products: Product[];
  product: Product;
  categories: Category[];
  category: Category;

  constructor(private productService: ProductService,
    private categoryService: CategoryService) { }

    ngOnInit() {
      this.getProducts();
      this.getCategories();
    }

  getCategories() {
    return this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(categories);
    }, error => {
      console.log(error.message);
    });
  }

  getProducts() {
    return this.productService.getProducts().subscribe((products: Product[]) => {
      products.forEach((pr, ind) => {
        this.categoryService.getCategory(pr.categoryId).subscribe((cat) => {
          products[ind].categoryName = cat.name;
        });
      });
      this.products = products;
      console.log(products);
    }, error => {
      console.log(error.message);
    });
  }

}
