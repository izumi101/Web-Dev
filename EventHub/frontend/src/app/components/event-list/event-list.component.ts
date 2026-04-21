import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { Event, Category } from '../../models/models';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, EventCardComponent],
  template: `
    <div class="list-page">
      <div class="container list-container">
        <header class="list-header">
          <h1 class="list-title">Explore Events</h1>
          <p class="list-sub">Discover unique experiences curated just for you</p>
        </header>

        <!-- Filters Section -->
        <section class="filters-matte glass shadow-lg animate-fade-in">
          <div class="filter-row">
            <div class="f-group main-search">
              <label class="f-lbl">Search</label>
              <div class="input-glow">
                <input
                  type="text"
                  [(ngModel)]="searchQuery"
                  placeholder="Find your next adventure..."
                  (keyup.enter)="applyFilters()"
                  class="f-input"
                >
              </div>
            </div>

            <div class="f-group">
              <label class="f-lbl">Category</label>
              <select [(ngModel)]="selectedCategory" (change)="applyFilters()" class="f-select">
                <option [value]="null">All Categories</option>
                <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
              </select>
            </div>

            <div class="f-group">
              <label class="f-lbl">Sort By</label>
              <select [(ngModel)]="ordering" (change)="applyFilters()" class="f-select">
                <option value="">Newest</option>
                <option value="-date">Latest Date</option>
                <option value="price">Price: Low to High</option>
                <option value="-price">Price: High to Low</option>
                <option value="title">A-Z</option>
              </select>
            </div>

            <div class="f-actions">
              <button (click)="resetFilters()" class="btn-reset">
                Reset
              </button>
            </div>
          </div>
        </section>

        <!-- Content Area -->
        <main class="list-content">
          @if (loading) {
            <div class="loader-box">
              <div class="spinner-premium"></div>
              <p>Searching for events...</p>
            </div>
          } @else if (events.length === 0) {
            <div class="no-results-box glass border-dash">
              <span class="ico">🔍</span>
              <h3>No events found</h3>
              <p>Try adjusting your filters or search terms</p>
              <button (click)="resetFilters()" class="btn-retry">Clear all filters</button>
            </div>
          } @else {
            <div class="events-grid">
              <app-event-card
                *ngFor="let event of events"
                [event]="event"
                class="card-animate"
              ></app-event-card>
            </div>
          }
        </main>

        @if (error) {
          <div class="error-toast animate-slide-up">
            <div class="toast-content glass">
              <span class="t-ico">⚠️</span>
              <p>{{ error }}</p>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .list-page { min-height: 100vh; background: var(--background); padding-top: 8rem; padding-bottom: 5rem; }
    .list-container { max-width: 1200px !important; margin: 0 auto; }

    .list-header { margin-bottom: 3.5rem; text-align: left; }
    .list-title { font-size: 2.5rem; font-weight: 800; color: var(--foreground); letter-spacing: -0.02em; }
    .list-sub { font-size: 1rem; color: var(--muted-foreground); margin-top: 0.5rem; }

    /* Filters */
    .filters-matte { padding: 1.5rem; border-radius: 1.5rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); margin-bottom: 3rem; }
    .filter-row { display: grid; grid-template-columns: 1fr; gap: 1.5rem; align-items: flex-end; }
    @media (min-width: 768px) { .filter-row { grid-template-columns: 2fr 1fr 1fr auto; } }

    .f-group { display: flex; flex-direction: column; gap: 0.5rem; }
    .f-lbl { font-size: 0.625rem; font-weight: 700; color: var(--muted-foreground); text-transform: uppercase; letter-spacing: 0.05em; margin-left: 0.25rem; }
    
    .f-input, .f-select {
      width: 100%; padding: 0.75rem 1rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 0.75rem;
      color: var(--foreground); font-size: 0.875rem; transition: all 0.2s;
    }
    .f-input:focus, .f-select:focus { outline: none; border-color: var(--primary); background: rgba(255,255,255,0.05); box-shadow: 0 0 0 3px rgba(56,189,248,0.1); }

    .btn-reset { padding: 0.75rem 1.5rem; background: rgba(255,255,255,0.05); color: var(--foreground); font-size: 0.8125rem; font-weight: 700; border-radius: 0.75rem; border: 1px solid var(--border); transition: all 0.2s; }
    .btn-reset:hover { border-color: var(--primary); color: var(--primary); }

    /* Grid */
    .events-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 2rem; }
    
    .card-animate { animation: scaleIn 0.4s ease-out backwards; }
    @keyframes scaleIn { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }

    /* State Boxes */
    .loader-box { text-align: center; padding: 5rem 0; color: var(--muted-foreground); }
    .spinner-premium { width: 32px; height: 32px; border: 2px solid rgba(56,189,248,0.1); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1.5rem; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .no-results-box { text-align: center; padding: 5rem 2rem; border-radius: 1.5rem; border: 1px dashed var(--border); }
    .no-results-box .ico { font-size: 3rem; opacity: 0.1; display: block; margin-bottom: 1rem; }
    .no-results-box h3 { font-size: 1.5rem; font-weight: 700; color: var(--foreground); margin-bottom: 0.5rem; }
    .no-results-box p { color: var(--muted-foreground); margin-bottom: 2rem; }
    .btn-retry { background: var(--primary); color: white; padding: 0.75rem 2rem; border-radius: 0.75rem; font-weight: 700; }

    .error-toast { position: fixed; bottom: 2rem; left: 0; right: 0; display: flex; justify-content: center; z-index: 100; }
    .toast-content { background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.2); padding: 0.75rem 1.5rem; border-radius: 50px; display: flex; align-items: center; gap: 0.75rem; color: #f43f5e; font-weight: 600; }
  `]
})
export class EventListComponent implements OnInit {
  events: Event[] = [];
  categories: Category[] = [];
  searchQuery = '';
  selectedCategory: number | null = null;
  ordering = '';
  loading = false;
  error = '';

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadEvents();
  }

  loadCategories(): void {
    this.eventService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  loadEvents(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    this.loading = true;
    this.error = '';

    const params: any = {};
    if (this.searchQuery) params.search = this.searchQuery;
    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.ordering) params.ordering = this.ordering;

    this.eventService.getEvents(params).subscribe({
      next: (response) => {
        this.events = response.results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load events:', err);
        this.error = 'Failed to load events';
        this.loading = false;
      }
    });
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.selectedCategory = null;
    this.ordering = '';
    this.applyFilters();
  }
}
