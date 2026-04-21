import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { Event, Registration } from '../../models/models';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="detail-page">
      @if (loading) {
        <div class="loader-full">
          <div class="spinner-premium"></div>
          <p>Loading experience...</p>
        </div>
      } @else if (event) {
        <!-- Immersive Hero -->
        <header class="detail-hero">
          <img *ngIf="event.image" [src]="event.image" [alt]="event.title" class="hero-bg">
          <div *ngIf="!event.image" class="hero-placeholder">
            <span class="placeholder-char">E</span>
          </div>
          <div class="hero-overlay-grad"></div>
          
          <div class="container hero-container">
            <div class="hero-content">
              <nav class="breadcrumb">
                <a routerLink="/" class="crumb">Events</a>
                <span class="sep">/</span>
                <span class="crumb active">{{ event.category?.name || 'Experience' }}</span>
              </nav>
              <h1 class="event-headline">{{ event.title }}</h1>
              
              <div class="event-pill-row">
                <div class="pill-ico">
                  <span class="ico">📅</span>
                  <span>{{ event.date | date:'EEEE, MMM d, y • h:mm a' }}</span>
                </div>
                <div class="pill-ico">
                  <span class="ico">📍</span>
                  <span>{{ event.location }}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        <!-- Main Content -->
        <main class="container detail-content-layout">
          <div class="primary-col">
            <!-- About Section -->
            <section class="info-card animate-fade-in">
              <h2 class="card-title">About the Experience</h2>
              <div class="description-text">
                <p>{{ event.description }}</p>
              </div>
            </section>

            <!-- Stats Grid -->
            <section class="detail-stats-grid">
              <div class="d-stat-card glass shadow-sm">
                <div class="d-ico">📅</div>
                <div class="d-txt">
                  <span class="d-lbl">Date</span>
                  <p class="d-val">{{ event.date | date:'MMMM d, y' }}</p>
                </div>
              </div>
              <div class="d-stat-card glass shadow-sm">
                <div class="d-ico">📍</div>
                <div class="d-txt">
                  <span class="d-lbl">Venue</span>
                  <p class="d-val">{{ event.location }}</p>
                </div>
              </div>
              <div class="d-stat-card glass shadow-sm">
                <div class="d-ico">👥</div>
                <div class="d-txt">
                  <span class="d-lbl">Availability</span>
                  <p class="d-val">{{ event.available_spots }} Spots Left</p>
                </div>
              </div>
              <div class="d-stat-card glass shadow-sm">
                <div class="d-ico">🛡️</div>
                <div class="d-txt">
                  <span class="d-lbl">Safety</span>
                  <p class="d-val">Verified Event</p>
                </div>
              </div>
            </section>
          </div>

          <!-- Sticky Sidebar -->
          <aside class="sidebar-col">
            <div class="sticky-sidebar">
              <div class="booking-matte-card glass-premium shadow-2xl animate-fade-in">
                <div class="booking-head">
                  <div class="price-stack">
                    <span class="price-lbl">Standard Price</span>
                    <h3 class="price-amt">{{ event.is_free ? 'Free' : '$' + event.price }}</h3>
                  </div>
                  <div class="tag-status" [class.status-low]="event.available_spots < 10">
                    {{ event.available_spots }} left
                  </div>
                </div>

                <div class="booking-actions">
                  @if (authService.isLoggedIn) {
                    @if (registrationStatus === 'confirmed' || registrationStatus === 'pending') {
                      <div class="confirmed-box">
                        <div class="check-mark">✓</div>
                        <div class="conf-info">
                          <p class="conf-title">Registered!</p>
                          <p class="conf-sub">Ticket is in your dashboard</p>
                        </div>
                      </div>
                      <button [routerLink]="['/my-registrations']" class="btn-secondary-matte">
                        Go to My Tickets
                      </button>
                    } @else {
                      <button 
                        (click)="showCheckout = true" 
                        [disabled]="registering"
                        class="btn-primary-matte"
                      >
                        Reserve Spot Now
                      </button>
                    }
                  } @else {
                    <button routerLink="/login" class="btn-primary-matte">
                      Log in to Register
                    </button>
                  }

                  <div class="feature-list-mini">
                    <div class="feat"><span class="check">✓</span> Instant confirmation</div>
                    <div class="feat"><span class="check">✓</span> Secure payment processing</div>
                  </div>
                  
                  <button *ngIf="registrationStatus === 'confirmed' || registrationStatus === 'pending'" (click)="cancelRegistration()" class="cancel-link" [disabled]="cancelling">
                    {{ cancelling ? 'Cancelling...' : 'Cancel Registration' }}
                  </button>
                </div>

                <div class="booking-footer" style="display: flex; justify-content: space-between; align-items: center;">
                  <span>Secure Checkout • All sales final</span>
                  <button (click)="shareEvent()" style="background: none; border: 1px solid var(--border); border-radius: 0.75rem; padding: 0.5rem 1rem; color: var(--foreground); font-size: 0.8125rem; font-weight: 700; cursor: pointer; transition: all 0.2s; display: flex; align-items: center; gap: 0.375rem;">
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </main>

        <!-- Checkout Overlay Modal -->
        <div *ngIf="showCheckout" class="checkout-overlay animate-fade-in">
          <div class="checkout-modal glass-premium shadow-2xl animate-slide-up">
            <header class="checkout-header">
              <h2 class="checkout-title">Confirm Registration</h2>
              <button (click)="showCheckout = false" class="close-btn">✕</button>
            </header>

            <div class="checkout-body">
              <div class="checkout-info-row">
                <div class="info-item">
                  <span class="info-lbl">Event</span>
                  <p class="info-val">{{ event.title }}</p>
                </div>
                <div class="info-item">
                  <span class="info-lbl">Price</span>
                  <p class="info-val">{{ event.is_free ? 'Free' : '$' + event.price }}</p>
                </div>
              </div>

              <div class="checkout-form">
                <div class="form-group">
                  <label class="form-lbl">Full Name</label>
                  <input 
                    type="text" 
                    [value]="authService.currentUser?.first_name + ' ' + authService.currentUser?.last_name" 
                    class="form-input read-only" 
                    readonly
                  >
                </div>

                <div class="form-group">
                  <label class="form-lbl">Email</label>
                  <input 
                    type="email" 
                    [value]="authService.currentUser?.email" 
                    class="form-input read-only" 
                    readonly
                  >
                </div>

                <div class="form-group">
                  <label class="form-lbl">Additional Notes (Optional)</label>
                  <textarea 
                    [(ngModel)]="registrationNotes" 
                    placeholder="E.g. dietary requirements, special requests..." 
                    class="form-input-area"
                    rows="3"
                  ></textarea>
                </div>
              </div>
            </div>

            <footer class="checkout-footer">
              <button (click)="showCheckout = false" class="btn-cancel">Cancel</button>
              <button 
                (click)="registerForEvent()" 
                [disabled]="registering"
                class="btn-confirm"
              >
                @if (registering) {
                  <div class="spinner-tiny"></div>
                  <span>Processing...</span>
                } @else {
                  <span>Complete Registration</span>
                }
              </button>
            </footer>
          </div>
        </div>
      }

    </div>
  `,
  styles: [`
    .detail-page { min-height: 100vh; background: var(--background); padding-bottom: 5rem; }

    /* Hero */
    .detail-hero { position: relative; height: 60vh; min-height: 450px; display: flex; align-items: flex-end; overflow: hidden; padding-bottom: 5rem; }
    .hero-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; transform: scale(1.02); filter: brightness(0.7); }
    .hero-placeholder { position: absolute; inset: 0; background: #0F1115; display: flex; align-items: center; justify-content: center; }
    .placeholder-char { font-size: 8rem; font-weight: 900; opacity: 0.1; color: white; }
    .hero-overlay-grad { position: absolute; inset: 0; background: linear-gradient(to bottom, transparent 20%, #0F1115 100%); }

    .hero-container { position: relative; z-index: 10; }
    .breadcrumb { display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1.5rem; }
    .crumb { font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.6); }
    .crumb.active { color: var(--primary); }
    .sep { font-size: 0.75rem; color: rgba(255,255,255,0.3); }

    .event-headline { font-size: clamp(2.25rem, 6vw, 4rem); font-weight: 900; color: white; letter-spacing: -0.02em; line-height: 1.1; margin-bottom: 2rem; }
    .event-pill-row { display: flex; flex-wrap: wrap; gap: 2rem; }
    .pill-ico { display: flex; align-items: center; gap: 0.5rem; color: rgba(255,255,255,0.8); font-size: 1rem; font-weight: 500; }
    .pill-ico .ico { font-size: 1.25rem; opacity: 0.9; }

    /* Layout */
    .detail-content-layout { display: flex; flex-direction: column; gap: 4rem; margin-top: -3.5rem; position: relative; z-index: 20; }
    @media (min-width: 1024px) { .detail-content-layout { flex-direction: row; } }

    .primary-col { flex: 1; }
    .sidebar-col { width: 100%; }
    @media (min-width: 1024px) { .sidebar-col { width: 400px; } }

    /* About Section */
    .info-card { background: var(--card); border: 1px solid var(--border); border-radius: 2rem; padding: 2.5rem; margin-bottom: 3rem; }
    .card-title { font-size: 1.5rem; font-weight: 800; color: var(--foreground); margin-bottom: 1.5rem; }
    .description-text p { font-size: 1.125rem; line-height: 1.8; color: var(--muted-foreground); white-space: pre-wrap; }

    /* Stats Grid */
    .detail-stats-grid { display: grid; grid-template-columns: repeat(1, 1fr); gap: 1.5rem; }
    @media (min-width: 640px) { .detail-stats-grid { grid-template-columns: repeat(2, 1fr); } }
    .d-stat-card { display: flex; align-items: center; gap: 1.25rem; padding: 1.5rem; border-radius: 1.5rem; background: rgba(255,255,255,0.02); }
    .d-ico { font-size: 1.5rem; width: 48px; height: 48px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.03); border-radius: 14px; }
    .d-txt { display: flex; flex-direction: column; gap: 0.25rem; }
    .d-lbl { font-size: 0.625rem; font-weight: 700; color: var(--muted-foreground); text-transform: uppercase; letter-spacing: 0.05em; }
    .d-val { font-size: 1rem; font-weight: 700; color: var(--foreground); }

    /* Sidebar / Booking Card */
    .sticky-sidebar { position: sticky; top: 100px; }
    .glass-premium { background: rgba(15, 17, 21, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.08); }
    .booking-matte-card { padding: 2.5rem; border-radius: 2rem; }
    
    .booking-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 2.5rem; }
    .price-lbl { font-size: 0.75rem; font-weight: 600; color: var(--muted-foreground); text-transform: uppercase; margin-bottom: 0.5rem; display: block; }
    .price-amt { font-size: 2.5rem; font-weight: 900; color: white; line-height: 1; }
    
    .tag-status { padding: 0.375rem 0.875rem; border-radius: 50px; background: rgba(34,197,94,0.1); color: #22c55e; font-size: 0.75rem; font-weight: 700; }
    .status-low { background: rgba(244,63,94,0.1); color: #f43f5e; }

    .booking-actions { display: flex; flex-direction: column; gap: 1.5rem; }
    .btn-primary-matte { background: var(--primary); color: white; padding: 1.125rem; border-radius: 1.25rem; font-weight: 800; font-size: 1rem; transition: transform 0.2s, opacity 0.2s; }
    .btn-primary-matte:hover:not(:disabled) { transform: translateY(-2px); opacity: 0.95; }
    .btn-primary-matte:disabled { opacity: 0.5; }

    .btn-secondary-matte { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: white; padding: 1.125rem; border-radius: 1.25rem; font-weight: 700; font-size: 1rem; }

    .confirmed-box { display: flex; align-items: center; gap: 1rem; padding: 1.25rem; background: rgba(34,197,94,0.05); border: 1px solid rgba(34,197,94,0.1); border-radius: 1.25rem; }
    .check-mark { width: 28px; height: 28px; background: #22c55e; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 800; }
    .conf-title { font-size: 1rem; font-weight: 700; color: #22c55e; }
    .conf-sub { font-size: 0.75rem; color: var(--muted-foreground); }

    .feature-list-mini { display: flex; flex-direction: column; gap: 0.75rem; padding: 1.5rem 0; border-y: 1px solid rgba(255,255,255,0.05); }
    .feat { display: flex; align-items: center; gap: 0.75rem; font-size: 0.8125rem; font-weight: 500; color: var(--muted-foreground); }
    .feat .check { color: var(--primary); font-weight: 800; }

    .cancel-link { font-size: 0.75rem; font-weight: 700; color: var(--muted-foreground); text-align: center; background: none; border: none; }
    .cancel-link:hover { color: #f43f5e; }

    .booking-footer { text-align: center; font-size: 0.6875rem; font-weight: 600; color: var(--muted-foreground); opacity: 0.6; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 1rem; }

    /* Loader */
    .loader-full { text-align: center; padding: 10rem 0; color: var(--muted-foreground); }
    .spinner-premium { width: 44px; height: 44px; border: 3px solid rgba(56,189,248,0.1); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1.5rem; }
    @keyframes spin { to { transform: rotate(360deg); } }

    /* Checkout Modal */
    .checkout-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(10px); z-index: 1000; display: flex; align-items: center; justify-content: center; padding: 1rem; }
    .checkout-modal { width: 100%; max-width: 500px; border-radius: 2rem; overflow: hidden; }
    
    .checkout-header { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border); display: flex; justify-content: space-between; align-items: center; }
    .checkout-title { font-size: 1.25rem; font-weight: 800; color: white; }
    .close-btn { background: none; border: none; color: var(--muted-foreground); font-size: 1.25rem; cursor: pointer; }
    
    .checkout-body { padding: 2rem; }
    .checkout-info-row { display: flex; gap: 2rem; margin-bottom: 2rem; padding: 1.25rem; background: rgba(255,255,255,0.03); border-radius: 1.25rem; border: 1px solid var(--border); }
    .info-item { flex: 1; }
    .info-lbl { font-size: 0.625rem; font-weight: 700; color: var(--muted-foreground); text-transform: uppercase; display: block; margin-bottom: 0.25rem; }
    .info-val { font-size: 0.9375rem; font-weight: 700; color: white; }
    
    .checkout-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .form-lbl { font-size: 0.75rem; font-weight: 700; color: var(--muted-foreground); display: block; margin-bottom: 0.5rem; }
    .form-input { width: 100%; padding: 0.875rem 1.25rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 1rem; color: white; }
    .form-input.read-only { opacity: 0.6; cursor: not-allowed; }
    .form-input-area { width: 100%; padding: 0.875rem 1.25rem; background: rgba(255,255,255,0.03); border: 1px solid var(--border); border-radius: 1rem; color: white; resize: none; }
    .form-input-area:focus { outline: none; border-color: var(--primary); }
    
    .checkout-footer { padding: 1.5rem 2rem; background: rgba(255,255,255,0.02); display: flex; gap: 1rem; justify-content: flex-end; }
    .btn-cancel { padding: 0.875rem 1.5rem; border-radius: 1rem; font-weight: 700; color: var(--muted-foreground); background: none; border: none; }
    .btn-confirm { padding: 0.875rem 2rem; background: var(--primary); color: white; border-radius: 1rem; font-weight: 800; display: flex; align-items: center; gap: 0.5rem; }
    .btn-confirm:disabled { opacity: 0.5; }
    
    .spinner-tiny { width: 16px; height: 16px; border: 2px solid rgba(255,255,255,0.2); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
    
    .animate-slide-up { animation: slideUp 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes slideUp { from { transform: translateY(30px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
  `]
})
export class EventDetailComponent implements OnInit {
  event: Event | null = null;
  loading = false;
  registering = false;
  cancelling = false;
  processingPayment = false;
  registrationStatus: string | null = null;
  registrationError = '';
  showSuccessToast = false;
  
  showCheckout = false;
  registrationNotes = '';

  constructor(
    private eventService: EventService,
    private paymentService: PaymentService,
    public authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadEvent();
  }

  loadEvent(): void {
    this.loading = true;
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.loading = false;
      return;
    }

    this.eventService.getEvent(Number(id)).subscribe({
      next: (event) => {
        this.event = event;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load event:', err);
        this.loading = false;
      }
    });

    // We can also try to load user's registrations to see if they're already registered
    if (this.authService.isLoggedIn) {
       this.eventService.getMyRegistrations().subscribe({
         next: (res) => {
            const reg = res.results.find(r => r.event.id === Number(id));
            if (reg) {
              this.registrationStatus = reg.status;
            }
         }
       });
    }
  }

  registerForEvent(): void {
    if (!this.event) return;

    this.registering = true;
    this.registrationError = '';

    this.eventService.registerForEvent(this.event.id, this.registrationNotes).subscribe({
      next: (registration) => {
        this.registrationStatus = registration.status;
        this.registering = false;
        this.showCheckout = false;
        this.registrationNotes = '';
        this.toastService.success('Successfully registered!');
      },
      error: (err) => {
        console.error('Registration failed:', err);
        this.toastService.error(err.error?.detail || err.error?.error || 'Registration failed. Please try again.');
        this.registering = false;
      }
    });
  }

  cancelRegistration(): void {
    if (!this.event) return;

    this.cancelling = true;
    this.registrationError = '';

    this.eventService.cancelRegistration(this.event.id).subscribe({
      next: () => {
        this.registrationStatus = null;
        this.cancelling = false;
        this.toastService.success('Registration cancelled');
      },
      error: (err) => {
        console.error('Cancellation failed:', err);
        this.toastService.error('Failed to cancel registration.');
        this.cancelling = false;
      }
    });
  }

  proceedToPayment(): void {
    if (!this.event) return;

    this.processingPayment = true;
    
    setTimeout(() => {
      this.toastService.success('Payment successful!');
      this.registrationStatus = 'confirmed';
      this.processingPayment = false;
      this.loadEvent();
    }, 1500);
  }

  async shareEvent(): Promise<void> {
    if (!this.event) return;

    const shareData = {
      title: this.event.title,
      text: `Check out "${this.event.title}" on EventHub!`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (e) {
        // User cancelled share — do nothing
      }
    } else {
      try {
        await navigator.clipboard.writeText(window.location.href);
        this.toastService.success('Link copied to clipboard!');
      } catch {
        this.toastService.error('Failed to copy link');
      }
    }
  }
}
