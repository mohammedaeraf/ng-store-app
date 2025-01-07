import { Component } from '@angular/core';
import { ProductService } from '../products/products.service';
import { Product } from '../products/products.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  productsList: Product[];

  constructor(private router: Router, private productService: ProductService) {
    this.productsList = [];
  }

  ngOnInit() {
    this.productService.getProducts().subscribe((response: Product[]) => {
      this.productsList = response;
    });
  }

}
