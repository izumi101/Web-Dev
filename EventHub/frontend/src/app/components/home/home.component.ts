import { Component, OnInit, NgZone, OnDestroy, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { SearchService } from '../../services/search.service';
import { ToastService } from '../../services/toast.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { Event, Category } from '../../models/models';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { 
  LucideAngularModule, 
  Search, 
  MapPin, 
  Zap, 
  Shield, 
  Globe, 
  Smartphone, 
  CreditCard, 
  Users, 
  ChevronRight,
  Filter
} from 'lucide-angular';

@Component({
  selector: 'app-home',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    EventCardComponent, 
    LucideAngularModule
  ],
  template: `
    <div class="min-h-screen bg-background">
      
      <!--=========================================-->
      <!--                HERO SECTION             -->
      <!--=========================================-->
      <section class="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <!-- Subtle background gradient -->
        <div class="absolute inset-0 bg-gradient-to-b from-[#0F1115] via-[#0F1115] to-[#161A22] opacity-50"></div>
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
        
        <div class="relative max-w-7xl mx-auto">
          <div class="max-w-3xl mx-auto text-center">
            
            <!-- Badge -->
            <div class="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border mb-8 animate-fade-in">
              <span class="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse"></span>
              <span class="text-xs text-muted-foreground font-medium tracking-wide">
                2,400+ events this month
              </span>
            </div>

            <!-- Headline -->
            <h1 class="text-4xl sm:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight leading-[1.1] text-balance mb-6 animate-fade-in">
              Discover events that
              <br />
              <span class="text-primary">matter to you</span>
            </h1>

            <!-- Subheadline -->
            <p class="text-lg text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed animate-fade-in">
              From intimate concerts to global conferences. Find your next unforgettable experience.
            </p>

            <!-- Search Bar -->
            <div class="bg-card border border-border rounded-2xl p-2 max-w-2xl mx-auto shadow-lg shadow-black/20 animate-scale-in">
              <div class="flex flex-col sm:flex-row gap-2">
                <div class="flex-1 flex items-center gap-3 px-4 py-3 bg-background rounded-xl">
                  <lucide-icon [img]="icons.Search" class="w-5 h-5 text-muted-foreground flex-shrink-0"></lucide-icon>
                  <input
                    type="text"
                    [(ngModel)]="searchQuery"
                    (keyup.enter)="onSearchClick()"
                    placeholder="Search events, artists, venues..."
                    class="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                  />
                </div>
                <div class="hidden sm:flex items-center gap-3 px-4 py-3 bg-background rounded-xl border-l border-border">
                  <lucide-icon [img]="icons.MapPin" class="w-5 h-5 text-muted-foreground flex-shrink-0"></lucide-icon>
                  <input
                    type="text"
                    [(ngModel)]="searchLocation"
                    (keyup.enter)="onSearchClick()"
                    placeholder="San Francisco"
                    class="w-32 bg-transparent text-foreground placeholder:text-muted-foreground outline-none text-sm"
                  />
                </div>
                <button (click)="onSearchClick()" class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl px-6 h-12 font-bold transition-colors">
                  Search
                </button>
              </div>
            </div>

            <!-- Quick Category Shortcuts -->
            <div class="flex flex-wrap items-center justify-center gap-2 mt-8 animate-fade-in">
              <span class="text-xs text-muted-foreground mr-2">Popular:</span>
              <button (click)="filterByCategoryName('Music')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200">
                <span>🎵</span><span>Music</span>
              </button>
              <button (click)="filterByCategoryName('Tech')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200">
                <span>💻</span><span>Tech</span>
              </button>
              <button (click)="filterByCategoryName('Art')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200">
                <span>🎨</span><span>Art</span>
              </button>
              <button (click)="filterByCategoryName('Sports')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200">
                <span>⚽</span><span>Sports</span>
              </button>
              <button (click)="filterByCategoryName('Business')" class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/50 transition-all duration-200">
                <span>📊</span><span>Business</span>
              </button>
            </div>
          </div>

          <!-- Stats Row -->
          <div #statsRow class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto animate-fade-in">
            <div class="text-center">
              <div class="text-2xl sm:text-3xl font-semibold text-foreground">{{ animatedStats.users }}K+</div>
              <div class="text-xs text-muted-foreground mt-1">Active Users</div>
            </div>
            <div class="text-center">
              <div class="text-2xl sm:text-3xl font-semibold text-foreground">{{ animatedStats.events }}K</div>
              <div class="text-xs text-muted-foreground mt-1">Events Monthly</div>
            </div>
            <div class="text-center">
              <div class="text-2xl sm:text-3xl font-semibold text-foreground">{{ animatedStats.cities }}+</div>
              <div class="text-xs text-muted-foreground mt-1">Cities</div>
            </div>
            <div class="text-center">
              <div class="text-2xl sm:text-3xl font-semibold text-foreground">{{ animatedStats.satisfaction }}%</div>
              <div class="text-xs text-muted-foreground mt-1">Satisfaction</div>
            </div>
          </div>
        </div>
      </section>

      <!--=========================================-->
      <!--             BENTO FEATURES              -->
      <!--=========================================-->
      <section class="px-4 sm:px-6 lg:px-8 py-16 bg-background border-t border-border/50">
        <div class="max-w-7xl mx-auto">
          <!-- Section Header -->
          <div class="text-center mb-12">
            <h2 class="text-3xl font-semibold text-foreground mb-3">Why EventHub?</h2>
            <p class="text-muted-foreground max-w-xl mx-auto">
              Built for event lovers, by event lovers. Everything you need for seamless experiences.
            </p>
          </div>

          <!-- Bento Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-[180px]">
            
            <!-- Large Card - Instant Booking -->
            <div class="sm:col-span-2 row-span-2 bg-card rounded-2xl border border-border p-6 flex flex-col justify-between group hover:border-primary/30 transition-all duration-300">
              <div>
                <div class="inline-flex items-center justify-center w-12 h-12 rounded-xl text-primary bg-primary/10 mb-4">
                  <lucide-icon [img]="icons.Zap" class="w-6 h-6"></lucide-icon>
                </div>
                <h3 class="text-xl font-semibold text-foreground mb-2">Instant Booking</h3>
                <p class="text-muted-foreground leading-relaxed">Secure your spot in seconds with our streamlined checkout process</p>
              </div>
              <div class="mt-4 pt-4 border-t border-border">
                <div class="flex items-center gap-4">
                  <div class="flex -space-x-2">
                    <div class="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs">J</div>
                    <div class="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs">M</div>
                    <div class="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs">S</div>
                    <div class="w-8 h-8 rounded-full bg-muted border-2 border-card flex items-center justify-center text-xs">+</div>
                  </div>
                  <span class="text-sm text-muted-foreground">12,000+ booked this week</span>
                </div>
              </div>
            </div>

            <!-- Small Card - Verified Events -->
            <div class="bg-card rounded-2xl border border-border p-5 flex flex-col justify-between group hover:border-[#22C55E]/30 transition-all duration-300">
              <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#22C55E] bg-[#22C55E]/10">
                <lucide-icon [img]="icons.Shield" class="w-5 h-5"></lucide-icon>
              </div>
              <div>
                <h3 class="text-base font-semibold text-foreground mb-1">Verified Events</h3>
                <p class="text-sm text-muted-foreground">Every event is vetted for authenticity</p>
              </div>
            </div>

            <!-- Small Card - 180+ Cities -->
            <div class="bg-card rounded-2xl border border-border p-5 flex flex-col justify-between group hover:border-[#06B6D4]/30 transition-all duration-300">
              <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#06B6D4] bg-[#06B6D4]/10">
                <lucide-icon [img]="icons.Globe" class="w-5 h-5"></lucide-icon>
              </div>
              <div>
                <h3 class="text-base font-semibold text-foreground mb-1">180+ Cities</h3>
                <p class="text-sm text-muted-foreground">Discover events worldwide</p>
              </div>
            </div>

            <!-- Medium Card - Mobile Tickets -->
            <div class="sm:col-span-1 row-span-1 bg-card rounded-2xl border border-border p-5 flex flex-col justify-between group hover:border-[#F59E0B]/30 transition-all duration-300">
              <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#F59E0B] bg-[#F59E0B]/10">
                <lucide-icon [img]="icons.Smartphone" class="w-5 h-5"></lucide-icon>
              </div>
              <div>
                <h3 class="text-base font-semibold text-foreground mb-1">Mobile Tickets</h3>
                <p class="text-sm text-muted-foreground line-clamp-2">Digital tickets stored securely in your wallet. No printing needed, just scan and go.</p>
              </div>
            </div>

            <!-- Medium Card - Secure Payments -->
            <div class="sm:col-span-1 row-span-1 bg-card rounded-2xl border border-border p-5 flex flex-col justify-between group hover:border-[#EC4899]/30 transition-all duration-300">
              <div class="inline-flex items-center justify-center w-10 h-10 rounded-xl text-[#EC4899] bg-[#EC4899]/10">
                <lucide-icon [img]="icons.CreditCard" class="w-5 h-5"></lucide-icon>
              </div>
              <div>
                <h3 class="text-base font-semibold text-foreground mb-1">Secure Payments</h3>
                <p class="text-sm text-muted-foreground line-clamp-2">Multiple payment options with buyer protection</p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      <!--=========================================-->
      <!--                EVENTS GRID              -->
      <!--=========================================-->
      <main id="resultsSection" class="px-4 sm:px-6 lg:px-8 py-8 space-y-12 pb-24 border-t border-border/50 bg-[#0F1115]">
        <div class="max-w-7xl mx-auto">
          
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 class="text-2xl font-semibold text-foreground">Featured Events</h2>
              <p class="text-sm text-muted-foreground mt-1">Handpicked experiences just for you</p>
            </div>
            
            <div class="flex items-center gap-3">
              <div class="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
                <lucide-icon [img]="icons.Filter" class="w-4 h-4 text-muted-foreground"></lucide-icon>
                <select [(ngModel)]="ordering" (change)="applyFilters()" class="bg-transparent text-sm font-medium text-foreground outline-none border-none cursor-pointer">
                  <option value="">Newest</option>
                  <option value="-date">Latest Date</option>
                  <option value="price">Low to High</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Category Rail -->
          <div class="flex gap-2.5 overflow-x-auto pb-4 mb-8 no-scrollbar scroll-smooth snap-x">
            <button 
              class="px-5 py-2.5 rounded-xl border font-medium text-sm whitespace-nowrap transition-all snap-start"
              [class]="selectedCategory === null ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'"
              (click)="filterByCategory(null)"
            >
              All Events
            </button>
            @for (cat of categories; track cat.id) {
              <button 
                class="px-5 py-2.5 rounded-xl border font-medium text-sm whitespace-nowrap transition-all snap-start"
                [class]="selectedCategory === cat.id ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border text-muted-foreground hover:border-primary/50 hover:text-foreground'"
                (click)="filterByCategory(cat.id)"
              >
                {{ getCategoryEmoji(cat.name) }} {{ cat.name }}
              </button>
            }
          </div>

          <!-- Grid Results -->
          @if (loading) {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (i of [1,2,3,4,5,6]; track i) {
                <div class="bg-card rounded-2xl border border-border overflow-hidden animate-pulse">
                  <div class="h-48 bg-muted/50"></div>
                  <div class="p-5 space-y-3">
                    <div class="h-3 bg-muted/50 rounded-full w-1/3"></div>
                    <div class="h-5 bg-muted/50 rounded-full w-3/4"></div>
                    <div class="h-3 bg-muted/50 rounded-full w-1/2"></div>
                    <div class="flex justify-between items-center pt-2">
                      <div class="h-4 bg-muted/50 rounded-full w-1/4"></div>
                      <div class="h-8 bg-muted/50 rounded-xl w-1/3"></div>
                    </div>
                  </div>
                </div>
              }
            </div>
          } @else if (events.length === 0) {
            <div class="py-20 text-center bg-card rounded-3xl border border-dashed border-border/50">
              <lucide-icon [img]="icons.Search" class="w-12 h-12 text-muted-foreground/30 mx-auto mb-4"></lucide-icon>
              <h3 class="text-xl font-bold text-foreground mb-2">Nothing here yet</h3>
              <p class="text-muted-foreground mb-6">We couldn't find any events matching your criteria.</p>
              <button (click)="resetFilters()" class="bg-primary/10 text-primary font-bold px-6 py-3 rounded-xl hover:bg-primary hover:text-primary-foreground transition-colors">
                Clear Filters
              </button>
            </div>
          } @else {
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              @for (event of events; track event.id) {
                <app-event-card [event]="event"></app-event-card>
              }
            </div>
            
            <div class="mt-12 text-center" *ngIf="hasMore">
               <button
                 (click)="loadMore()"
                 [disabled]="loadingMore"
                 class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-card border border-border text-sm font-medium hover:border-primary/50 transition-colors disabled:opacity-50"
               >
                 @if (loadingMore) {
                   <div class="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                   <span>Loading...</span>
                 } @else {
                   <span>Load More Events</span>
                   <lucide-icon [img]="icons.ChevronRight" class="w-4 h-4"></lucide-icon>
                 }
               </button>
            </div>
          }
        </div>
      </main>
    </div>
  `,
  styles: [`
    .no-scrollbar::-webkit-scrollbar {
      display: none;
    }
    .no-scrollbar {
      -ms-overflow-style: none;  /* IE and Edge */
      scrollbar-width: none;  /* Firefox */
    }
  `]
})
export class HomeComponent implements OnInit, OnDestroy {
  events: Event[] = [];
  categories: Category[] = [];
  searchQuery = '';
  searchLocation = '';
  selectedCategory: number | null = null;
  ordering = '';
  loading = false;
  loadingMore = false;
  hasMore = false;
  currentPage = 1;
  error = '';
  private searchSub?: Subscription;
  private statsAnimated = false;

  animatedStats = { users: 0, events: 0, cities: 0, satisfaction: 0 };

  @ViewChild('statsRow') statsRow!: ElementRef;

  readonly icons = {
    Search,
    MapPin,
    Zap,
    Shield,
    Globe,
    Smartphone,
    CreditCard,
    Users,
    ChevronRight,
    Filter
  };

  constructor(
    private eventService: EventService,
    private searchService: SearchService,
    private toastService: ToastService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.searchSub = this.searchService.searchQuery$.pipe(
      distinctUntilChanged()
    ).subscribe(query => {
      this.searchQuery = query;
      this.applyFilters();
    });
    this.searchService.searchLocation$.pipe(
      distinctUntilChanged()
    ).subscribe(loc => {
      this.searchLocation = loc;
    });
  }

  ngOnDestroy(): void {
    this.searchSub?.unsubscribe();
  }

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver !== 'undefined' && this.statsRow) {
      const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && !this.statsAnimated) {
          this.statsAnimated = true;
          this.animateCounters();
          observer.disconnect();
        }
      }, { threshold: 0.3 });
      observer.observe(this.statsRow.nativeElement);
    }
  }

  private animateCounters(): void {
    const targets = { users: 50, events: 2.4, cities: 180, satisfaction: 98 };
    const duration = 1500;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      // Ease-out cubic
      const ease = 1 - Math.pow(1 - progress, 3);
      this.ngZone.run(() => {
        this.animatedStats = {
          users: Math.round(targets.users * ease),
          events: parseFloat((targets.events * ease).toFixed(1)),
          cities: Math.round(targets.cities * ease),
          satisfaction: Math.round(targets.satisfaction * ease),
        };
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
  }

  loadCategories(): void {
    this.eventService.getCategories().subscribe({
      next: (categories) => {
        this.ngZone.run(() => {
          this.categories = categories;
        });
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
      }
    });
  }

  applyFilters(): void {
    // Sync with search service
    this.searchService.setSearchQuery(this.searchQuery);
    this.searchService.setSearchLocation(this.searchLocation);

    this.ngZone.run(() => {
      this.loading = true;
      this.error = '';
    });

    const params: any = {};
    if (this.searchQuery) params.search = this.searchQuery;
    if (this.searchLocation) params.location = this.searchLocation;
    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.ordering) params.ordering = this.ordering;
    params.page = 1;
    this.currentPage = 1;

    this.eventService.getEvents(params).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          const results = response.results || (response as any);
          this.events = results;
          this.hasMore = !!response.next;
          this.loading = false;
        });
      },
      error: (err) => {
        console.error('Failed to load events:', err);
        this.ngZone.run(() => {
          if (err.status !== 0) {
            this.toastService.error('Failed to load events. Please try again later.');
          }
          this.loading = false;
        });
      }
    });
  }

  loadMore(): void {
    if (this.loadingMore || !this.hasMore) return;

    this.loadingMore = true;
    this.currentPage++;

    const params: any = { page: this.currentPage };
    if (this.searchQuery) params.search = this.searchQuery;
    if (this.searchLocation) params.location = this.searchLocation;
    if (this.selectedCategory) params.category = this.selectedCategory;
    if (this.ordering) params.ordering = this.ordering;

    this.eventService.getEvents(params).subscribe({
      next: (response) => {
        this.ngZone.run(() => {
          const results = response.results || (response as any);
          this.events = [...this.events, ...results];
          this.hasMore = !!response.next;
          this.loadingMore = false;
        });
      },
      error: (err) => {
        console.error('Failed to load more events:', err);
        this.ngZone.run(() => {
          this.currentPage--;
          this.toastService.error('Failed to load more events.');
          this.loadingMore = false;
        });
      }
    });
  }

  filterByCategory(categoryId: number | null): void {
    this.selectedCategory = categoryId;
    this.applyFilters();
  }

  onSearchClick(): void {
    this.applyFilters();
    this.scrollToResults();
  }

  scrollToResults(): void {
    setTimeout(() => {
      document.getElementById('resultsSection')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  }

  filterByCategoryName(name: string): void {
    const searchName = name.toLowerCase();
    
    // Пытаемся найти подходящую категорию
    const category = this.categories.find(c => {
      const catName = c.name.toLowerCase();
      return catName.includes(searchName) || searchName.includes(catName);
    });

    // Важно: при выборе категории сбрасываем текстовый поиск, иначе они конфликтуют (AND)
    this.searchQuery = '';
    this.searchLocation = ''; // По желанию можно оставить, но лучше сбросить для чистоты
    this.searchService.setSearchQuery('');
    this.searchService.setSearchLocation('');

    if (category) {
      this.selectedCategory = category.id;
    } else {
      // Если категорию не нашли (например "Art"), ищем как обычный текст
      this.searchQuery = name;
      this.selectedCategory = null;
    }
    
    this.applyFilters();
    this.scrollToResults();
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.searchLocation = '';
    this.selectedCategory = null;
    this.ordering = '';
    this.applyFilters();
  }

  getCategoryEmoji(name: string): string {
    const emojiMap: { [key: string]: string } = {
      'Concert': '🎸',
      'Festival': '🎡',
      'Conference': '💼',
      'Comedy': '🎤',
      'Sports': '🏆',
      'Theater': '🎭',
      'Business': '📈',
      'Food': '🍕',
      'Wellness': '🧘',
      'Exhibition': '🖼️',
      'Workshop': '🛠️'
    };
    return emojiMap[name] || '✨';
  }
}
