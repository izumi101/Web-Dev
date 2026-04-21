import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastService } from '../../../services/toast.service';
import { LucideAngularModule, CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-angular';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="toast-container" aria-live="polite" aria-atomic="true">
      @for (toast of toastService.toasts(); track toast.id) {
        <div
          class="toast-item"
          [class.toast-success]="toast.type === 'success'"
          [class.toast-error]="toast.type === 'error'"
          [class.toast-warning]="toast.type === 'warning'"
          [class.toast-info]="toast.type === 'info'"
          role="alert"
        >
          <lucide-icon
            [img]="getIcon(toast.type)"
            class="toast-icon"
          ></lucide-icon>
          <span class="toast-message">{{ toast.message }}</span>
          <button
            (click)="toastService.dismiss(toast.id)"
            class="toast-close"
            aria-label="Close notification"
          >
            <lucide-icon [img]="icons.X" class="w-3.5 h-3.5"></lucide-icon>
          </button>
        </div>
      }
    </div>
  `,
  styles: [`
    .toast-container {
      position: fixed;
      bottom: 1.5rem;
      right: 1.5rem;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
      max-width: 420px;
      pointer-events: none;
    }

    .toast-item {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem 1.25rem;
      border-radius: 1rem;
      border: 1px solid;
      backdrop-filter: blur(12px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
      animation: slideUp 0.3s ease-out;
      pointer-events: all;
    }

    .toast-success {
      background: rgba(34, 197, 94, 0.1);
      border-color: rgba(34, 197, 94, 0.25);
      color: #22C55E;
    }

    .toast-error {
      background: rgba(244, 63, 94, 0.1);
      border-color: rgba(244, 63, 94, 0.25);
      color: #F43F5E;
    }

    .toast-warning {
      background: rgba(245, 158, 11, 0.1);
      border-color: rgba(245, 158, 11, 0.25);
      color: #F59E0B;
    }

    .toast-info {
      background: rgba(56, 189, 248, 0.1);
      border-color: rgba(56, 189, 248, 0.25);
      color: #38BDF8;
    }

    .toast-icon {
      width: 1.25rem;
      height: 1.25rem;
      flex-shrink: 0;
    }

    .toast-message {
      font-size: 0.875rem;
      font-weight: 600;
      flex: 1;
    }

    .toast-close {
      flex-shrink: 0;
      opacity: 0.6;
      cursor: pointer;
      background: none;
      border: none;
      color: inherit;
      padding: 4px;
      border-radius: 6px;
      transition: opacity 0.15s;
    }
    .toast-close:hover { opacity: 1; }

    @keyframes slideUp {
      from { opacity: 0; transform: translateY(12px) scale(0.96); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }
  `]
})
export class ToastContainerComponent {
  readonly icons = { CheckCircle, XCircle, AlertTriangle, Info, X };

  constructor(public toastService: ToastService) {}

  getIcon(type: string) {
    const map: Record<string, any> = {
      success: CheckCircle,
      error: XCircle,
      warning: AlertTriangle,
      info: Info
    };
    return map[type] || Info;
  }
}
