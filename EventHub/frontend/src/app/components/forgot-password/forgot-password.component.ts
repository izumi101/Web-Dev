import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LucideAngularModule, Mail, KeyRound, ShieldCheck, ArrowLeft, Eye, EyeOff } from 'lucide-angular';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, LucideAngularModule],
  template: `
    <div class="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      <!-- Background glow -->
      <div class="absolute top-[-200px] right-[-200px] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px]"></div>
      <div class="absolute bottom-[-200px] left-[-200px] w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px]"></div>

      <div class="w-full max-w-md relative z-10">
        <!-- Back to Login -->
        <a routerLink="/login" class="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
          <lucide-icon [img]="icons.ArrowLeft" class="w-4 h-4"></lucide-icon>
          Back to Sign In
        </a>

        <!-- Step 1: Enter Email/Username -->
        @if (step === 1) {
          <div class="animate-fade-in">
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <lucide-icon [img]="icons.Mail" class="w-8 h-8 text-primary"></lucide-icon>
            </div>
            <h1 class="text-3xl font-bold text-foreground mb-2">Forgot Password?</h1>
            <p class="text-muted-foreground mb-8">Enter your email or username and we'll send you a verification code.</p>

            <form (ngSubmit)="requestCode()">
              <div class="mb-6">
                <label class="block text-sm font-semibold text-muted-foreground mb-2">Email or Username</label>
                <input
                  type="text"
                  [(ngModel)]="identifier"
                  name="identifier"
                  placeholder="john@example.com or johndoe"
                  class="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                  autofocus
                >
              </div>

              @if (error) {
                <div class="mb-4 px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-medium">
                  {{ error }}
                </div>
              }

              <button
                type="submit"
                [disabled]="loading || !identifier.trim()"
                class="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ loading ? 'Sending...' : 'Send Reset Code' }}
              </button>
            </form>
          </div>
        }

        <!-- Step 2: Enter Code -->
        @if (step === 2) {
          <div class="animate-fade-in">
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <lucide-icon [img]="icons.ShieldCheck" class="w-8 h-8 text-primary"></lucide-icon>
            </div>
            <h1 class="text-3xl font-bold text-foreground mb-2">Check Your Email</h1>
            <p class="text-muted-foreground mb-2">We sent a 6-digit code to the email associated with your account.</p>
            <p class="text-sm text-primary font-semibold mb-8">{{ maskedIdentifier }}</p>

            <form (ngSubmit)="verifyCode()">
              <div class="mb-6">
                <label class="block text-sm font-semibold text-muted-foreground mb-2">Verification Code</label>
                <input
                  type="text"
                  [(ngModel)]="code"
                  name="code"
                  placeholder="000000"
                  maxlength="6"
                  class="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground text-center text-2xl font-mono tracking-[0.5em] placeholder:text-muted-foreground/30 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                  autofocus
                >
              </div>

              @if (error) {
                <div class="mb-4 px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-medium">
                  {{ error }}
                </div>
              }

              <button
                type="submit"
                [disabled]="loading || code.length !== 6"
                class="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed mb-4"
              >
                {{ loading ? 'Verifying...' : 'Verify Code' }}
              </button>

              <button type="button" (click)="requestCode()" class="w-full text-sm text-muted-foreground hover:text-primary transition-colors">
                Didn't receive a code? Resend
              </button>
            </form>
          </div>
        }

        <!-- Step 3: New Password -->
        @if (step === 3) {
          <div class="animate-fade-in">
            <div class="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <lucide-icon [img]="icons.KeyRound" class="w-8 h-8 text-primary"></lucide-icon>
            </div>
            <h1 class="text-3xl font-bold text-foreground mb-2">Set New Password</h1>
            <p class="text-muted-foreground mb-8">Create a strong password for your account.</p>

            <form (ngSubmit)="confirmReset()">
              <div class="mb-4">
                <label class="block text-sm font-semibold text-muted-foreground mb-2">New Password</label>
                <div class="relative">
                  <input
                    [type]="showPassword ? 'text' : 'password'"
                    [(ngModel)]="newPassword"
                    name="newPassword"
                    placeholder="••••••••"
                    class="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all pr-12"
                    required
                  >
                  <button type="button" (click)="showPassword = !showPassword" class="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                    <lucide-icon [img]="showPassword ? icons.EyeOff : icons.Eye" class="w-5 h-5"></lucide-icon>
                  </button>
                </div>
                <!-- Password strength indicators -->
                <div class="mt-3 space-y-1.5">
                  <div class="flex items-center gap-2 text-xs">
                    <span [class]="newPassword.length >= 8 ? 'text-green-400' : 'text-muted-foreground/50'">
                      {{ newPassword.length >= 8 ? '✓' : '○' }}
                    </span>
                    <span [class]="newPassword.length >= 8 ? 'text-green-400 font-medium' : 'text-muted-foreground'">
                      At least 8 characters
                    </span>
                  </div>
                  <div class="flex items-center gap-2 text-xs">
                    <span [class]="hasDigit(newPassword) ? 'text-green-400' : 'text-muted-foreground/50'">
                      {{ hasDigit(newPassword) ? '✓' : '○' }}
                    </span>
                    <span [class]="hasDigit(newPassword) ? 'text-green-400 font-medium' : 'text-muted-foreground'">
                      Contains a digit
                    </span>
                  </div>
                </div>
              </div>

              <div class="mb-6">
                <label class="block text-sm font-semibold text-muted-foreground mb-2">Confirm Password</label>
                <input
                  type="password"
                  [(ngModel)]="newPassword2"
                  name="newPassword2"
                  placeholder="••••••••"
                  class="w-full px-4 py-3.5 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                  required
                >
                @if (newPassword2 && newPassword !== newPassword2) {
                  <p class="mt-2 text-xs text-destructive font-medium">Passwords do not match</p>
                }
              </div>

              @if (error) {
                <div class="mb-4 px-4 py-3 bg-destructive/10 border border-destructive/20 rounded-xl text-destructive text-sm font-medium">
                  {{ error }}
                </div>
              }

              <button
                type="submit"
                [disabled]="loading || newPassword.length < 8 || !hasDigit(newPassword) || newPassword !== newPassword2"
                class="w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ loading ? 'Resetting...' : 'Reset Password' }}
              </button>
            </form>
          </div>
        }

        <!-- Step 4: Success -->
        @if (step === 4) {
          <div class="animate-fade-in text-center">
            <div class="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-6">
              <span class="text-4xl">✓</span>
            </div>
            <h1 class="text-3xl font-bold text-foreground mb-2">Password Reset!</h1>
            <p class="text-muted-foreground mb-8">Your password has been changed successfully. You can now sign in with your new password.</p>

            <a routerLink="/login" class="inline-block w-full py-3.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all text-center">
              Sign In
            </a>
          </div>
        }
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  step = 1;
  identifier = '';
  code = '';
  newPassword = '';
  newPassword2 = '';
  resetToken = '';
  loading = false;
  error = '';
  showPassword = false;

  readonly icons = { Mail, KeyRound, ShieldCheck, ArrowLeft, Eye, EyeOff };

  get maskedIdentifier(): string {
    return this.identifier.includes('@')
      ? this.identifier.replace(/(.{2})(.*)(@.*)/, '$1***$3')
      : this.identifier;
  }

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  hasDigit(value: string): boolean {
    return /\d/.test(value);
  }

  requestCode(): void {
    this.error = '';
    this.loading = true;

    this.authService.requestPasswordReset(this.identifier).subscribe({
      next: () => {
        this.step = 2;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to send reset code. Please try again.';
        this.loading = false;
      }
    });
  }

  verifyCode(): void {
    this.error = '';
    this.loading = true;

    this.authService.verifyResetCode(this.identifier, this.code).subscribe({
      next: (res) => {
        this.resetToken = res.reset_token;
        this.step = 3;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Invalid or expired code.';
        this.loading = false;
      }
    });
  }

  confirmReset(): void {
    this.error = '';

    if (this.newPassword !== this.newPassword2) {
      this.error = 'Passwords do not match.';
      return;
    }

    if (this.newPassword.length < 8 || !this.hasDigit(this.newPassword)) {
      this.error = 'Password must be at least 8 characters and contain a digit.';
      return;
    }

    this.loading = true;

    this.authService.confirmPasswordReset(this.resetToken, this.newPassword, this.newPassword2).subscribe({
      next: () => {
        this.step = 4;
        this.loading = false;
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to reset password.';
        this.loading = false;
      }
    });
  }
}
