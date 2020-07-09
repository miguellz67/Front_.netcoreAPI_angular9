import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './../../_models/Product';
import { Guid } from 'guid-typescript';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
baseURL = 'http://localhost:5000/api/products';

constructor( private http: HttpClient ) { }

  getProducts(): Observable<Product[]>{
    return this.http.get<Product[]>(this.baseURL);
  }

  getProductById(id: Guid): Observable<Product>{
    return this.http.get<Product>(`${this.baseURL}/${id}`);
  }

  getProductByCategory(id: Guid): Observable<Product[]>{
    return this.http.get<Product[]>(`${this.http}/${id}`);
  }

  postProduct(product: Product){
    return this.http.post(this.baseURL, product);
  }

  postUpload(file: File, id: string){
      const fileToUp = file as File;
      const formData = new FormData();
      formData.append('file', fileToUp, id + '_' + fileToUp.name);

      return this.http.post(`${this.baseURL}/imageUp`, formData);
  }

  deleteProduct(id: Guid){
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  putProduct(product: Product){
    return this.http.put(`${this.baseURL}/${product.id}`, product);
  }
}
