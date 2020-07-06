import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Product } from 'src/app/_models/Product';
import { ProductService } from 'src/app/_services/product/product.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-products-cards',
  templateUrl: './products-cards.component.html'
})
export class ProductsCardsComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private productService: ProductService,
    private modalService: BsModalService
    ) { }

  public products: Product[];

  ngOnInit() {
    this.productService.getProducts().subscribe(
      products => {
        this.products = products;
        console.log(products);
      },
      error => console.log(error)
    );
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
