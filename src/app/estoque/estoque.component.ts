import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './../_services/product/product.service';
import { CategoryService } from './../_services/category/category.service';
import { Product } from './../_models/Product';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  products: Product[];

  constructor(private http: HttpClient, private productService: ProductService, categoryService: CategoryService) { }

  ngOnInit() {
    this.getProducts();
  }

  getProducts(){
    return this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(products);
    }, error => {
      console.log(error.message);
    });
  }

}
