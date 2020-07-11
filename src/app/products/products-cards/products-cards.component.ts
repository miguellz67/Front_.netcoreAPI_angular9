import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { Category } from 'src/app/_models/Category';

import { ProductService } from 'src/app/_services/product/product.service';
import { CategoryService } from 'src/app/_services/category/category.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html',
  styleUrls: ['./products-cards.component.css']
})
export class ProductsCardsComponent implements OnInit {
  urlImg = 'http://localhost:5000/images/';
  imagemName: string;
  products: Product[];
  product: Product;
  categories: Category[];
  category: Category;
  public paginaAtual = 1; // Dizemos que queremos que o componente quando carregar, inicialize na página 1.

  modalRef: BsModalRef;
  _listFilter: string;
  _paginas = 4;

  get listFilter() {
    return this._listFilter;
  }
  set listFilter(value: string) {
    this._listFilter = value;
  }

  get paginas() {
    return this._paginas;
  }
  set paginas(value: number) {
    this._paginas = value;
  }

  constructor(private productService: ProductService,
    private modalService: BsModalService,
    private categoryService: CategoryService) { }


  ngOnInit() {
    this.getProducts();
    this.getCategories();
  }
  cc(category){

  }
  
  openModalWithClass(template: TemplateRef<any>) {  
    this.modalRef = this.modalService.show(  
      template,  
      Object.assign({}, { class: 'gray modal-lg' })  
    );  
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