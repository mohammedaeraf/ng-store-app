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
  editProductForm: FormGroup; // Form group for editing a product
  productId: number; // ID of the product to be edited

  // Injecting FormBuilder, ProductService, ActivatedRoute, and Router
  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Initializing the form group with form controls and validators
    this.editProductForm = this.fb.group({
      title: ['', Validators.required], // Title is required
      price: ['', [Validators.required, Validators.min(0)]], // Price is required and must be a non-negative number
      brand: ['', Validators.required], // Brand is required
      category: ['', Validators.required] // Category is required
    });

    // Getting the product ID from the route parameters
    this.productId = this.route.snapshot.params['id'];
  }

  // ngOnInit is a lifecycle hook called by Angular to indicate that Angular is done creating the component
  ngOnInit(): void {
    // Fetch the product details using the product ID and populate the form
    this.productService.getProductById(this.productId).subscribe((product: Product) => {
      console.log(product); // Log the product details to the console
      this.editProductForm.patchValue(product); // Populate the form with the product details
    });
  }

  // Handle form submission to update the product
  onSubmit(): void {
    if (this.editProductForm.valid) {
      console.log('Going to update product now...'); // Log a message indicating the update process
      console.log(this.editProductForm.value); // Log the form values to the console

      // Create an updated product object with the form values and the existing product ID
      const updatedProduct: Product = {
        id: this.productId,
        ...this.editProductForm.value
      };
      
      console.log(updatedProduct); // Log the updated product object to the console

      // Call the ProductService to update the product and navigate back to the product list on success
      this.productService.updateProduct(updatedProduct).subscribe(() => {
        this.router.navigate(['/view-products']);
      });
    }
  }
}