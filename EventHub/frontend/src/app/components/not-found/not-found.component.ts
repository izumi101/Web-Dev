import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LucideAngularModule, Home, ArrowLeft, Search } from 'lucide-angular';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <div class="not-found-page">
      <div class="not-found-content animate-fade-in">
        <!-- Glowing 404 -->
        <div class="error-code">
          <span class="digit">4</span>
          <span class="digit glow">0</span>
          <span class="digit">4</span>
        </div>

        <h1 class="nf-title">Page Not Found</h1>
        <p class="nf-subtitle">
          The page you're looking for doesn't exist or has been moved.
          Let's get you back on track.
        </p>

        <div class="nf-actions">
          <a routerLink="/" class="btn-primary-nf">
            <lucide-icon [img]="icons.Home" class="w-5 h-5"></lucide-icon>
            Back to Home
          </a>
          <button (click)="goBack()" class="btn-secondary-nf">
            <lucide-icon [img]="icons.ArrowLeft" class="w-5 h-5"></lucide-icon>
            Go Back
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .not-found-page {
      min-height: 100vh;
      background: var(--background);
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 2rem;
    }

    .not-found-content {
      text-align: center;
      max-width: 480px;
    }

    .error-code {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      margin-bottom: 2rem;
    }

    .digit {
      font-size: 8rem;
      font-weight: 900;
      color: var(--foreground);
      line-height: 1;
      letter-spacing: -0.05em;
      opacity: 0.15;
    }

    .digit.glow {
      color: var(--primary);
      opacity: 1;
      text-shadow: 0 0 40px rgba(56, 189, 248, 0.4);
    }

    .nf-title {
      font-size: 2rem;
      font-weight: 800;
      color: var(--foreground);
      margin-bottom: 1rem;
      letter-spacing: -0.02em;
    }

    .nf-subtitle {
      font-size: 1.0625rem;
      color: var(--muted-foreground);
      line-height: 1.7;
      margin-bottom: 2.5rem;
    }

    .nf-actions {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }

    .btn-primary-nf {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: var(--primary);
      color: white;
      border-radius: 1rem;
      font-weight: 700;
      font-size: 0.9375rem;
      transition: all 0.2s;
      text-decoration: none;
      box-shadow: 0 8px 20px rgba(56, 189, 248, 0.25);
    }
    .btn-primary-nf:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(56, 189, 248, 0.35);
    }

    .btn-secondary-nf {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.875rem 1.75rem;
      background: rgba(255,255,255,0.03);
      color: var(--foreground);
      border: 1px solid var(--border);
      border-radius: 1rem;
      font-weight: 700;
      font-size: 0.9375rem;
      cursor: pointer;
      transition: all 0.2s;
    }
    .btn-secondary-nf:hover {
      border-color: var(--primary);
      background: rgba(56, 189, 248, 0.05);
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(16px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fade-in { animation: fadeIn 0.5s ease-out; }
  `]
})
export class NotFoundComponent {
  readonly icons = { Home, ArrowLeft, Search };

  goBack(): void {
    window.history.back();
  }
}
