import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from './../_services/product/product.service';
import { CategoryService } from './../_services/category/category.service';
import { Product } from './../_models/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from './../_models/Category';
import { BsModalService, ModalDirective } from 'ngx-bootstrap/modal';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {
  urlImg = 'http://localhost:5000/images/';
  imagemName: string;
  products: Product[];
  product: Product;
  categories: Category[];
  category: Category;
  file: File;
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

  openModal(template: any, form?: FormGroup){
    template.show();
    form.setValue({id: Guid.create().toString()});
  }

  constructor(
    private http: HttpClient,
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private modalService: BsModalService
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
      description: ['', [Validators.minLength(15), Validators.required]],
      price: ['', [Validators.required, Validators.min(1)]],
      categoryId: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      id: [Guid.create().toString()],
      image: ['', Validators.required]
    });

    this.registerCat = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      id: [Guid.create().toString()]
    });
  }

  closeModal(modal: ModalDirective, form: FormGroup){
    form.reset({id: Guid.create().toString()});
    modal.hide();
  }

  saveChangesP(template){
    if (this.registerForm.valid){
      this.product = Object.assign({}, this.registerForm.value);
      let imgId = Guid.create().toString();

      this.productService.postUpload(this.file, imgId).subscribe();
      this.product.image = imgId + '_' + this.imagemName;

      this.productService.postProduct(this.product).subscribe((product: Product) => {
        console.log(product);
        template.hide();
        this.getProducts();
        this.getCategories();

      }, error => {
        console.log(error.message);
      });
    }
  }

  onFileChange(event){
    const reader = new FileReader();

    if (event.target.files && event.target.files.length){
      this.file = event.target.files;
      this.imagemName = this.file[0].name;
      console.log(this.file);
    }
  }

  getProducts(){
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

  // Categorias

  saveChangesC(template){
    if (this.registerCat.valid){
      this.category = Object.assign({}, this.registerCat.value);

      this.categoryService.postCategory(this.category).subscribe((category: Category) => {
        console.log(category);
        template.hide();
        this.getCategories();
        this.getProducts();
      });
    }
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
