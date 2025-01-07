import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    apiUrl: string;

    // Dependency Injection of HttpClient
    constructor(private httpClient: HttpClient) {
        this.apiUrl = 'https://fakestoreapi.com/products';
    }

    getProducts(): Observable<any> {
        return this.httpClient.get(this.apiUrl);
    }

    getProductById(id:number): Observable<any> {
        return this.httpClient.get(this.apiUrl + '/' + id);
    }
    
}