import { Component, OnInit } from '@angular/core';
import { ProductService } from './../_services/product/product.service';
import { CategoryService } from './../_services/category/category.service';
import { Product } from './../_models/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from './../_models/Category';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Guid } from 'guid-typescript';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-estoque',
  templateUrl: './estoque.component.html',
  styleUrls: ['./estoque.component.css']
})
export class EstoqueComponent implements OnInit {
  urlImg = 'http://localhost:5000/images/';
  imageName: string;
  products: Product[];
  product: Product;
  categories: Category[];
  category: Category;
  file: File;
  // Put, Post ou Delete
  actionMode = '';
  // Category ou Product
  entTarget = '';


  // tslint:disable-next-line: variable-name
  _productFilter: string;
  categoryFilter: string;
  registerForm: FormGroup;
  registerCat: FormGroup;
  deleteForm: FormGroup;

  //Paginação
  _paginas = 4;
  public paginaAtual = 1; // Dizemos que queremos que o componente quando carregar, inicialize na página 1.  
  get paginas() {
    return this._paginas;
  }
  set paginas(value: number) {
    this._paginas = value;
  }

  get productFilter(){
   return this._productFilter;
  }
  set productFilter(value: string){
    this._productFilter = value;
  }

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private toastr: ToastrService
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
      image: ['']
    });

    this.registerCat = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(5)]],
      id: [Guid.create().toString()]
    });

    this.deleteForm = this.fb.group({
      name: [''],
      id: ['']
    });
  }

  closeModal(modal: ModalDirective, form?: FormGroup){
    if (form) { form.reset({id: Guid.create().toString()}); }
    if (this.entTarget === 'product'){
      this.getProducts();
      this.getCategories();
      this.file = undefined;
    }else if (this.entTarget === 'category'){
      this.getCategories();
      this.getProducts();
    }
    document.getElementById('test').style.filter = 'blur(0)';
    modal.hide();
  }

  // Produtos

  createProduct(modal: ModalDirective){
    this.actionMode = 'post';
    this.entTarget = 'product';
    this.createBlur();
    modal.show();
  }

  saveChangesP(template){
    if (this.registerForm.valid){
      if (this.actionMode === 'post'){
          this.product = Object.assign({}, this.registerForm.value);
          const imgId = Guid.create().toString();

          if (!this.file){
            this.toastr.error('Insira uma imagem para o produto!', 'Erro', { timeOut: 2500 });
          }else{
            this.productService.postUpload(this.file, imgId).subscribe();

            this.product.image = imgId + '_' + this.imageName;

            this.productService.postProduct(this.product).subscribe((product: Product) => {
              console.log(product);
              this.closeModal(template, this.registerForm);
              this.showSuccess();
            }, error => {
              console.log(error.message);
            });
          }
      }else if (this.actionMode === 'put'){
        this.product = Object.assign({}, this.registerForm.value);

        const imgId = Guid.create().toString();

        if (this.file && this.file.size > 0){
          this.productService.postUpload(this.file, imgId).subscribe();
          this.product.image = imgId + '_' + this.imageName;
          this.productService.putProduct(this.product).subscribe(() => {
            this.closeModal(template, this.registerForm);
          });
        }else{
          this.productService.putProduct(this.product).subscribe(() => { this.closeModal(template, this.registerForm); });
        }
        this.showSuccess();
      }
    }
  }

  onFileChange(event){
    if (event.target.files && event.target.files.length){
      this.file = event.target.files[0];
      this.imageName = this.file.name;
      console.log(this.imageName);
      console.log(this.file);
    }
  }

  deleteProduct(product: Product, modal?: ModalDirective){
    this.entTarget = 'product';
    this.actionMode = 'delete';
    this.product = product;
    this.createBlur();
    modal.show();
    this.deleteForm.patchValue(this.product);
  }

  deleteConfirm(template: ModalDirective){
    if (this.entTarget === 'product'){
      const pr = Object.assign({}, this.deleteForm.value);
      this.productService.deleteProduct(pr.id).subscribe(() => {
        this.showSuccess();
        this.closeModal(template);
      });
    }
    else if (this.entTarget === 'category'){
      const ct = Object.assign({}, this.deleteForm.value);
      this.categoryService.deleteCategory(ct.id).subscribe(() => {
        this.showSuccess();
        this.closeModal(template);
      });
    }
  }

  putProduct(modal: ModalDirective, product: Product){
    this.actionMode = 'put';
    this.entTarget = 'product';
    this.createBlur();
    modal.show();
    console.log(this.file);
    this.registerForm.setValue({
      name: product.name,
      id: product.id,
      image: '',
      model: product.model,
      amount: product.amount,
      brand: product.brand,
      price: product.price,
      description: product.description,
      categoryId: product.categoryId
    });
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

  // Fim

  // Categorias

  createCategory(modal: ModalDirective){
    this.actionMode = 'post';
    this.entTarget = 'category';
    this.createBlur();
    modal.show();
  }

  saveChangesC(template){
    if (this.registerCat.valid){
        this.category = Object.assign({}, this.registerCat.value);

        this.categoryService.postCategory(this.category).subscribe((category: Category) => {
          console.log(category);
          this.showSuccess();
          this.closeModal(template, this.registerCat);
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

  deleteCategory(category: Category, template: ModalDirective){
    this.entTarget = 'category';
    this.actionMode = 'delete';
    this.category = category;
    this.createBlur();
    template.show();
    this.deleteForm.patchValue(this.category);
    this.showWarning();
  }
 // Fim

 // Notificações
 showSuccess(){
   if (this.actionMode === 'post'){
    this.toastr.success('Criação concluída', 'Sucesso', {timeOut: 1500, progressBar: true});
   }
   else if (this.actionMode === 'put'){
    this.toastr.success('Atualização concluída', 'Sucesso', {timeOut: 1500, progressBar: true});
   }else if (this.actionMode === 'delete'){
    this.toastr.success('Deletado', 'Sucesso', {timeOut: 1500, progressBar: true});
   }
}

showWarning(){
  this.toastr.warning('Isso irá apagar todos os produtos nesta categoria', 'Cuidado', { timeOut: 2500, progressBar: true });
}

// Geral
createBlur(){
  document.getElementById('test').style.filter = 'blur(3px)';
}

}
