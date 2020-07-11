import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { Category } from 'src/app/_models/Category';

import { ProductService } from 'src/app/_services/product/product.service';
import { CategoryService } from 'src/app/_services/category/category.service';
import { CarouselComponent } from 'ngx-carousel-lib';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

// tslint:disable-next-line: align


export class HomeComponent implements OnInit {
  @ViewChild('topCarousel') topCarousel: CarouselComponent;
  urlImg = 'http://localhost:5000/images/';
  imagemName: string;
  products: Product[];
  product: Product;
  categories: Category[];
  category: Category;
  public degree = 20;
  public moreSlides = 3;

  toggle() {
    this.topCarousel.toggleMode();
  }

  tes(){
    this.topCarousel.slideTo(0);
  }
  constructor(
    private productService: ProductService,
    private categoryService: CategoryService
    ) { }

    ngOnInit() {
      this.getProducts();
      this.getCategories();
    }

 // Categorias
  getCategories() {
    return this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(categories);
    }, error => {
      console.log(error.message);
    });
  }
  // Produtos
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
  // Filtros
  productByCategory(catg: Category){
    const products = this.products.filter(prt => prt.categoryName === catg.name);
    return products;
   }

}
