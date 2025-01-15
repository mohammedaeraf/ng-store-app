import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from './products.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
 
  apiUrl: string;

  // Dependency Injection of HttpClient
  constructor(private httpClient: HttpClient) {
    this.apiUrl = 'http://localhost:8080/products';
  }

  getProducts(): Observable<any> {
    return this.httpClient.get(this.apiUrl);
  }

  getProductById(id: number): Observable<any> {
    return this.httpClient.get(this.apiUrl + '/' + id);
  }

  addProduct(product: Product): Observable<Product> {
    // invoke the API; this will also serialize the Product TypeScript object into a JSON object
    return this.httpClient.post<Product>(this.apiUrl, product);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.httpClient.put<Product>(
      this.apiUrl + '/' + product.id,
      product
    );
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete(this.apiUrl + '/' + id);
  }

  getBrands() {
    return ['Apple', 'Samsung', 'Sony', 'Dell', 'HP', 'Acer', 'Lenovo'];
  }

  getCategories() {
    return ['Mobiles', 'Laptops', 'Desktops','Tablets', 'Camera', 'Printers'];
  }
}
