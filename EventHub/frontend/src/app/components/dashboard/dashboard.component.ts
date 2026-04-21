import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/models';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-page">
      <div class="container dashboard-layout">
        <header class="dashboard-header animate-fade-in">
          <div class="header-main">
            <h1 class="dash-title">Organizer Dashboard</h1>
            <p class="dash-subtitle">Real-time optimization and experience management</p>
          </div>
          <button class="btn-primary-glow" routerLink="/create-event">
            <span class="plus">+</span> New Experience
          </button>
        </header>

        @if (loading) {
          <div class="dash-loader">
            <div class="spinner-premium"></div>
            <p>Syncing analytics...</p>
          </div>
        } @else if (organizedEvents.length === 0) {
          <div class="dash-empty glass border-dash animate-scale-in">
            <div class="empty-ico">📊</div>
            <h2>No active experiences</h2>
            <p>Start your first event and track its success here.</p>
            <button class="btn-primary-matte" routerLink="/create-event">Create First Event</button>
          </div>
        } @else {
          <!-- Quick Stats -->
          <section class="stats-grid animate-slide-up">
            <div class="stat-matte glass shadow-lg">
              <div class="stat-ico">🏷️</div>
              <div class="stat-info">
                <span class="stat-lbl">Active Events</span>
                <h3 class="stat-val">{{ organizedEvents.length }}</h3>
              </div>
            </div>
            <div class="stat-matte glass shadow-lg">
              <div class="stat-ico">🎫</div>
              <div class="stat-info">
                <span class="stat-lbl">Total Bookings</span>
                <h3 class="stat-val">{{ totalTicketsSold }}</h3>
              </div>
            </div>
          </section>

          <!-- Events Listing -->
          <div class="dash-content-area">
            <header class="section-head">
              <h2 class="section-title">Your Live Experiences</h2>
            </header>

            <div class="admin-event-stack">
              @for (event of organizedEvents; track event.id) {
                <div class="admin-row glass animate-fade-in shadow-sm">
                  <div class="row-info">
                    <h3 class="row-title">{{ event.title }}</h3>
                    <div class="row-meta">
                      <span class="tag-meta">📅 {{ event.date | date:'MMM d, y' }}</span>
                      <span class="tag-meta">📍 {{ event.location }}</span>
                    </div>
                  </div>

                  <div class="row-metric">
                    @if (eventStats[event.id]) {
                      <div class="progress-stack">
                        <div class="prog-labels">
                          <span>Attendance Rate</span>
                          <span class="pct">{{ eventStats[event.id].check_in_rate }}%</span>
                        </div>
                        <div class="prog-bg">
                          <div class="prog-fill" [style.width.%]="eventStats[event.id].check_in_rate"></div>
                        </div>
                        <p class="prog-counts">{{ eventStats[event.id].checked_in }} / {{ eventStats[event.id].total_registrations }} Checked In</p>
                      </div>
                    }
                  </div>

                  <div class="row-actions">
                    <button class="btn-manage-mini" [routerLink]="['/organizer/events', event.id, 'attendees']">
                      Attendees
                    </button>
                    <button class="btn-outline-mini" [routerLink]="['/events', event.id]">
                      Preview
                    </button>
                  </div>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .dashboard-page { min-height: 100vh; background: var(--background); padding-top: 8rem; padding-bottom: 5rem; }
    .dashboard-layout { max-width: 1200px !important; margin: 0 auto; }

    .dashboard-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 4rem; }
    .dash-title { font-size: 2.5rem; font-weight: 800; color: white; letter-spacing: -0.02em; }
    .dash-subtitle { font-size: 1rem; color: var(--muted-foreground); margin-top: 0.5rem; }

    .btn-primary-glow { 
      background: var(--primary); color: white; padding: 1rem 2rem; border-radius: 1.25rem; 
      font-weight: 800; display: flex; align-items: center; gap: 0.75rem; transition: all 0.2s;
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.2);
    }
    .btn-primary-glow:hover { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(56, 189, 248, 0.3); }

    /* Stats */
    .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 2rem; margin-bottom: 4rem; }
    .stat-matte { padding: 2rem; border-radius: 1.5rem; background: rgba(255,255,255,0.02); display: flex; align-items: center; gap: 1.5rem; position: relative; }
    .stat-ico { width: 56px; height: 56px; background: rgba(255,255,255,0.03); border-radius: 1rem; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
    .stat-lbl { font-size: 0.75rem; font-weight: 700; color: var(--muted-foreground); text-transform: uppercase; letter-spacing: 0.05em; }
    .stat-val { font-size: 2.25rem; font-weight: 900; color: white; margin-top: 0.25rem; line-height: 1; }
    .stat-growth { position: absolute; top: 1.5rem; right: 1.5rem; font-size: 0.75rem; font-weight: 800; color: #22c55e; background: rgba(34,197,94,0.1); padding: 0.25rem 0.625rem; border-radius: 50px; }

    /* Event Stack */
    .section-head { margin-bottom: 2rem; }
    .section-title { font-size: 1.25rem; font-weight: 800; color: white; }
    
    .admin-event-stack { display: flex; flex-direction: column; gap: 1rem; }
    .admin-row { 
      background: rgba(255,255,255,0.02); border: 1px solid var(--border); padding: 1.5rem 2rem; border-radius: 1.25rem;
      display: grid; grid-template-columns: 1fr; gap: 2rem; align-items: center;
    }
    @media (min-width: 1024px) { .admin-row { grid-template-columns: 2fr 1.5fr 1fr; } }

    .row-title { font-size: 1.125rem; font-weight: 700; color: white; margin-bottom: 0.5rem; }
    .row-meta { display: flex; gap: 1.5rem; }
    .tag-meta { font-size: 0.8125rem; color: var(--muted-foreground); font-weight: 500; }

    .progress-stack { width: 100%; }
    .prog-labels { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; color: var(--muted-foreground); margin-bottom: 0.75rem; }
    .prog-labels .pct { color: var(--primary); }
    .prog-bg { width: 100%; height: 6px; background: rgba(255,255,255,0.05); border-radius: 50px; overflow: hidden; margin-bottom: 0.75rem; }
    .prog-fill { height: 100%; background: var(--primary); border-radius: 50px; }
    .prog-counts { font-size: 0.6875rem; font-weight: 600; color: var(--muted-foreground); opacity: 0.6; }

    .row-actions { display: flex; gap: 0.75rem; justify-content: flex-end; }
    .btn-manage-mini { background: var(--primary); color: white; padding: 0.625rem 1.25rem; border-radius: 0.75rem; font-weight: 700; font-size: 0.8125rem; }
    .btn-outline-mini { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: white; padding: 0.625rem 1.25rem; border-radius: 0.75rem; font-weight: 700; font-size: 0.8125rem; }

    .dash-loader { text-align: center; padding: 10rem 0; color: var(--muted-foreground); }
    .spinner-premium { width: 32px; height: 32px; border: 2px solid rgba(56,189,248,0.1); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1.5rem; }

    .dash-empty { text-align: center; padding: 5rem 2rem; border-radius: 2rem; border: 1px dashed var(--border); }
    .empty-ico { font-size: 3rem; opacity: 0.1; margin-bottom: 1.5rem; display: block; }
    .dash-empty h2 { font-size: 1.75rem; font-weight: 800; color: white; margin-bottom: 0.5rem; }
    .dash-empty p { color: var(--muted-foreground); margin-bottom: 2rem; }
    .btn-primary-matte { background: var(--primary); color: white; padding: 0.875rem 2rem; border-radius: 1rem; font-weight: 800; }

    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class DashboardComponent implements OnInit {
  organizedEvents: Event[] = [];
  eventStats: { [id: number]: any } = {};
  totalTicketsSold = 0;
  loading = true;

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.eventService.getMyEvents().subscribe({
      next: (res) => {
        this.organizedEvents = res.results || (res as any);
        this.loadStats();
      },
      error: (err) => {
        console.error('Failed to load organized events', err);
        this.loading = false;
      }
    });
  }

  loadStats(): void {
    if (this.organizedEvents.length === 0) {
      this.loading = false;
      return;
    }

    const statsObs = this.organizedEvents.map(e => this.eventService.getEventStats(e.id));
    
    forkJoin(statsObs).subscribe({
      next: (statsList) => {
        statsList.forEach((s, index) => {
          const eventId = this.organizedEvents[index].id;
          this.eventStats[eventId] = s;
          this.totalTicketsSold += s.total_registrations;
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load stats', err);
        this.loading = false;
      }
    });
  }
}
