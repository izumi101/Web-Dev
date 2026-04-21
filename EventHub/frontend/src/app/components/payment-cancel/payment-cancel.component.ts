import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-payment-cancel',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="payment-page">
      <div class="container flex-center">
        <div class="glass result-card animate-scale-in">
          <div class="cancel-wrap animate-fade-in">
            <div class="icon-sphere error">✕</div>
            
            <h1 class="result-title">Payment <span class="text-error">Cancelled</span></h1>
            <p class="result-sub">No charges have been processed. Your reservation is currently on hold.</p>

            <div class="details-matte glass-subtle">
              <p class="instr">If you encountered a technical issue or wish to refine your selection, you may return to the experience hub or review your current registration status.</p>
            </div>

            <div class="action-stack">
              <button routerLink="/my-registrations" class="btn-primary-glow error">
                Registrations
              </button>
              <button routerLink="/events" class="btn-outline-mini">
                Browse Experiences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .payment-page { min-height: 100vh; background: var(--background); display: flex; align-items: center; justify-content: center; padding: 2rem; position: relative; overflow: hidden; }
    .payment-page::before { content: ''; position: absolute; width: 300px; height: 300px; background: #f43f5e; filter: blur(150px); opacity: 0.05; bottom: -100px; left: -100px; }
    
    .flex-center { display: flex; align-items: center; justify-content: center; width: 100%; }
    
    .result-card { 
      padding: 4rem; border-radius: 2.5rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); 
      width: 100%; max-width: 500px; text-align: center; box-shadow: 0 40px 100px rgba(0,0,0,0.5);
    }
    
    .icon-sphere { width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 2.5rem; font-size: 2.5rem; font-weight: 800; }
    .icon-sphere.error { background: rgba(244, 63, 94, 0.1); color: #f43f5e; border: 1px solid rgba(244, 63, 94, 0.2); }

    .result-title { font-size: 2.25rem; font-weight: 800; color: white; letter-spacing: -0.02em; margin-bottom: 0.75rem; }
    .result-title .text-error { color: #f43f5e; }
    .result-sub { font-size: 1rem; color: var(--muted-foreground); line-height: 1.6; max-width: 320px; margin: 0 auto 3rem; }

    .details-matte { padding: 1.5rem 2rem; border-radius: 1.5rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); margin-bottom: 3rem; text-align: left; }
    .instr { font-size: 0.875rem; color: var(--muted-foreground); line-height: 1.6; margin: 0; }

    .action-stack { display: flex; flex-direction: column; gap: 1rem; }
    .btn-primary-glow { 
      background: #f43f5e; color: white; padding: 1.125rem; border-radius: 1.25rem; 
      font-weight: 800; font-size: 1rem; cursor: pointer; transition: all 0.2s;
      box-shadow: 0 10px 25px rgba(244, 63, 94, 0.2);
    }
    .btn-primary-glow:hover { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(244, 63, 94, 0.3); }

    .btn-outline-mini { background: rgba(255,255,255,0.05); border: 1px solid var(--border); color: white; padding: 1rem; border-radius: 1.25rem; font-weight: 800; transition: all 0.2s; }
    .btn-outline-mini:hover { border-color: white; }

    @media (max-width: 640px) { .result-card { padding: 3rem 1.5rem; } .result-title { font-size: 1.75rem; } }
  `]
})
export class PaymentCancelComponent {}
