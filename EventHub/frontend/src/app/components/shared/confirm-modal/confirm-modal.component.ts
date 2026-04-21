import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../services/modal.service';

@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (modalService.isOpen()) {
      <div class="fixed inset-0 z-[100] flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="confirm-modal-title" (keydown.escape)="modalService.cancel()">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200" (click)="modalService.cancel()"></div>
        
        <!-- Modal Content -->
        <div class="relative bg-card border border-border shadow-2xl rounded-3xl p-8 w-[90%] max-w-md animate-in zoom-in-95 duration-200">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-foreground mb-3 text-balance">{{ modalService.config()?.title }}</h2>
            <p class="text-base text-muted-foreground leading-relaxed">{{ modalService.config()?.message }}</p>
          </div>
          
          <div class="flex items-center justify-end gap-3 mt-6">
            <button 
              (click)="modalService.cancel()"
              class="px-5 py-2.5 text-sm font-bold rounded-xl border border-border text-foreground hover:bg-muted transition-colors focus:ring-2 focus:ring-ring focus:outline-none"
            >
              {{ modalService.config()?.cancelText || 'Cancel' }}
            </button>
            <button 
              (click)="modalService.confirm()"
              class="px-5 py-2.5 text-sm font-bold rounded-xl text-white transition-colors focus:ring-2 focus:ring-ring focus:outline-none shadow-lg"
              [ngClass]="modalService.config()?.isDestructive ? 'bg-destructive hover:bg-destructive/90 shadow-destructive/20' : 'bg-primary hover:bg-primary/90 shadow-primary/20'"
            >
              {{ modalService.config()?.confirmText || 'Confirm' }}
            </button>
          </div>
        </div>
      </div>
    }
  `
})
export class ConfirmModalComponent {
  constructor(public modalService: ModalService) {}
}
