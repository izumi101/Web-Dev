import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EventService } from '../../services/event.service';
import { ModalService } from '../../services/modal.service';
import { ToastService } from '../../services/toast.service';
import { Registration } from '../../models/models';
import { LucideAngularModule, Calendar, MapPin, Clock, User as UserIcon, Download, Share2 } from 'lucide-angular';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-my-registrations',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [CommonModule, RouterModule, LucideAngularModule],
  template: `
    <section class="min-h-screen bg-background pt-24 pb-32 md:pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header -->
        <div class="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 class="text-3xl font-semibold text-foreground mb-2">My Tickets</h1>
            <p class="text-muted-foreground">Manage your event tickets and check-in details</p>
          </div>
        </div>

        <!-- Tabs -->
        <div class="flex items-center gap-2 mb-8">
          <button
            (click)="activeTab = 'upcoming'"
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            [class.bg-primary]="activeTab === 'upcoming'"
            [class.text-primary-foreground]="activeTab === 'upcoming'"
            [class.bg-card]="activeTab !== 'upcoming'"
            [class.text-muted-foreground]="activeTab !== 'upcoming'"
            [class.hover:text-foreground]="activeTab !== 'upcoming'"
            [class.border]="activeTab !== 'upcoming'"
            [class.border-border]="activeTab !== 'upcoming'"
          >
            <span class="flex items-center gap-2">
              <lucide-icon [img]="icons.Calendar" class="w-4 h-4"></lucide-icon>
              Upcoming ({{ registrations.length }})
            </span>
          </button>
          <button
            (click)="activeTab = 'past'"
            class="px-4 py-2 rounded-xl text-sm font-medium transition-all"
            [class.bg-primary]="activeTab === 'past'"
            [class.text-primary-foreground]="activeTab === 'past'"
            [class.bg-card]="activeTab !== 'past'"
            [class.text-muted-foreground]="activeTab !== 'past'"
            [class.hover:text-foreground]="activeTab !== 'past'"
            [class.border]="activeTab !== 'past'"
            [class.border-border]="activeTab !== 'past'"
          >
            <span class="flex items-center gap-2">
              <lucide-icon [img]="icons.Clock" class="w-4 h-4"></lucide-icon>
              Past (0)
            </span>
          </button>
        </div>

        <!-- Tickets List -->
        <div class="space-y-6">
          @if (loading) {
            <div class="py-20 text-center">
              <div class="w-10 h-10 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-muted-foreground font-medium">Fetching your tickets...</p>
            </div>
          } @else {
            @if (activeTab === 'upcoming') {
              @if (registrations.length > 0) {
                @for (reg of registrations; track reg.id) {
                  <!-- Refactored V0 Ticket Card -->
                  <div class="relative bg-card rounded-2xl overflow-hidden border border-border transition-all hover:border-primary/30 hover:shadow-xl hover:shadow-black/20">
                    <div class="flex flex-col md:flex-row">
                      <!-- Left Section - Event Image -->
                      <div class="md:w-48 h-40 md:h-auto relative overflow-hidden flex-shrink-0 bg-muted cursor-pointer" [routerLink]="['/events', reg.event.id]">
                        <img
                          *ngIf="reg.event.image"
                          [src]="reg.event.image"
                          [alt]="reg.event.title"
                          class="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div *ngIf="!reg.event.image" class="w-full h-full flex items-center justify-center">
                          <span class="text-4xl font-bold opacity-10">E</span>
                        </div>
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent to-card/90 hidden md:block"></div>
                      </div>

                      <!-- Middle Section - Event Details -->
                      <div class="flex-1 p-5 md:p-6">
                        <div class="flex items-start justify-between mb-4">
                          <div>
                            <span class="inline-block px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-bold mb-2 uppercase tracking-wide">
                              {{ reg.event.is_free ? 'Free Pass' : 'Standard Ticket' }}
                            </span>
                            <h3 class="text-xl font-semibold text-foreground leading-tight cursor-pointer hover:text-primary transition-colors" [routerLink]="['/events', reg.event.id]">{{ reg.event.title }}</h3>
                          </div>
                        </div>

                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                          <div class="space-y-2">
                            <div class="flex items-center gap-2 text-muted-foreground">
                              <lucide-icon [img]="icons.Calendar" class="w-4 h-4"></lucide-icon>
                              <span class="text-sm">{{ reg.event.date | date:'EEEE, MMMM d, y' }}</span>
                            </div>
                            <div class="flex items-center gap-2 text-muted-foreground">
                              <lucide-icon [img]="icons.Clock" class="w-4 h-4"></lucide-icon>
                              <span class="text-sm truncate">{{ reg.event.date | date:'h:mm a' }}</span>
                            </div>
                          </div>
                          <div class="space-y-2">
                            <div class="flex items-center gap-2 text-muted-foreground">
                              <lucide-icon [img]="icons.MapPin" class="w-4 h-4"></lucide-icon>
                              <span class="text-sm truncate">{{ reg.event.location }}</span>
                            </div>
                            <div class="flex items-center gap-2 text-muted-foreground">
                              <lucide-icon [img]="icons.UserIcon" class="w-4 h-4"></lucide-icon>
                              <span class="text-sm font-medium text-foreground">{{ reg.username }}</span>
                            </div>
                          </div>
                        </div>

                        <!-- Ticket action bar -->
                        <div class="mt-4 pt-4 border-t border-border flex items-center gap-4">
                          <button (click)="cancelRegistration(reg.event.id, reg.event.title)" class="text-sm font-medium text-muted-foreground hover:text-destructive transition-colors">
                            Cancel Ticket
                          </button>
                          
                          <span *ngIf="reg.is_checked_in" class="ml-auto inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#22C55E]/10 text-[#22C55E] text-xs font-bold uppercase tracking-wider">
                            <span class="w-1.5 h-1.5 rounded-full bg-[#22C55E]"></span>
                            Used
                          </span>

                          <button 
                            (click)="exportTicket(reg, $event)" 
                            [disabled]="exportingTicketId === reg.id"
                            class="ml-auto flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-all disabled:opacity-50"
                          >
                            <div *ngIf="exportingTicketId === reg.id" class="w-3 h-3 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                            <lucide-icon *ngIf="exportingTicketId !== reg.id" [img]="isMobile ? icons.Share2 : icons.Download" class="w-3.5 h-3.5"></lucide-icon>
                            {{ isMobile ? 'Share' : 'Download PDF' }}
                          </button>
                        </div>
                      </div>

                      <!-- Perforated Divider -->
                      <div class="hidden md:flex flex-col items-center justify-center relative px-2">
                        <div class="absolute -top-4 w-8 h-8 rounded-full bg-background border-l border-b border-border"></div>
                        <div class="h-full border-l-2 border-dashed border-border/50"></div>
                        <div class="absolute -bottom-4 w-8 h-8 rounded-full bg-background border-l border-t border-border"></div>
                      </div>

                      <!-- Mobile Perforated Divider -->
                      <div class="md:hidden relative flex items-center px-4">
                        <div class="absolute -left-4 w-8 h-8 rounded-full bg-background border-t border-r border-border"></div>
                        <div class="flex-1 border-t-2 border-dashed border-border/50"></div>
                        <div class="absolute -right-4 w-8 h-8 rounded-full bg-background border-t border-l border-border"></div>
                      </div>

                      <!-- Right Section - QR Code -->
                      <div class="p-5 md:p-6 flex flex-col items-center justify-center md:w-48 flex-shrink-0 cursor-pointer group" (click)="openValidation(reg.ticket_uuid)">
                        <!-- QR Code -->
                        <div class="w-28 h-28 bg-white rounded-xl p-2 mb-3 shadow-[0_5px_20px_rgba(0,0,0,0.3)] transition-transform duration-300 group-hover:scale-110">
                          <img
                            [src]="'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + getValidationUrl(reg.ticket_uuid)"
                            alt="QR Code"
                            class="w-full h-full"
                          />
                        </div>
                        <p class="text-xs text-muted-foreground font-mono bg-muted/50 px-2 py-0.5 rounded">#{{ reg.ticket_uuid.substring(0, 8).toUpperCase() }}</p>
                        <p class="text-[10px] uppercase font-bold tracking-widest text-primary mt-2 group-hover:text-primary transition-colors">Scan at entry</p>
                      </div>
                    </div>
                  </div>
                }
              } @else {
                <div class="text-center py-16 bg-card rounded-2xl border border-dashed border-border/50">
                  <div class="w-16 h-16 rounded-full bg-muted/50 mx-auto mb-4 flex items-center justify-center">
                    <lucide-icon [img]="icons.Calendar" class="w-8 h-8 text-muted-foreground/50"></lucide-icon>
                  </div>
                  <h3 class="text-lg font-bold text-foreground mb-2">No upcoming tickets</h3>
                  <p class="text-muted-foreground text-sm mb-6">When you book an event, your tickets will appear here</p>
                  <button routerLink="/" class="bg-primary text-primary-foreground font-bold px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-colors">
                    Discover Events
                  </button>
                </div>
              }
            } @else {
              <!-- Past Tab content -->
              <div class="text-center py-16 bg-card rounded-2xl border border-dashed border-border/50">
                <div class="w-16 h-16 rounded-full bg-muted/50 mx-auto mb-4 flex items-center justify-center">
                  <lucide-icon [img]="icons.Clock" class="w-8 h-8 text-muted-foreground/50"></lucide-icon>
                </div>
                <h3 class="text-lg font-bold text-foreground mb-2">No past tickets</h3>
                <p class="text-muted-foreground text-sm">Your attended events will be archived here</p>
              </div>
            }
          }
        </div>
      </div>
    </section>
  `
})
export class MyRegistrationsComponent implements OnInit {
  registrations: Registration[] = [];
  loading = false;
  error = '';
  success = '';
  activeTab: 'upcoming' | 'past' = 'upcoming';
  exportingTicketId: number | null = null;
  isMobile = false;

  readonly icons = { Calendar, MapPin, Clock, UserIcon, Download, Share2 };

  constructor(
    private eventService: EventService,
    private modalService: ModalService,
    private toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.loadRegistrations();
    if (typeof window !== 'undefined') {
      this.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
  }

  loadRegistrations(): void {
    this.loading = true;

    this.eventService.getMyRegistrations().subscribe({
      next: (response) => {
        this.registrations = response.results;
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load registrations:', err);
        this.toastService.error('Failed to load registrations');
        this.loading = false;
      }
    });
  }

  async cancelRegistration(eventId: number, eventTitle: string): Promise<void> {
    const confirmed = await this.modalService.open({
      title: 'Cancel Ticket',
      message: `Are you sure you want to cancel your registration for "${eventTitle}"? This action cannot be undone and your spot will be given to someone else.`,
      confirmText: 'Cancel Ticket',
      cancelText: 'Keep Ticket',
      isDestructive: true
    });
    
    if (!confirmed) return;

    this.eventService.cancelRegistration(eventId).subscribe({
      next: () => {
        this.registrations = this.registrations.filter(r => r.event.id !== eventId);
        this.toastService.success('Registration cancelled successfully');
      },
      error: (err) => {
        console.error('Failed to cancel registration:', err);
        this.toastService.error('Failed to cancel registration');
      }
    });
  }

  getValidationUrl(uuid: string): string {
    return `${window.location.origin}/validate/${uuid}`;
  }

  openValidation(uuid: string): void {
    window.open(this.getValidationUrl(uuid), '_blank');
  }

  async exportTicket(reg: Registration, event: MouseEvent): Promise<void> {
    event.stopPropagation();
    this.exportingTicketId = reg.id;
    
    try {
      // Находим элемент карточки билета
      const ticketElement = (event.currentTarget as HTMLElement).closest('.relative.bg-card') as HTMLElement;
      if (!ticketElement) throw new Error('Ticket element not found');

      // Временно скрываем кнопки управления и добавляем стили для PDF
      const actionButtons = ticketElement.querySelector('.border-t.border-border') as HTMLElement;
      if (actionButtons) actionButtons.style.display = 'none';

      // Создаем скриншот карточки
      const canvas = await html2canvas(ticketElement, {
        scale: 2, // Улучшенное качество
        useCORS: true,
        backgroundColor: '#0A0A0A' // Соответствует фону темы
      });

      // Восстанавливаем видимость кнопок
      if (actionButtons) actionButtons.style.display = 'flex';

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'mm',
        format: [canvas.width * 0.264583 / 2, canvas.height * 0.264583 / 2]
      });

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      
      const fileName = `Ticket-${reg.event.title.replace(/\s+/g, '-')}.pdf`;

      // Проверка возможности "Поделиться" на мобильных
      if (this.isMobile && navigator.share) {
        const pdfBlob = pdf.output('blob');
        const file = new File([pdfBlob], fileName, { type: 'application/pdf' });
        
        if (navigator.canShare && navigator.canShare({ files: [file] })) {
          await navigator.share({
            files: [file],
            title: `Event Ticket: ${reg.event.title}`,
            text: `Here is my ticket for ${reg.event.title}!`
          });
          this.toastService.success('Ticket shared successfully');
        } else {
          pdf.save(fileName);
        }
      } else {
        pdf.save(fileName);
      }
    } catch (err) {
      console.error('Failed to export ticket:', err);
      this.toastService.error('Failed to generate PDF ticket');
    } finally {
      this.exportingTicketId = null;
    }
  }
}
