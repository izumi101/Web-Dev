import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-validate-ticket',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="validate-page mesh-gradient min-h-screen">
      <div class="container flex items-center justify-center pt-20 pb-20">
        @if (loading) {
          <div class="glass validation-card loading animate-fade-in">
            <div class="premium-spinner"></div>
            <h2 class="loading-text">Securing Entry...</h2>
            <p class="sub-text">Verifying ticket authenticity</p>
          </div>
        } @else {
          <div class="glass validation-card animate-scale-in" 
               [class.success]="status === 'success'" 
               [class.error]="status === 'error'" 
               [class.used]="status === 'used'">
            
            <!-- Result Icon Section -->
            <div class="result-header">
              @if (status === 'success') {
                <div class="success-icon-wrapper">
                  <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                    <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                    <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                  </svg>
                </div>
                <h1 class="status-title">Access <span class="text-green">Granted</span></h1>
              } @else if (status === 'used') {
                <div class="warning-icon-wrapper">
                  <span class="warning-symbol">⚠️</span>
                </div>
                <h1 class="status-title">Duplicate <span class="text-orange">Entry</span></h1>
              } @else {
                <div class="error-icon-wrapper">
                  <span class="error-symbol">✕</span>
                </div>
                <h1 class="status-title">Entry <span class="text-red">Denied</span></h1>
              }
            </div>

            <div class="ticket-details glass-subtle" *ngIf="status !== 'error'">
              <div class="detail-row">
                <span class="detail-label">ATTENDEE</span>
                <span class="detail-value">{{ result?.attendee }}</span>
              </div>
              <div class="detail-row">
                <span class="detail-label">EXPERIENCE</span>
                <span class="detail-value text-primary">{{ result?.event }}</span>
              </div>
              <div class="detail-row" *ngIf="status === 'used'">
                <span class="detail-label">FIRST SCANNED</span>
                <span class="detail-value">{{ result?.checked_in_at | date:'shortTime' }}</span>
              </div>
            </div>

            <div class="error-box glass-subtle" *ngIf="status === 'error'">
              <p>{{ errorMessage || 'This ticket signature is invalid or you lack scanning permissions.' }}</p>
            </div>

            <div class="actions-group">
              <button class="btn-primary w-full" (click)="recheck()">
                {{ status === 'error' ? 'Retry Scan' : 'Next Ticket' }}
              </button>
              <button class="btn-secondary w-full mt-3" routerLink="/">Return to Terminal</button>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styles: [`
    .validate-page {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .validation-card {
      padding: 3.5rem;
      border-radius: 40px;
      width: 100%;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 30px 60px rgba(0,0,0,0.4);
    }

    .loading-text { font-size: 1.5rem; font-weight: 800; margin-bottom: 0.5rem; }
    .sub-text { color: var(--muted-foreground); font-size: 0.9rem; }

    .result-header { margin-bottom: 2.5rem; }
    
    .status-title {
      font-size: 2.25rem;
      font-weight: 800;
      margin-top: 1.5rem;
      letter-spacing: -0.02em;
    }

    .text-green { color: var(--neon-green); }
    .text-orange { color: var(--neon-orange); }
    .text-red { color: #ff7675; }
    .text-primary { color: var(--primary); }

    /* Icons */
    .success-icon-wrapper, .warning-icon-wrapper, .error-icon-wrapper {
      width: 120px;
      height: 120px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
    }

    .warning-icon-wrapper { background: rgba(251, 146, 60, 0.1); border: 1px solid rgba(251, 146, 60, 0.2); }
    .warning-symbol { font-size: 3.5rem; }
    
    .error-icon-wrapper { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #ff7675; }
    .error-symbol { font-size: 3.5rem; font-weight: 300; }

    /* Checkmark Animation */
    .checkmark {
      width: 90px; height: 90px;
      border-radius: 50%;
      display: block;
      stroke-width: 3;
      stroke: #fff;
      stroke-miterlimit: 10;
      box-shadow: inset 0px 0px 0px var(--neon-green);
      animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both;
    }
    .checkmark__circle {
      stroke-dasharray: 166; stroke-dashoffset: 166;
      stroke-width: 3; stroke-miterlimit: 10;
      stroke: var(--neon-green);
      fill: none;
      animation: stroke .6s cubic-bezier(0.650, 0.000, 0.450, 1.000) forwards;
    }
    .checkmark__check {
      transform-origin: 50% 50%;
      stroke-dasharray: 48; stroke-dashoffset: 48;
      animation: stroke .3s cubic-bezier(0.650, 0.000, 0.450, 1.000) .8s forwards;
    }

    @keyframes stroke { 100% { stroke-dashoffset: 0; } }
    @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
    @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 45px var(--neon-green); } }

    /* Details Area */
    .ticket-details {
      padding: 1.5rem;
      border-radius: 24px;
      margin-bottom: 2.5rem;
      text-align: left;
    }

    .detail-row { margin-bottom: 1.25rem; }
    .detail-row:last-child { margin-bottom: 0; }
    .detail-label { display: block; font-size: 0.65rem; font-weight: 700; color: var(--muted-foreground); letter-spacing: 0.1em; margin-bottom: 0.25rem; }
    .detail-value { font-weight: 700; font-size: 1.1rem; color: var(--foreground); }

    .error-box { padding: 1.5rem; border-radius: 20px; color: #ff7675; margin-bottom: 2.5rem; border: 1px solid rgba(239, 68, 68, 0.2); }

    .actions-group { margin-top: 1rem; }

    .premium-spinner { width: 60px; height: 60px; border: 3px solid rgba(56, 189, 248, 0.1); border-top-color: var(--primary); border-radius: 50%; animation: spin 1s infinite linear; margin: 0 auto 1.5rem; }
    @keyframes spin { 100% { transform: rotate(360deg); } }

    .w-full { width: 100%; }
    .mt-3 { margin-top: 0.75rem; }

    @media (max-width: 640px) {
      .validation-card { padding: 2rem; border-radius: 24px; }
      .status-title { font-size: 1.75rem; }
    }
  `]
})
export class ValidateTicketComponent implements OnInit {
  loading = true;
  status: 'success' | 'error' | 'used' = 'error';
  result: any;
  errorMessage = '';
  uuid: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService
  ) {}

  ngOnInit(): void {
    this.uuid = this.route.snapshot.paramMap.get('uuid');
    this.recheck();
  }

  recheck(): void {
    if (!this.uuid) {
      this.status = 'error';
      this.loading = false;
      return;
    }

    this.loading = true;
    this.eventService.checkIn(this.uuid).subscribe({
      next: (res) => {
        this.status = res.status; // success or used
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        this.status = 'error';
        this.errorMessage = err.error?.error || 'Validation failed. Check your connection or permissions.';
        this.loading = false;
      }
    });
  }
}
