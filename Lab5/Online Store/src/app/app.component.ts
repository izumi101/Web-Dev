import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductService } from './services/product.service';
import { Category } from './models/category.model';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, ProductListComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'online-store';
  categories: Category[] = [];
  selectedCategoryId: number | null = null;
  productsForSelectedCategory: Product[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.categories = this.productService.getCategories();
  }

  selectCategory(categoryId: number): void {
    this.selectedCategoryId = categoryId;
    this.productsForSelectedCategory = this.productService.getProductsByCategory(categoryId);
  }

  handleRemoveProduct(productId: number): void {
    this.productService.removeProduct(productId);
    // Refresh products view
    if (this.selectedCategoryId !== null) {
      this.productsForSelectedCategory = this.productService.getProductsByCategory(this.selectedCategoryId);
    }
  }
}
