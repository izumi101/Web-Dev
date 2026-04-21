import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ToastService } from '../../services/toast.service';
import { Registration, Event } from '../../models/models';

@Component({
  selector: 'app-attendee-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="attendee-page">
      <div class="container attendee-layout">
        <nav class="breadcrumb-glass animate-fade-in">
          <a routerLink="/organizer/dashboard" class="b-link">Dashboard</a>
          <span class="sep">/</span>
          <span class="curr">{{ event?.title || 'Experience' }}</span>
          <span class="sep">/</span>
          <span class="curr">Participants</span>
        </nav>

        <header class="attendee-header animate-fade-in">
          <div class="h-left">
            <h1 class="page-title">Experience <span class="accent-glow">Management</span></h1>
            <p class="event-meta" *ngIf="event">{{ event.title }} — {{ event.date | date:'MMM d, y' }}</p>
          </div>
          
          <div class="h-stats glass shadow-lg" *ngIf="stats">
            <div class="h-stat-item">
              <span class="val">{{ stats.checked_in }}</span>
              <span class="lbl">Presence</span>
            </div>
            <div class="h-stat-sep"></div>
            <div class="h-stat-item">
              <span class="val">{{ stats.total_registrations }}</span>
              <span class="lbl">Reserved</span>
            </div>
          </div>
        </header>

        <!-- Actions Bar -->
        <section class="actions-matte glass animate-slide-up">
          <div class="search-wrap">
            <span class="search-ico">🔍</span>
            <input type="text" placeholder="Locate participant..." (input)="onSearch($event)" class="search-fld">
          </div>
        </section>

        <!-- Data Table -->
        <main class="table-container glass shadow-2xl animate-fade-in">
          <table class="premium-table">
            <thead>
              <tr>
                <th>Participant</th>
                <th>Status</th>
                <th>Registration</th>
                <th>Validation</th>
              </tr>
            </thead>
            <tbody>
              @if (loading) {
                <tr><td colspan="4" class="t-state"><div class="spinner-premium"></div> Syncing data...</td></tr>
              } @else if (filteredRegistrations.length === 0) {
                <tr><td colspan="4" class="t-state">No participants matches your query.</td></tr>
              } @else {
                @for (reg of filteredRegistrations; track reg.id) {
                  <tr [class.is-valid]="reg.is_checked_in" class="t-row">
                    <td>
                      <div class="p-identity">
                        <div class="p-avatar">{{ reg.username.charAt(0).toUpperCase() }}</div>
                        <div class="p-info">
                          <span class="p-name">{{ reg.username }}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="p-badge" [class.badge-valid]="reg.is_checked_in" [class.badge-pending]="!reg.is_checked_in">
                        {{ reg.is_checked_in ? 'Validated' : 'Pending' }}
                      </span>
                    </td>
                    <td class="t-muted">{{ reg.registered_at | date:'MMM d, HH:mm' }}</td>
                    <td>
                      @if (!reg.is_checked_in) {
                        <button class="btn-checkin-mini" (click)="manualCheckIn(reg)">
                          Check In
                        </button>
                      } @else {
                        <span class="v-time">Verified at {{ reg.checked_in_at | date:'HH:mm' }}</span>
                      }
                    </td>
                  </tr>
                }
              }
            </tbody>
          </table>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .attendee-page { min-height: 100vh; background: var(--background); padding-top: 8rem; padding-bottom: 5rem; }
    .attendee-layout { max-width: 1200px !important; margin: 0 auto; }

    /* Breadcrumbs */
    .breadcrumb-glass { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 2.5rem; font-size: 0.8125rem; font-weight: 600; }
    .b-link { color: var(--muted-foreground); transition: color 0.2s; }
    .b-link:hover { color: var(--primary); }
    .sep { color: var(--border); }
    .curr { color: white; opacity: 0.8; }

    /* Header */
    .attendee-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 3.5rem; }
    .page-title { font-size: 2.5rem; font-weight: 800; color: white; letter-spacing: -0.02em; }
    .accent-glow { color: var(--primary); text-shadow: 0 0 20px rgba(56, 189, 248, 0.3); }
    .event-meta { font-size: 1rem; color: var(--muted-foreground); margin-top: 0.5rem; }

    .h-stats { display: flex; background: rgba(255,255,255,0.02); border: 1px solid var(--border); border-radius: 1.25rem; padding: 1.25rem 2.5rem; align-items: center; }
    .h-stat-item { display: flex; flex-direction: column; align-items: center; }
    .h-stat-item .val { font-size: 1.75rem; font-weight: 900; color: white; line-height: 1; }
    .h-stat-item .lbl { font-size: 0.625rem; font-weight: 800; color: var(--muted-foreground); text-transform: uppercase; letter-spacing: 0.1em; margin-top: 0.5rem; }
    .h-stat-sep { width: 1px; height: 32px; background: var(--border); margin: 0 2.5rem; }

    /* Actions Bar */
    .actions-matte { padding: 1rem 1.5rem; border-radius: 1.25rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); margin-bottom: 2rem; }
    .search-wrap { display: flex; align-items: center; gap: 1rem; max-width: 400px; }
    .search-ico { size: 1.25rem; opacity: 0.3; }
    .search-fld { background: transparent; border: none; outline: none; color: white; font-size: 0.9375rem; width: 100%; }
    .search-fld::placeholder { color: var(--muted-foreground); opacity: 0.5; }

    /* Table */
    .table-container { background: rgba(255,255,255,0.01); border: 1px solid var(--border); border-radius: 1.5rem; overflow: hidden; }
    .premium-table { width: 100%; border-collapse: collapse; }
    .premium-table th { background: rgba(255,255,255,0.02); border-bottom: 1px solid var(--border); padding: 1.25rem 2rem; text-align: left; font-size: 0.75rem; font-weight: 800; color: var(--muted-foreground); text-transform: uppercase; letter-spacing: 0.1em; }
    .premium-table td { padding: 1.5rem 2rem; border-bottom: 1px solid var(--border); vertical-align: middle; }
    
    .t-row { transition: background 0.2s; }
    .t-row:hover { background: rgba(255,255,255,0.015); }
    .t-row.is-valid { background: rgba(34, 197, 94, 0.02); }

    .p-identity { display: flex; align-items: center; gap: 1rem; }
    .p-avatar { width: 36px; height: 36px; border-radius: 12px; background: var(--primary); color: white; display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 0.8125rem; }
    .p-name { font-weight: 700; color: white; display: block; }

    .p-badge { padding: 0.375rem 0.875rem; border-radius: 50px; font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.02em; }
    .badge-valid { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); color: #22c55e; }
    .badge-pending { background: rgba(255, 255, 255, 0.05); border: 1px solid var(--border); color: var(--muted-foreground); }

    .btn-checkin-mini { 
      background: var(--primary); color: white; border: none; padding: 0.625rem 1.25rem; border-radius: 0.75rem; 
      font-weight: 800; font-size: 0.75rem; cursor: pointer; transition: all 0.2s;
    }
    .btn-checkin-mini:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(56, 189, 248, 0.2); }
    .v-time { font-size: 0.8125rem; color: var(--primary); font-weight: 700; opacity: 0.8; }

    .t-muted { color: var(--muted-foreground); font-size: 0.875rem; }
    .t-state { text-align: center; padding: 5rem !important; color: var(--muted-foreground); }
    .spinner-premium { width: 24px; height: 24px; border: 2px solid rgba(56, 189, 248, 0.1); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1rem; }

    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class AttendeeListComponent implements OnInit {
  eventId: number | null = null;
  event: Event | null = null;
  registrations: Registration[] = [];
  filteredRegistrations: Registration[] = [];
  stats: any = null;
  loading = true;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.eventId = +idParam;
      this.loadData();
    }
  }

  loadData(): void {
    if (!this.eventId) return;

    this.loading = true;
    this.eventService.getEvent(this.eventId).subscribe(e => this.event = e);
    this.eventService.getEventStats(this.eventId).subscribe(s => this.stats = s);
    this.eventService.getEventRegistrations(this.eventId).subscribe({
      next: (regs) => {
        this.registrations = regs.filter(r => r.status === 'confirmed');
        this.filteredRegistrations = [...this.registrations];
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load attendees', err);
        this.loading = false;
      }
    });
  }

  onSearch(event: any): void {
    const query = event.target.value.toLowerCase();
    this.filteredRegistrations = this.registrations.filter(r => 
      r.username.toLowerCase().includes(query)
    );
  }

  manualCheckIn(reg: Registration): void {
    if (!reg.ticket_uuid) return;
    
    this.eventService.checkIn(reg.ticket_uuid).subscribe({
      next: (res) => {
        reg.is_checked_in = true;
        reg.checked_in_at = new Date().toISOString();
        // Update stats
        if (this.stats) this.stats.checked_in++;
      },
      error: (err) => {
        this.toastService.error(err.error?.error || 'Check-in failed');
      }
    });
  }
}
