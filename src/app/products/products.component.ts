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
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.productsList = products;
    });
  }
}
