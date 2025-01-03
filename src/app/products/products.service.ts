import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class ProductService {
    apiUrl: string;
    httpClient: HttpClient;

    constructor(client: HttpClient) {
        this.httpClient = client;
        this.apiUrl = 'https://fakestoreapi.com/products';
    }

    getProducts(): any {
        return this.httpClient.get(this.apiUrl);
    }
}