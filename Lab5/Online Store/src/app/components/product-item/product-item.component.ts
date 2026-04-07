import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() remove = new EventEmitter<number>();

  constructor(private elementRef: ElementRef) { }

  activeImageIndex: number = 0;
  showShareMenu: boolean = false;

  like(): void {
    this.product.likes++;
  }

  removeProduct(): void {
    this.remove.emit(this.product.id);
  }


  get stars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  isStarFilled(star: number): boolean {
    return star <= Math.floor(this.product.rating);
  }

  isStarHalf(star: number): boolean {
    return star === Math.ceil(this.product.rating) &&
      !Number.isInteger(this.product.rating);
  }

  selectImage(index: number): void {
    this.activeImageIndex = index;
  }

  toggleShareMenu(): void {
    this.showShareMenu = !this.showShareMenu;
  }

  openOnKaspi(): void {
    window.open(this.product.link, '_blank');
    this.showShareMenu = false;
  }

  shareOnWhatsApp(): void {
    const url = `https://wa.me/?text=Check out this product: ${encodeURIComponent(this.product.link)}`;
    window.open(url, '_blank');
    this.showShareMenu = false;
  }

  shareOnTelegram(): void {
    const url = `https://t.me/share/url?url=${encodeURIComponent(this.product.link)}&text=${encodeURIComponent(this.product.name)}`;
    window.open(url, '_blank');
    this.showShareMenu = false;
  }

  formatPrice(price: number): string {
    return price.toLocaleString('ru-KZ') + ' ₸';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.showShareMenu = false;
    }
  }
}
