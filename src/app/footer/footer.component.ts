import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { Category } from 'src/app/_models/Category';

import { ProductService } from 'src/app/_services/product/product.service';
import { CategoryService } from 'src/app/_services/category/category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
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
