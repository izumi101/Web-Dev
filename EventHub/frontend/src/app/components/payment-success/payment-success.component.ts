import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-success',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="payment-page">
      <div class="container flex-center">
        <div class="glass result-card animate-scale-in" [class.is-error]="error">
          
          @if (loading) {
            <div class="loader-wrap">
              <div class="spinner-premium"></div>
              <p class="loader-text">Finalizing your reservation...</p>
            </div>
          } @else if (paymentData) {
            <div class="success-wrap animate-fade-in">
              <div class="icon-sphere">
                <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                  <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/>
                  <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                </svg>
              </div>
              
              <h1 class="result-title">Reservation <span class="accent">Confirmed</span></h1>
              <p class="result-sub">Secure your digital entry. We've synchronized your registration.</p>

              <div class="details-matte glass-subtle">
                <div class="d-row">
                  <span class="d-lab">Experience</span>
                  <span class="d-val text-glow">{{ paymentData.event_title }}</span>
                </div>
                <div class="d-row">
                  <span class="d-lab">Contribution</span>
                  <span class="d-val">$ {{ paymentData.amount }}</span>
                </div>
                <div class="d-row">
                  <span class="d-lab">Status</span>
                  <span class="d-badge" [class.badge-done]="paymentData.status === 'completed'">
                    {{ paymentData.status | titlecase }}
                  </span>
                </div>
              </div>

              <div class="action-stack">
                <button routerLink="/my-registrations" class="btn-primary-glow">
                  Access My Tickets
                </button>
                <button routerLink="/" class="btn-outline-mini">
                  Return to Hub
                </button>
              </div>

              <p class="footer-hint">A digital receipt has been transmitted to your secure inbox.</p>
            </div>
          } @else {
            <div class="error-wrap animate-fade-in">
              <div class="icon-sphere error">✕</div>
              <h1 class="result-title">System <span class="text-error">Mismatch</span></h1>
              <p class="result-sub">{{ error || 'We encountered a synchronization error while verifying your payment.' }}</p>

              <div class="action-stack">
                <button routerLink="/my-registrations" class="btn-primary-glow error">
                  Review Registrations
                </button>
                <button routerLink="/" class="btn-outline-mini">
                  Return Home
                </button>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-page { min-height: 100vh; background: var(--background); display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden; }
    .payment-page::before { content: ''; position: absolute; width: 300px; height: 300px; background: var(--primary); filter: blur(150px); opacity: 0.1; top: -100px; right: -100px; }
    
    .flex-center { display: flex; align-items: center; justify-content: center; width: 100%; }
    
    .result-card { 
      padding: 4rem; border-radius: 2.5rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); 
      width: 100%; max-width: 520px; text-align: center; box-shadow: 0 40px 100px rgba(0,0,0,0.5);
    }
    
    .icon-sphere { width: 100px; height: 100px; background: rgba(255,255,255,0.03); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2.5rem; font-size: 2.5rem; font-weight: 800; }
    .icon-sphere.error { background: rgba(244, 63, 94, 0.1); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.2); }

    .result-title { font-size: 2.25rem; font-weight: 800; color: white; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
    .result-title .accent { color: var(--primary); text-shadow: 0 0 20px rgba(56, 189, 248, 0.3); }
    .result-title .text-error { color: #f43f5e; }
    .result-sub { font-size: 1rem; color: var(--muted-foreground); line-height: 1.6; max-width: 320px; margin: 0 auto 3rem; }

    .details-matte { padding: 1.5rem 2rem; border-radius: 1.5rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); margin-bottom: 3rem; text-align: left; }
    .d-row { display: flex; justify-content: space-between; align-items: center; padding: 1rem 0; border-bottom: 1px solid var(--border); }
    .d-row:last-child { border-bottom: none; }
    .d-lab { font-size: 0.75rem; font-weight: 800; color: var(--muted-foreground); text-transform: uppercase; letter-spacing: 0.05em; }
    .d-val { font-size: 0.9375rem; font-weight: 700; color: white; }
    .text-glow { color: var(--primary); }

    .d-badge { padding: 0.375rem 0.875rem; border-radius: 50px; font-size: 0.6875rem; font-weight: 800; text-transform: uppercase; background: rgba(255,255,255,0.05); color: var(--muted-foreground); }
    .badge-done { background: rgba(34, 197, 94, 0.1); border: 1px solid rgba(34, 197, 94, 0.2); color: #22c55e; }

    .action-stack { display: flex; flex-direction: column; gap: 1rem; margin-bottom: 2rem; }
    .btn-primary-glow { 
      background: var(--primary); color: white; padding: 1.125rem; border-radius: 1.25rem; 
      font-weight: 800; font-size: 1rem; cursor: pointer; transition: all 0.2s;
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.2);
    }
    .btn-primary-glow.error { background: #f43f5e; box-shadow: 0 10px 25px rgba(244, 63, 94, 0.2); }
    .btn-primary-glow:hover { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(56, 189, 248, 0.3); }

    .btn-outline-mini { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: white; padding: 1rem; border-radius: 1.25rem; font-weight: 800; transition: all 0.2s; }
    .btn-outline-mini:hover { border-color: white; }

    .footer-hint { font-size: 0.75rem; color: var(--muted-foreground); opacity: 0.5; }

    /* Checkmark */
    .checkmark { width: 64px; height: 64px; border-radius: 50%; display: block; stroke-width: 3; stroke: #fff; stroke-miterlimit: 10; box-shadow: inset 0px 0px 0px var(--primary); animation: fill .4s ease-in-out .4s forwards, scale .3s ease-in-out .9s both; }
    .checkmark__circle { stroke-dasharray: 166; stroke-dashoffset: 166; stroke-width: 3; stroke-miterlimit: 10; stroke: var(--primary); fill: none; animation: stroke .6s cubic-bezier(0.65, 0, 0.45, 1) forwards; }
    .checkmark__check { transform-origin: 50% 50%; stroke-dasharray: 48; stroke-dashoffset: 48; animation: stroke .3s cubic-bezier(0.65, 0, 0.45, 1) .8s forwards; }

    .spinner-premium { width: 40px; height: 40px; border: 2px solid rgba(56, 189, 248, 0.1); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1.5rem; }
    .loader-text { color: var(--muted-foreground); font-weight: 600; }

    @keyframes stroke { 100% { stroke-dashoffset: 0; } }
    @keyframes scale { 0%, 100% { transform: none; } 50% { transform: scale3d(1.1, 1.1, 1); } }
    @keyframes fill { 100% { box-shadow: inset 0px 0px 0px 32px var(--primary); } }
    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 640px) { .result-card { padding: 3rem 1.5rem; } .result-title { font-size: 1.75rem; } }
  `]
})
export class PaymentSuccessComponent implements OnInit {
  loading = true;
  paymentData: any = null;
  error = '';

  constructor(
    private paymentService: PaymentService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.verifyPayment();
  }

  verifyPayment(): void {
    this.route.queryParams.subscribe(params => {
      const sessionId = params['session_id'];

      if (!sessionId) {
        this.loading = false;
        this.error = 'No payment session found';
        return;
      }

      this.paymentService.verifyPayment(sessionId).subscribe({
        next: (data) => {
          this.paymentData = data;
          this.loading = false;
        },
        error: (err) => {
          console.error('Payment verification failed:', err);
          this.error = err.error?.detail || 'Failed to verify payment. Please contact support.';
          this.loading = false;
        }
      });
    });
  }
}
