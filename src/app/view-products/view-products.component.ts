import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Product } from '../products/products.model';
import { CommonModule } from '@angular/common';
import { ProductService } from '../products/products.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-view-products',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './view-products.component.html',
  styleUrl: './view-products.component.css',
})
export class ViewProductsComponent implements OnInit, AfterViewInit {
  title: string; // Title of the component
  productsList: Product[]; // List of all products
  filteredProductsList: Product[]; // List of products filtered by search query
  searchQuery: string = ''; // Search query entered by the user

  // props related to pagination
  paginatedProductsList: Product[];
  currentPage: number = 1;
  pageSize: number = 5;


  // Injecting ProductService and Router
  constructor(private productService: ProductService, private router: Router) {
    this.title = 'Products List'; // Initialize the title
    this.productsList = []; // Initialize the products list
    this.filteredProductsList = []; // Initialize the filtered products list
    this.paginatedProductsList = [];
  }

  // ngOnInit is a lifecycle hook called by Angular to indicate that Angular is done creating the component
  ngOnInit() {
    console.log("ViewProductsComponent initialized");
    this.loadProducts(); // Load products when the component is initialized
    this.updatePaginatedProductsList();
  }

  updatePaginatedProductsList(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedProductsList = this.filteredProductsList.slice(startIndex,endIndex);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedProductsList();
  }


  // 12 records / page size = 5
  // total number of pages = 3 => [1, 2, 3]
  get pages(): number[] {
    
    // number of pages
    const totalPages = Math.ceil(this.filteredProductsList.length / this.pageSize);

    const pages: number[] = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Load products from the ProductService
  loadProducts(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.productsList = products; // Set the productsList with the fetched products
      this.filteredProductsList = products; // Initialize the filteredProductsList with all products
      this.updatePaginatedProductsList()
      // console.log("Products Loaded"); // Log the products to the console for debugging
    });
  }

  ngAfterViewInit(): void {
    console.log("ViewProductsComponent View initialized"); // Log the initialization of
  }

  // Filter the products based on the search query
  onSearch(): void {
    if (this.searchQuery) {
      // If there is a search query, filter the productsList
      this.filteredProductsList = this.productsList.filter((product) =>
        product.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      // If there is no search query, show all products
      this.filteredProductsList = this.productsList;
    }
  }

  // Navigate to the add product page
  addProduct(): void {
    this.router.navigate(['/add-product']);
  }

  // Navigate to the view product page
  viewProduct(productId: number): void {
    this.router.navigate(['/view-product', productId]);
  }

  // Delete a product and reload the products list
  deleteProduct(productId: number): void {
    const confirmation = confirm(
      'Are you sure you want to delete this product?'
    );
    
    // Proceed with deletion if the user confirms
    if (confirmation) {
      this.productService.deleteProduct(productId).subscribe(() => {
        this.loadProducts(); // Reload the products list after deletion
      });
    }
  }

  // Navigate to the edit product page
  editProduct(productId: number): void {
    this.router.navigate(['/edit-product', productId]);
  }
}
