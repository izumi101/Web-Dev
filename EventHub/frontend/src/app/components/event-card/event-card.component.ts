import { Component, Input, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Event } from '../../models/models';
import { LucideAngularModule, Calendar, MapPin, Heart } from 'lucide-angular';

@Component({
  selector: 'app-event-card',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <article
      class="group relative bg-card rounded-2xl border border-border overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1 cursor-pointer"
      [routerLink]="['/events', event.id]"
      [attr.aria-label]="'View details for ' + event.title"
      role="link"
      tabindex="0"
      (keydown.enter)="navigateToEvent($event)"
    >
      <!-- Image Container -->
      <div class="relative aspect-[4/3] overflow-hidden bg-muted">
        <img 
          *ngIf="event.image && !imageError"
          [src]="event.image" 
          [alt]="event.title"
          loading="lazy"
          (error)="onImageError()"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        >
        <div *ngIf="!event.image || imageError" class="w-full h-full bg-gradient-to-br from-secondary to-secondary/50 flex items-center justify-center">
          <span class="text-3xl font-bold opacity-10">{{ event.title?.charAt(0)?.toUpperCase() || 'E' }}</span>
        </div>
        
        <!-- Gradient Overlay -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
        
        <!-- Top Actions -->
        <div class="absolute top-3 left-3 right-3 flex items-start justify-between">
          <!-- Status Badge -->
          <span *ngIf="event.available_spots < 10 && event.available_spots > 0" class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/20">
            Selling Fast
          </span>
          <span *ngIf="event.is_free" class="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border bg-[#22C55E]/10 text-[#22C55E] border-[#22C55E]/20">
            Free
          </span>
          <span *ngIf="!(event.available_spots < 10 && event.available_spots > 0) && !event.is_free" class="inline-flex"></span>
          
          <!-- Favorite Button -->
          <button
            class="ml-auto p-2 rounded-full transition-all duration-200 bg-black/40 text-white hover:bg-black/60 focus:ring-2 focus:ring-primary focus:outline-none"
            (click)="$event.stopPropagation(); toggleLike()"
            [attr.aria-label]="isLiked ? 'Remove from favorites' : 'Add to favorites'"
            [attr.aria-pressed]="isLiked"
          >
            <lucide-icon [img]="icons.Heart" class="w-4 h-4" [class.fill-current]="isLiked" [class.text-[#EC4899]]="isLiked"></lucide-icon>
          </button>
        </div>

        <!-- Category Tag -->
        <div class="absolute bottom-3 left-3">
          <span class="px-2.5 py-1 rounded-lg bg-black/40 backdrop-blur-sm border border-white/10 text-white text-xs font-medium">
            {{ event.category?.name || 'Experience' }}
          </span>
        </div>
      </div>

      <!-- Content -->
      <div class="p-4">
        <h3 class="text-foreground font-semibold text-base leading-tight mb-3 line-clamp-2 group-hover:text-primary transition-colors h-[2.6em]">
          {{ event.title }}
        </h3>
        
        <div class="space-y-2 mb-4">
          <div class="flex items-center gap-2 text-muted-foreground">
            <lucide-icon [img]="icons.Calendar" class="w-4 h-4 flex-shrink-0" aria-hidden="true"></lucide-icon>
            <time [attr.datetime]="event.date" class="text-sm truncate">{{ event.date | date:'MMM d, y' }}</time>
          </div>
          <div class="flex items-center gap-2 text-muted-foreground">
            <lucide-icon [img]="icons.MapPin" class="w-4 h-4 flex-shrink-0" aria-hidden="true"></lucide-icon>
            <span class="text-sm truncate">{{ event.location }}</span>
          </div>
        </div>

        <!-- Footer -->
        <div class="flex items-center justify-between pt-3 border-t border-border mt-auto">
          <div>
            <span class="text-xs font-bold text-muted-foreground uppercase tracking-wider">From</span>
            <p class="text-foreground font-bold text-base mt-0.5">
              {{ event.is_free ? 'Free' : '$' + event.price }}
            </p>
          </div>
          <span class="px-4 py-2 rounded-xl bg-primary/10 text-primary text-sm font-bold group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-200">
            Get Tickets
          </span>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class EventCardComponent {
  @Input() event!: Event;
  isLiked = false;
  imageError = false;

  readonly icons = { Calendar, MapPin, Heart };

  toggleLike() {
    this.isLiked = !this.isLiked;
  }

  onImageError(): void {
    this.imageError = true;
  }

  navigateToEvent(event: globalThis.Event): void {
    // Let routerLink handle navigation
  }
}
