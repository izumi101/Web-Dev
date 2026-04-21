import { Component, ViewEncapsulation, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { User } from '../../models/models';
import { 
  LucideAngularModule, 
  Search, 
  Menu, 
  X, 
  User as UserIcon, 
  Ticket,
  LogOut,
  Plus,
  LayoutDashboard
} from 'lucide-angular';

@Component({
  selector: 'app-navbar',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [
    CommonModule, 
    RouterModule, 
    FormsModule, 
    LucideAngularModule
  ],
  template: `
    <header 
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b"
      [class.bg-background/95]="scrolled"
      [class.backdrop-blur-sm]="scrolled"
      [class.border-border]="scrolled"
      [class.border-transparent]="!scrolled"
      [class.py-2]="scrolled"
      [class.py-4]="!scrolled"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <a routerLink="/" class="flex items-center gap-2 group">
            <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center transition-transform group-hover:scale-110">
              <span class="text-primary-foreground font-bold text-sm">E</span>
            </div>
            <span class="text-foreground font-semibold text-lg tracking-tight">EventHub</span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-8" aria-label="Main navigation">
            <a 
              routerLink="/" 
              routerLinkActive="text-primary" 
              [routerLinkActiveOptions]="{exact: true}"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Discover
            </a>
            <a 
              routerLink="/my-registrations" 
              routerLinkActive="text-primary"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              My Tickets
            </a>
            <a 
              *ngIf="authService.isLoggedIn"
              routerLink="/organizer/dashboard" 
              routerLinkActive="text-primary"
              class="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Dashboard
            </a>
          </nav>

          <!-- Desktop Actions -->
          <div class="hidden md:flex items-center gap-3">
            @if (authService.isLoggedIn && user) {
              <div class="flex items-center gap-4">
                <!-- Create Event Shortcut -->
                <button 
                  routerLink="/create-event"
                  class="flex items-center gap-2 p-2 text-muted-foreground hover:text-primary transition-colors"
                  title="Create Experience"
                >
                  <lucide-icon [img]="icons.Plus" class="w-5 h-5"></lucide-icon>
                  <span class="text-sm font-medium hidden lg:inline">Create</span>
                </button>

                <!-- Profile Action -->
                <button 
                  routerLink="/profile" 
                  class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/50 border border-border hover:bg-secondary transition-all"
                >
                  <div class="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-primary-foreground">
                    {{ user.username.charAt(0).toUpperCase() }}
                  </div>
                  <span class="text-sm font-medium">{{ user.username }}</span>
                </button>

                <!-- Logout -->
                <button 
                  (click)="logout()" 
                  class="flex items-center gap-2 px-3 py-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition-colors"
                  title="Logout"
                >
                  <lucide-icon [img]="icons.LogOut" class="w-4 h-4"></lucide-icon>
                  <span class="text-sm font-medium">Out</span>
                </button>
              </div>
            } @else {
              <button 
                routerLink="/login"
                class="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </button>
              <button 
                routerLink="/register"
                class="px-5 py-2.5 text-sm font-bold bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all shadow-lg shadow-primary/20"
              >
                Get Started
              </button>
            }
          </div>

          <!-- Mobile Menu Button -->
          <button
            (click)="isMenuOpen = !isMenuOpen"
            class="md:hidden p-2 text-muted-foreground hover:text-foreground focus:ring-2 focus:ring-primary focus:outline-none rounded-lg"
            [attr.aria-expanded]="isMenuOpen"
            aria-label="Toggle navigation menu"
          >
            <lucide-icon [img]="isMenuOpen ? icons.X : icons.Menu" class="w-6 h-6"></lucide-icon>
          </button>
        </div>

        <!-- Mobile Menu -->
        @if (isMenuOpen) {
          <div class="md:hidden py-6 border-t border-border animate-fade-in" role="navigation" aria-label="Mobile navigation">
            <nav class="flex flex-col gap-6">
              <a 
                routerLink="/" 
                (click)="isMenuOpen = false"
                class="text-base font-medium text-muted-foreground hover:text-foreground flex items-center gap-3"
              >
                <lucide-icon [img]="icons.Search" class="w-5 h-5"></lucide-icon>
                Discover
              </a>
              <a 
                routerLink="/my-registrations" 
                (click)="isMenuOpen = false"
                class="text-base font-medium text-muted-foreground hover:text-foreground flex items-center gap-3"
              >
                <lucide-icon [img]="icons.Ticket" class="w-5 h-5"></lucide-icon>
                My Tickets
              </a>
              <a 
                *ngIf="authService.isLoggedIn"
                routerLink="/organizer/dashboard" 
                (click)="isMenuOpen = false"
                class="text-base font-medium text-muted-foreground hover:text-foreground flex items-center gap-3"
              >
                <lucide-icon [img]="icons.LayoutDashboard" class="w-5 h-5"></lucide-icon>
                Dashboard
              </a>
              
              <div class="flex flex-col gap-3 pt-6 border-t border-border">
                @if (authService.isLoggedIn) {
                   <button 
                    routerLink="/profile"
                    (click)="isMenuOpen = false"
                    class="flex items-center gap-3 text-base font-medium"
                   >
                     <lucide-icon [img]="icons.UserIcon" class="w-5 h-5"></lucide-icon>
                     Profile
                   </button>
                   <button 
                    (click)="logout(); isMenuOpen = false"
                    class="flex items-center gap-3 text-base font-medium text-destructive"
                   >
                     <lucide-icon [img]="icons.LogOut" class="w-5 h-5"></lucide-icon>
                     Sign Out
                   </button>
                } @else {
                  <button 
                    routerLink="/login"
                    (click)="isMenuOpen = false"
                    class="w-full py-3 rounded-xl border border-border text-center font-bold"
                  >
                    Sign In
                  </button>
                  <button 
                    routerLink="/register"
                    (click)="isMenuOpen = false"
                    class="w-full py-3 rounded-xl bg-primary text-primary-foreground text-center font-bold shadow-lg shadow-primary/20"
                  >
                    Get Started
                  </button>
                }
              </div>
            </nav>
          </div>
        }
      </div>
    </header>
  `
})
export class NavbarComponent {
  user: User | null = null;
  isOrganizer = false;
  isMenuOpen = false;
  scrolled = false;

  readonly icons = {
    Search, 
    Menu, 
    X, 
    UserIcon, 
    Ticket,
    LogOut,
    Plus,
    LayoutDashboard
  };

  constructor(
    public authService: AuthService,
    private router: Router,
    private modalService: ModalService
  ) {
    this.authService.currentUser$.subscribe(user => {
      this.user = user;
      this.isOrganizer = user?.is_staff || user?.is_superuser || false;
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 20;
  }

  async logout(): Promise<void> {
    const confirmed = await this.modalService.open({
      title: 'Sign Out',
      message: 'Are you sure you want to sign out of EventHub? You will need to sign back in to view your tickets.',
      confirmText: 'Sign Out',
      cancelText: 'Cancel',
      isDestructive: true
    });
    
    if (confirmed) {
      this.authService.logout();
      this.router.navigate(['/login']);
    }
  }
}
