import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './../_services/product/product.service';
import { CategoryService } from './../_services/category/category.service';
import { Product } from './../_models/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from './../_models/Category';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {

  products: Product[];
  categories: Category[];
  // tslint:disable-next-line: variable-name
  _listFilter: string;
  registerForm: FormGroup;
  registerCat: FormGroup;

  get listFilter(){
   return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
  }

  openModal(template: any){
    template.show();
  }

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.validation();
  }

  validation(){
    this.registerForm = this.fb.group({
      name: ['', [Validators.minLength(15), Validators.maxLength(50), Validators.required]],
      brand: ['', [Validators.minLength(2), Validators.required]],
      model: ['', [Validators.minLength(5), Validators.required]],
      desc: ['', [Validators.minLength(15), Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]]
    });

    this.registerCat = this.fb.group({})
  }

saveChanges(){

  }

  getProducts(){
    return this.productService.getProducts().subscribe((products: Product[]) => {
      this.products = products;
      console.log(products);
    }, error => {
      console.log(error.message);
    });
  }

  getCategories(){
    return this.categoryService.getCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
      console.log(categories);
    }, error => {
      console.log(error.message);
    });
  }

}
