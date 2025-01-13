import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ProductService } from '../products/products.service';
import { Router } from '@angular/router';
import { Product } from '../products/products.model';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css',
})
export class AddProductComponent {
  title = 'Add Product';
  addProductForm: FormGroup;
  brands: string[] = [];
  categories: string[] = [];
  isSubmitted = false;
  formValid = false;

  // dependency injection
  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.addProductForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required, Validators.min(1)]],
      brand: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
    this.loadBrands();
    this.loadCategories();
  }

  get f() {
    return this.addProductForm.controls;
  }

  loadBrands(): void {
    this.brands = this.productService.getBrands();
  }

  loadCategories() {
    this.categories = this.productService.getCategories();  
  }

  onSubmit() {
    if (this.addProductForm.valid) {
      this.isSubmitted = true;
      this.formValid = true;
      console.log('postForm value ==>' + JSON.stringify(this.addProductForm.value));

      this.productService
        .addProduct(this.addProductForm.value) // this.postForm.value is an instance of Post and hence is a valid argument to addPost
        .subscribe((response: Product) => {
          console.log(response);
          this.addProductForm.reset();
          this.router.navigate(['/products']);
        });
    }
  }
}
