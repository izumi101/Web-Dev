import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';
import { EventCardComponent } from '../event-card/event-card.component';
import { Event } from '../../models/models';

@Component({
  selector: 'app-my-events',
  standalone: true,
  imports: [CommonModule, RouterModule, EventCardComponent],
  template: `
    <div class="manage-page">
      <div class="container manage-container">
        <header class="manage-header animate-fade-in">
          <div class="header-content">
            <h1 class="manage-title">My Managed <span class="accent">Experiences</span></h1>
            <p class="manage-sub">Complete control over your unique events and communities</p>
          </div>
          <button routerLink="/create-event" class="btn-create-glow">
            <span>+</span> Orchestrate New
          </button>
        </header>

        @if (loading) {
          <div class="manage-loader">
            <div class="spinner-premium"></div>
            <p>Gathering your universe...</p>
          </div>
        } @else if (events.length === 0) {
          <div class="manage-empty glass border-dash animate-scale-in">
            <div class="empty-ico">🌌</div>
            <h2>Your stage is quiet</h2>
            <p>The world is waiting for your next great experience.</p>
            <button routerLink="/create-event" class="btn-primary-matte">Launch Your First Experience</button>
          </div>
        } @else {
          <div class="manage-grid">
            <div class="manage-card-box animate-slide-up" *ngFor="let event of events; let i = index" [style.animation-delay]="i * 0.05 + 's'">
              <app-event-card [event]="event"></app-event-card>
              
              <div class="manage-overlay glass shadow-lg">
                <button
                  [routerLink]="['/edit-event', event.id]"
                  class="btn-mini-action btn-edit"
                  title="Refine Event"
                >
                  Refine
                </button>
                <button
                  (click)="deleteEvent(event.id, event.title)"
                  class="btn-mini-action btn-delete"
                  title="Dissolve Event"
                >
                  Dissolve
                </button>
              </div>
            </div>
          </div>
        }

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
    .manage-page { min-height: 100vh; background: var(--background); padding-top: 8rem; padding-bottom: 5rem; }
    .manage-container { max-width: 1200px !important; margin: 0 auto; }

    .manage-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4rem; }
    .manage-title { font-size: 2.5rem; font-weight: 800; color: white; letter-spacing: -0.02em; }
    .manage-title .accent { color: var(--primary); }
    .manage-sub { font-size: 1rem; color: var(--muted-foreground); margin-top: 0.5rem; }

    .btn-create-glow { 
      background: var(--primary); color: white; padding: 1rem 2rem; border-radius: 1.25rem; 
      font-weight: 800; display: flex; align-items: center; gap: 0.75rem; transition: all 0.2s;
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.2);
    }
    .btn-create-glow:hover { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(56, 189, 248, 0.3); }

    /* Grid & Cards */
    .manage-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 3rem; }
    .manage-card-box { position: relative; }
    
    .manage-overlay {
      position: absolute; bottom: 1.5rem; left: 1.5rem; right: 1.5rem;
      padding: 1rem; border-radius: 1rem; background: rgba(15, 17, 21, 0.8);
      display: flex; gap: 0.75rem; transform: translateY(10px); opacity: 0; transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .manage-card-box:hover .manage-overlay { transform: translateY(0); opacity: 1; }

    .btn-mini-action { flex: 1; padding: 0.625rem; border-radius: 0.75rem; font-size: 0.75rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.05em; transition: all 0.2s; }
    .btn-edit { background: var(--primary); color: white; }
    .btn-delete { background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.2); color: #f43f5e; }
    .btn-delete:hover { background: #f43f5e; color: white; }

    /* States */
    .manage-loader { text-align: center; padding: 10rem 0; color: var(--muted-foreground); }
    .spinner-premium { width: 32px; height: 32px; border: 2px solid rgba(56,189,248,0.1); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1.5rem; }

    .manage-empty { text-align: center; padding: 5rem 2rem; border-radius: 2rem; border: 1px dashed var(--border); }
    .empty-ico { font-size: 3.5rem; opacity: 0.2; margin-bottom: 1.5rem; display: block; }
    .manage-empty h2 { font-size: 1.75rem; font-weight: 800; color: white; margin-bottom: 0.5rem; }
    .manage-empty p { color: var(--muted-foreground); margin-bottom: 2rem; }
    .btn-primary-matte { background: var(--primary); color: white; padding: 1rem 2.5rem; border-radius: 1.25rem; font-weight: 800; }

    .error-toast { position: fixed; bottom: 2rem; left: 0; right: 0; display: flex; justify-content: center; z-index: 100; }
    .toast-content { background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.2); padding: 0.75rem 1.5rem; border-radius: 50px; display: flex; align-items: center; gap: 0.75rem; color: #f43f5e; font-weight: 600; }

    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class MyEventsComponent implements OnInit {
  events: Event[] = [];
  loading = false;
  error = '';

  constructor(
    private eventService: EventService,
    private modalService: ModalService,
    private toastService: ToastService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMyEvents();
  }

  loadMyEvents(): void {
    this.loading = true;

    this.eventService.getMyEvents().subscribe({
      next: (response) => {
        this.events = response.results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load events:', err);
        this.toastService.error('Failed to load your events');
        this.loading = false;
      }
    });
  }

  async deleteEvent(eventId: number, eventTitle: string): Promise<void> {
    const confirmed = await this.modalService.open({
      title: 'Delete Event',
      message: `Are you sure you want to delete "${eventTitle}"? This action cannot be undone and all registrations will be cancelled.`,
      confirmText: 'Delete Event',
      cancelText: 'Keep Event',
      isDestructive: true
    });

    if (!confirmed) return;

    this.eventService.deleteEvent(eventId).subscribe({
      next: () => {
        this.events = this.events.filter(e => e.id !== eventId);
        this.toastService.success('Event deleted successfully');
      },
      error: (err) => {
        console.error('Failed to delete event:', err);
        this.toastService.error('Failed to delete event');
      }
    });
  }
}
