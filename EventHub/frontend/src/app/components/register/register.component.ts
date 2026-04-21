import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="auth-page px-4 sm:px-6">
      <!-- Background glow -->
      <div class="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"></div>
      <div class="absolute bottom-[-200px] left-[-200px] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]"></div>

      <div class="w-full max-w-lg relative z-10">
        <div class="auth-box glass shadow-2xl animate-fade-in p-8 sm:p-12 overflow-hidden relative">
          <!-- Progress Bar -->
          <div class="absolute top-0 left-0 w-full h-1.5 bg-border/30">
            <div 
              class="h-full bg-primary transition-all duration-500 ease-out shadow-[0_0_10px_rgba(56,189,248,0.5)]"
              [style.width.%]="(currentStep / 4) * 100"
            ></div>
          </div>

          <header class="text-center mb-10">
            <div class="logo-mark mb-6">EH</div>
            <h1 class="text-3xl font-extrabold text-foreground tracking-tight mb-2">Create Account</h1>
            <p class="text-muted-foreground text-sm">Step {{ currentStep }} of 4 • {{ stepTitle }}</p>
          </header>

          <form (ngSubmit)="onSubmit()" class="space-y-8">
            
            <!-- Step 1: Account Basics -->
            @if (currentStep === 1) {
              <div class="animate-slide-in space-y-6">
                <div class="form-field">
                  <label class="field-lbl">Email Address</label>
                  <div class="input-wrapper">
                    <span class="field-ico">📧</span>
                    <input
                      type="email"
                      [(ngModel)]="email"
                      name="email"
                      placeholder="your@email.com"
                      class="field-input"
                      required
                      autofocus
                    >
                  </div>
                </div>

                <div class="form-field">
                  <label class="field-lbl">Username</label>
                  <div class="input-wrapper">
                    <span class="field-ico">👤</span>
                    <input
                      type="text"
                      [(ngModel)]="username"
                      name="username"
                      placeholder="choose_username"
                      class="field-input"
                      required
                    >
                  </div>
                </div>
              </div>
            }

            <!-- Step 2: Personal Details -->
            @if (currentStep === 2) {
              <div class="animate-slide-in space-y-6">
                <div class="grid grid-cols-2 gap-4">
                  <div class="form-field">
                    <label class="field-lbl">First Name</label>
                    <input type="text" [(ngModel)]="first_name" name="first_name" placeholder="John" class="field-input" autofocus>
                  </div>
                  <div class="form-field">
                    <label class="field-lbl">Last Name</label>
                    <input type="text" [(ngModel)]="last_name" name="last_name" placeholder="Doe" class="field-input">
                  </div>
                </div>

                <div class="form-field">
                  <label class="field-lbl">Phone Number</label>
                  <div class="input-wrapper">
                    <span class="field-ico">📱</span>
                    <input
                      type="tel"
                      [(ngModel)]="phone"
                      name="phone"
                      placeholder="+1 234 567 890"
                      class="field-input"
                    >
                  </div>
                </div>
              </div>
            }

            <!-- Step 3: Role Selection -->
            @if (currentStep === 3) {
              <div class="animate-slide-in space-y-4">
                <p class="text-sm text-muted-foreground text-center mb-6">How do you plan to use EventHub?</p>
                
                <div 
                  (click)="role = 'attendee'"
                  class="p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 group"
                  [class.border-primary]="role === 'attendee'"
                  [class.bg-primary/5]="role === 'attendee'"
                  [class.border-border]="role !== 'attendee'"
                  [class.hover:border-primary/50]="role !== 'attendee'"
                >
                  <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">🎟️</div>
                  <div>
                    <h3 class="font-bold text-foreground">Attendee</h3>
                    <p class="text-xs text-muted-foreground">I want to discover and join events</p>
                  </div>
                  <div class="ml-auto w-6 h-6 rounded-full border-2 border-primary/30 flex items-center justify-center" [class.bg-primary]="role === 'attendee'">
                    <span *ngIf="role === 'attendee'" class="text-white text-[10px]">✓</span>
                  </div>
                </div>

                <div 
                  (click)="role = 'organizer'"
                  class="p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-center gap-4 group"
                  [class.border-primary]="role === 'organizer'"
                  [class.bg-primary/5]="role === 'organizer'"
                  [class.border-border]="role !== 'organizer'"
                  [class.hover:border-primary/50]="role !== 'organizer'"
                >
                  <div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">🏗️</div>
                  <div>
                    <h3 class="font-bold text-foreground">Organizer</h3>
                    <p class="text-xs text-muted-foreground">I want to create and manage events</p>
                  </div>
                  <div class="ml-auto w-6 h-6 rounded-full border-2 border-primary/30 flex items-center justify-center" [class.bg-primary]="role === 'organizer'">
                    <span *ngIf="role === 'organizer'" class="text-white text-[10px]">✓</span>
                  </div>
                </div>
              </div>
            }

            <!-- Step 4: Password -->
            @if (currentStep === 4) {
              <div class="animate-slide-in space-y-6">
                <div class="form-field">
                  <label class="field-lbl">Password</label>
                  <div class="input-wrapper">
                    <span class="field-ico">🔐</span>
                    <input
                      [type]="showPassword ? 'text' : 'password'"
                      [(ngModel)]="password"
                      name="password"
                      placeholder="••••••••"
                      class="field-input pr-12"
                      required
                      autofocus
                    >
                    <button type="button" (click)="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
                      {{ showPassword ? '🙈' : '👁️' }}
                    </button>
                  </div>
                  @if (password) {
                    <div class="mt-3 space-y-1.5">
                      <div class="flex items-center gap-2 text-xs">
                        <span [class.text-green-400]="password.length >= 8" [class.text-muted-foreground/50]="password.length < 8">
                          {{ password.length >= 8 ? '✓' : '○' }}
                        </span>
                        <span [class.text-green-400]="password.length >= 8" [class.text-muted-foreground]="password.length < 8">At least 8 characters</span>
                      </div>
                      <div class="flex items-center gap-2 text-xs">
                        <span [class.text-green-400]="hasDigit(password)" [class.text-muted-foreground/50]="!hasDigit(password)">
                          {{ hasDigit(password) ? '✓' : '○' }}
                        </span>
                        <span [class.text-green-400]="hasDigit(password)" [class.text-muted-foreground]="!hasDigit(password)">Contains a digit</span>
                      </div>
                    </div>
                  }
                </div>

                <div class="form-field">
                  <label class="field-lbl">Confirm Password</label>
                  <div class="input-wrapper">
                    <span class="field-ico">🛡️</span>
                    <input
                      type="password"
                      [(ngModel)]="password2"
                      name="password2"
                      placeholder="••••••••"
                      class="field-input"
                      required
                    >
                  </div>
                </div>
              </div>
            }

            <!-- Error Alerts -->
            @if (errors.length > 0) {
              <div class="err-box-matte animate-shake">
                <ul class="err-list">
                  <li *ngFor="let err of errors">{{ err }}</li>
                </ul>
              </div>
            }

            @if (error) {
              <div class="field-err animate-shake">
                <span class="err-ico">⚠️</span>
                <p>{{ error }}</p>
              </div>
            }

            <!-- Navigation Buttons -->
            <div class="flex items-center gap-4 mt-12">
              @if (currentStep > 1) {
                <button
                  type="button"
                  (click)="prevStep()"
                  class="flex-1 py-3.5 bg-card hover:bg-muted border border-border text-foreground font-bold rounded-xl transition-all"
                >
                  Back
                </button>
              }
              
              @if (currentStep < 4) {
                <button
                  type="button"
                  (click)="nextStep()"
                  class="flex-[2] py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 group"
                >
                  Continue
                  <span class="group-hover:translate-x-1 transition-transform">→</span>
                </button>
              } @else {
                <button
                  type="submit"
                  class="flex-[2] py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
                  [disabled]="submitting"
                >
                  @if (submitting) {
                    <div class="spinner-sm"></div>
                    <span>Creating Account...</span>
                  } @else {
                    <span>Finalize & Join</span>
                  }
                </button>
              }
            </div>
          </form>

          <footer class="mt-8 pt-8 border-t border-border text-center">
            <p class="text-sm text-muted-foreground">
              Already have an account? 
              <a routerLink="/login" class="text-primary font-bold hover:underline">Sign In</a>
            </p>
          </footer>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .auth-page { 
      min-height: 100vh; 
      background: var(--background); 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      position: relative;
      overflow: hidden;
    }
    .auth-box {
      border-radius: 2.5rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border);
    }
    .logo-mark {
      width: 56px; height: 56px; background: var(--primary); color: white;
      border-radius: 14px; display: flex; align-items: center; justify-content: center;
      font-weight: 900; font-size: 1.5rem; margin: 0 auto;
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.3);
    }
    .field-lbl { font-size: 0.7rem; font-weight: 800; color: var(--muted-foreground); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 0.5rem; display: block; }
    .input-wrapper { position: relative; }
    .field-ico { position: absolute; left: 1.25rem; top: 50%; transform: translateY(-50%); opacity: 0.4; font-size: 1.1rem; }
    .field-input {
      width: 100%; padding: 1rem 1.25rem 1rem 3.5rem;
      background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border);
      border-radius: 1.25rem; color: var(--foreground); font-size: 1rem; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }
    .field-input:focus { outline: none; border-color: var(--primary); background: rgba(255, 255, 255, 0.06); box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1); }
    
    .animate-slide-in { animation: slideIn 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
    @keyframes slideIn { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
    
    .spinner-sm { width: 20px; height: 20px; border: 2.5px solid rgba(255,255,255,0.2); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }

    .err-box-matte { padding: 1rem; background: rgba(244, 63, 94, 0.05); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 1rem; }
    .err-list { margin: 0; padding-left: 1.25rem; color: #f43f5e; font-size: 0.85rem; font-weight: 600; list-style: disc; }
    .field-err { display: flex; align-items: center; gap: 0.75rem; padding: 1rem; background: rgba(244, 63, 94, 0.1); border: 1px solid rgba(244, 63, 94, 0.2); border-radius: 1rem; color: #f43f5e; font-size: 0.85rem; font-weight: 600; }
  `]
})
export class RegisterComponent {
  currentStep = 1;
  username = '';
  email = '';
  password = '';
  password2 = '';
  first_name = '';
  last_name = '';
  phone = '';
  role: 'attendee' | 'organizer' = 'attendee';
  
  error = '';
  errors: string[] = [];
  submitting = false;
  showPassword = false;

  get stepTitle(): string {
    switch(this.currentStep) {
      case 1: return 'Account Basics';
      case 2: return 'Tell us about yourself';
      case 3: return 'Choose your role';
      case 4: return 'Secure your account';
      default: return '';
    }
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  nextStep(): void {
    this.errors = [];
    
    if (this.currentStep === 1) {
      if (!this.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) {
        this.errors.push('Please enter a valid email address');
        return;
      }
      if (!this.username || this.username.length < 3) {
        this.errors.push('Username must be at least 3 characters');
        return;
      }
    }

    if (this.currentStep < 4) {
      this.currentStep++;
    }
  }

  prevStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  onSubmit(): void {
    this.error = '';
    this.errors = [];

    if (!this.password || this.password.length < 8 || !this.hasDigit(this.password)) {
      this.errors.push('Password must be at least 8 characters and contain a digit');
      return;
    }

    if (this.password !== this.password2) {
      this.errors.push('Passwords do not match');
      return;
    }

    this.submitting = true;

    // Modified authService call to include new fields
    // Assuming authService.register can handle these or we update it
    this.authService.register(
      this.username, 
      this.email, 
      this.password, 
      this.password2,
      this.first_name,
      this.last_name,
      this.phone,
      this.role
    ).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.submitting = false;
        if (err.error && typeof err.error === 'object') {
          for (const key in err.error) {
            this.errors.push(`${key}: ${err.error[key]}`);
          }
        } else {
          this.error = 'Registration failed. Please try again.';
        }
      }
    });
  }

  hasDigit(value: string): boolean {
    return /\d/.test(value);
  }
}

