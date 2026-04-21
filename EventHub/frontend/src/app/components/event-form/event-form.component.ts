import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EventService } from '../../services/event.service';
import { Category } from '../../models/models';

@Component({
  selector: 'app-event-form',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="form-page">
      <div class="container form-layout">
        <header class="page-header animate-fade-in">
          <h1 class="page-title">{{ editMode ? 'Refine' : 'Orchestrate' }} <span class="accent-glow">Experience</span></h1>
          <p class="page-subtitle">Shape the future of community gatherings with premium tools</p>
        </header>

        <div class="glass form-matte-card animate-scale-in">
          <form (ngSubmit)="onSubmit()" class="premier-form">
            <!-- Section: Core Details -->
            <div class="form-section">
              <h2 class="section-tag">Identity</h2>
              
              <div class="field-item">
                <label class="field-lbl">Experience Title</label>
                <input
                  type="text"
                  [(ngModel)]="formData.title"
                  name="title"
                  placeholder="The Grand Gala..."
                  class="field-input"
                  required
                >
              </div>

              <div class="field-item">
                <label class="field-lbl">The Vision (Description)</label>
                <textarea
                  [(ngModel)]="formData.description"
                  name="description"
                  placeholder="Detail the unique journey for your participants..."
                  class="field-input h-32"
                  required
                ></textarea>
              </div>
            </div>

            <!-- Section: Logistics -->
            <div class="form-section">
              <h2 class="section-tag">Logistics</h2>
              
              <div class="grid-fields">
                <div class="field-item">
                  <label class="field-lbl">Category Sphere</label>
                  <select [(ngModel)]="formData.category" name="category" class="field-select" required>
                    <option value="" disabled selected>Select Sphere</option>
                    <option *ngFor="let cat of categories" [value]="cat.id">{{ cat.name }}</option>
                  </select>
                </div>

                <div class="field-item">
                  <label class="field-lbl">Participant Cap</label>
                  <input
                    type="number"
                    [(ngModel)]="formData.max_participants"
                    name="max_participants"
                    class="field-input"
                    min="1"
                    required
                  >
                </div>
              </div>

              <div class="grid-fields">
                <div class="field-item">
                  <label class="field-lbl">Commencement</label>
                  <input type="datetime-local" [(ngModel)]="formData.date" name="date" class="field-input" required>
                </div>
                <div class="field-item">
                  <label class="field-lbl">Entry Fee ($)</label>
                  <input type="number" [(ngModel)]="formData.price" name="price" class="field-input" step="0.01" min="0">
                </div>
              </div>
            </div>

            <!-- Section: Venue -->
            <div class="form-section">
              <h2 class="section-tag">Venue</h2>
              
              <div class="field-item">
                <label class="field-lbl">Venue Name</label>
                <input type="text" [(ngModel)]="formData.location" name="location" placeholder="MetLife Stadium / Digital Realm" class="field-input" required>
              </div>

              <div class="field-item">
                <label class="field-lbl">Physical Coordinates (Address)</label>
                <input type="text" [(ngModel)]="formData.address" name="address" placeholder="123 Avenue of Stars..." class="field-input">
              </div>

              <div class="toggle-box glass-subtle">
                <div class="toggle-info">
                  <span class="t-title">Synchronous Virtual Access</span>
                  <span class="t-sub">Enable real-time remote attendance</span>
                </div>
                <input type="checkbox" [(ngModel)]="formData.is_online" name="is_online" class="premium-toggle">
              </div>

              @if (formData.is_online) {
                <div class="field-item animate-fade-in mt-4">
                  <label class="field-lbl">Stream / Meeting Access Link</label>
                  <input type="url" [(ngModel)]="formData.online_link" name="online_link" placeholder="https://zoom.us/j/..." class="field-input">
                </div>
              }
            </div>

            <!-- Feedback -->
            @if (error) { <div class="alert-box-error animate-fade-in">{{ error }}</div> }
            @if (success) { <div class="alert-box-success animate-fade-in">{{ success }}</div> }

            <!-- Submit -->
            <footer class="form-footer">
              <button type="submit" class="btn-primary-glow" [disabled]="submitting">
                {{ submitting ? 'Processing...' : (editMode ? 'Refine Experience' : 'Launch Experience') }}
              </button>
              <button type="button" routerLink="/events" class="btn-cancel">Abort</button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .form-page { min-height: 100vh; background: var(--background); padding-top: 8rem; padding-bottom: 5rem; }
    .form-layout { max-width: 800px !important; margin: 0 auto; }

    .page-header { text-align: center; margin-bottom: 3.5rem; }
    .page-title { font-size: 2.5rem; font-weight: 800; color: white; letter-spacing: -0.02em; }
    .accent-glow { color: var(--primary); text-shadow: 0 0 20px rgba(56, 189, 248, 0.3); }
    .page-subtitle { color: var(--muted-foreground); margin-top: 0.5rem; }

    .form-matte-card { padding: 3.5rem; border-radius: 2.5rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); }
    .premier-form { display: flex; flex-direction: column; gap: 3rem; }

    .form-section { display: flex; flex-direction: column; gap: 1.5rem; }
    .section-tag { font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.15em; opacity: 0.6; }

    .field-item { display: flex; flex-direction: column; gap: 0.625rem; }
    .field-lbl { font-size: 0.8125rem; font-weight: 700; color: var(--muted-foreground); margin-left: 0.25rem; }
    
    .field-input, .field-select {
      background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border);
      border-radius: 1rem; padding: 1rem 1.25rem; color: white; font-size: 0.9375rem; transition: all 0.2s;
    }
    .field-input:focus, .field-select:focus { outline: none; border-color: var(--primary); background: rgba(255,255,255,0.05); box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1); }
    .h-32 { height: 7rem; resize: none; }

    .grid-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    @media (max-width: 640px) { .grid-fields { grid-template-columns: 1fr; } }

    .toggle-box { display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-radius: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); }
    .t-title { display: block; font-weight: 700; font-size: 0.9375rem; color: white; }
    .t-sub { font-size: 0.75rem; color: var(--muted-foreground); }
    
    .btn-primary-glow {
      padding: 1.125rem 2.5rem; background: var(--primary); color: white; border-radius: 1.25rem;
      font-weight: 800; font-size: 1rem; cursor: pointer; transition: all 0.2s;
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.2);
    }
    .btn-primary-glow:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(56, 189, 248, 0.3); }

    .btn-cancel { padding: 1.125rem 2rem; background: transparent; color: var(--muted-foreground); font-weight: 700; }
    .btn-cancel:hover { color: white; }

    .alert-box-error { padding: 1rem; background: rgba(244, 63, 94, 0.1); border-left: 4px solid #f43f5e; color: #f43f5e; font-size: 0.875rem; font-weight: 600; border-radius: 0.75rem; }
    .alert-box-success { padding: 1rem; background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; color: #22c55e; font-size: 0.875rem; font-weight: 600; border-radius: 0.75rem; }

    .form-footer { display: flex; gap: 1.5rem; padding-top: 2rem; border-top: 1px solid var(--border); }
  `]
})
export class EventFormComponent implements OnInit {
  formData = {
    title: '',
    description: '',
    category: '',
    date: '',
    end_date: '',
    location: '',
    address: '',
    price: 0,
    max_participants: 100,
    is_online: false,
    online_link: ''
  };

  categories: Category[] = [];
  editMode = false;
  submitting = false;
  error = '';
  success = '';
  eventId: number | null = null;

  constructor(
    private eventService: EventService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.checkEditMode();
  }

  loadCategories(): void {
    this.eventService.getCategories().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error: (err) => {
        console.error('Failed to load categories:', err);
        this.error = 'Failed to load categories';
      }
    });
  }

  checkEditMode(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editMode = true;
      this.eventId = Number(id);
      this.loadEvent();
    }
  }

  loadEvent(): void {
    if (!this.eventId) return;

    this.eventService.getEvent(this.eventId).subscribe({
      next: (event) => {
        this.formData = {
          title: event.title,
          description: event.description,
          category: event.category.id.toString(),
          date: event.date,
          end_date: event.end_date || '',
          location: event.location,
          address: event.address,
          price: parseFloat(event.price),
          max_participants: event.max_participants,
          is_online: event.is_online,
          online_link: event.online_link
        };
      },
      error: (err) => {
        console.error('Failed to load event:', err);
        this.error = 'Failed to load event';
      }
    });
  }

  onSubmit(): void {
    this.error = '';
    this.success = '';

    if (!this.validateForm()) {
      return;
    }

    this.submitting = true;

    const payload = {
      ...this.formData,
      category_id: Number(this.formData.category)
    };

    const request = this.editMode && this.eventId
      ? this.eventService.updateEvent(this.eventId, payload)
      : this.eventService.createEvent(payload);

    request.subscribe({
      next: (event) => {
        this.success = this.editMode ? 'Event updated successfully!' : 'Event created successfully!';
        this.submitting = false;
        setTimeout(() => {
          this.router.navigate(['/events', event.id]);
        }, 1000);
      },
      error: (err) => {
        console.error('Submission failed:', err);
        this.error = err.error?.detail || 'Failed to save event. Please try again.';
        this.submitting = false;
      }
    });
  }

  validateForm(): boolean {
    if (!this.formData.title.trim()) {
      this.error = 'Event title is required';
      return false;
    }

    if (!this.formData.description.trim()) {
      this.error = 'Description is required';
      return false;
    }

    if (!this.formData.category) {
      this.error = 'Please select a category';
      return false;
    }

    if (!this.formData.date) {
      this.error = 'Event date is required';
      return false;
    }

    if (!this.formData.location.trim()) {
      this.error = 'Location is required';
      return false;
    }

    if (this.formData.max_participants < 1) {
      this.error = 'Max participants must be at least 1';
      return false;
    }

    if (this.formData.is_online && !this.formData.online_link.trim()) {
      this.error = 'Meeting link is required for online events';
      return false;
    }

    return true;
  }
}
