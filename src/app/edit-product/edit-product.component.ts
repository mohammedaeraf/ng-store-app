import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../products/products.service';
import { Product } from '../products/products.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  editProductForm: FormGroup;
  productId: number;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.editProductForm = this.fb.group({
      title: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]],
      brand: ['', Validators.required],
      category: ['', Validators.required]
    });
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.productService.getProductById(this.productId).subscribe((product: Product) => {
      console.log(product);
      this.editProductForm.patchValue(product); // show the data of the product in the form
    });
  }

  onSubmit(): void {
    if (this.editProductForm.valid) {
      console.log('Going to update product now...');
      console.log(this.editProductForm.value);

      const updatedProduct: Product = {
        id: this.productId,
        ...this.editProductForm.value
      };
      
      console.log(updatedProduct);
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        this.router.navigate(['/view-products']);
      });
    }
  }
}