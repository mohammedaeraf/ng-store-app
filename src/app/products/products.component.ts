import { Component, OnInit } from '@angular/core';
import { ProductService } from './products.service';
import { Product } from './products.model';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit {
  title: string;
  productsList: Product[];

  constructor(private productService: ProductService) {
    this.title = 'Products List';
    this.productsList = [];
  }

  ngOnInit() {
    // Observable - Subscribe helps in asynchronous processing
    this.productService.getProducts().subscribe((response: Product[]) => {
      this.productsList = response;
    });
    
  }
}
