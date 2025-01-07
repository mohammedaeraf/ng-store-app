import { Component } from '@angular/core';
import { Product } from '../products/products.model';
import { ProductService } from '../products/products.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
product: Product | undefined;
productId: number;

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.productService.getProductById(this.productId).subscribe((response: Product) => {
      this.product = response;
    });
  }
}
