import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="auth-page">
      <div class="auth-box glass shadow-2xl animate-fade-in">
        <header class="auth-header">
          <div class="logo-mark">EH</div>
          <h1 class="auth-title">Welcome Back</h1>
          <p class="auth-sub">Sign in to your experience hub</p>
        </header>

        <form (ngSubmit)="onSubmit()" class="auth-form">
          <!-- Username or Email -->
          <div class="form-field">
            <label class="field-lbl">Username or Email</label>
            <div class="input-wrapper">
              <span class="field-ico">👤</span>
              <input
                type="text"
                [(ngModel)]="username"
                name="username"
                placeholder="@username or email"
                class="field-input"
                required
              >
            </div>
          </div>

          <!-- Password -->
          <div class="form-field">
            <label class="field-lbl">Password</label>
            <div class="input-wrapper" style="position: relative;">
              <span class="field-ico">🔐</span>
              <input
                [type]="showPassword ? 'text' : 'password'"
                [(ngModel)]="password"
                name="password"
                placeholder="••••••••"
                class="field-input"
                required
                style="padding-right: 3rem;"
              >
              <button type="button" (click)="showPassword = !showPassword" style="position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: var(--muted-foreground); font-size: 1.1rem; padding: 0.25rem;" [attr.aria-label]="showPassword ? 'Hide password' : 'Show password'">
                {{ showPassword ? '🙈' : '👁️' }}
              </button>
            </div>
            <div style="text-align: right; margin-top: 0.5rem;">
              <a routerLink="/forgot-password" style="font-size: 0.8125rem; font-weight: 600; color: var(--primary); transition: opacity 0.2s;" class="hover:opacity-80">Forgot password?</a>
            </div>
          </div>

          <!-- Error Alert -->
          @if (error) {
            <div class="field-err">
              <span class="err-ico">⚠️</span>
              <p>{{ error }}</p>
            </div>
          }

          <!-- Submit -->
          <button
            type="button"
            (click)="onSubmit()"
            class="btn-auth-primary"
            [disabled]="submitting"
          >
            <div *ngIf="submitting" class="spinner-sm"></div>
            <span *ngIf="submitting">Signing In...</span>
            <span *ngIf="!submitting">Continue</span>
          </button>
        </form>

        <footer class="auth-footer">
          <p>
            New here? 
            <a routerLink="/register" class="auth-link">Create Account</a>
          </p>
        </footer>
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
      padding: 1.5rem;
      position: relative;
      overflow: hidden;
    }
    .auth-page::before {
      content: '';
      position: absolute;
      top: -10%;
      right: -10%;
      width: 40%;
      height: 40%;
      background: radial-gradient(circle, rgba(56, 189, 248, 0.05) 0%, transparent 70%);
      pointer-events: none;
    }

    .auth-box {
      width: 100%;
      max-width: 420px;
      padding: 3rem;
      border-radius: 2rem;
      background: rgba(255, 255, 255, 0.02);
      border: 1px solid var(--border);
    }

    .auth-header { text-align: center; margin-bottom: 2.5rem; }
    .logo-mark {
      width: 50px;
      height: 50px;
      background: var(--primary);
      color: white;
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 1.25rem;
      margin: 0 auto 1.5rem;
      box-shadow: 0 10px 20px rgba(56, 189, 248, 0.3);
    }
    .auth-title { font-size: 1.75rem; font-weight: 800; color: var(--foreground); letter-spacing: -0.02em; margin-bottom: 0.5rem; }
    .auth-sub { font-size: 0.875rem; color: var(--muted-foreground); }

    .auth-form { display: flex; flex-direction: column; gap: 1.5rem; }
    .form-field { display: flex; flex-direction: column; gap: 0.5rem; }
    .field-lbl { font-size: 0.75rem; font-weight: 700; color: var(--muted-foreground); text-transform: uppercase; letter-spacing: 0.05em; margin-left: 0.25rem; }
    
    .input-wrapper { position: relative; }
    .field-ico { position: absolute; left: 1rem; top: 50%; transform: translateY(-50%); opacity: 0.4; font-size: 1rem; }
    .field-input {
      width: 100%;
      padding: 0.875rem 1rem 0.875rem 3rem;
      background: rgba(255, 255, 255, 0.03);
      border: 1px solid var(--border);
      border-radius: 1rem;
      color: var(--foreground);
      font-size: 0.9375rem;
      transition: all 0.2s;
    }
    .field-input:focus {
      outline: none;
      border-color: var(--primary);
      background: rgba(255, 255, 255, 0.05);
      box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1);
    }

    .field-err {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 1rem;
      background: rgba(244, 63, 94, 0.1);
      border: 1px solid rgba(244, 63, 94, 0.2);
      border-radius: 1rem;
      color: #f43f5e;
      font-size: 0.8125rem;
      font-weight: 600;
    }

    .btn-auth-primary {
      margin-top: 1rem;
      width: 100%;
      padding: 1rem;
      background: var(--primary);
      color: white;
      border-radius: 1.125rem;
      font-weight: 800;
      font-size: 1rem;
      transition: all 0.2s;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
    }
    .btn-auth-primary:hover:not(:disabled) { transform: translateY(-2px); opacity: 0.9; }
    .btn-auth-primary:disabled { opacity: 0.5; cursor: not-allowed; }

    .auth-footer { text-align: center; margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--border); }
    .auth-footer p { font-size: 0.875rem; color: var(--muted-foreground); }
    .auth-link { color: var(--primary); font-weight: 700; text-decoration: none; margin-left: 0.25rem; }

    .spinner-sm { width: 18px; height: 18px; border: 2px solid rgba(255,255,255,0.2); border-top-color: white; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';
  submitting = false;
  showPassword = false;

  private returnUrl = '/';

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onSubmit(): void {
    if (!this.username.trim() || !this.password.trim()) {
      this.error = 'Please fill in all fields';
      return;
    }

    this.error = '';
    this.submitting = true;

    this.authService.login(this.username, this.password).subscribe({
      next: () => {
        this.submitting = false;
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.error = err.error?.detail || 'Invalid username or password';
        this.submitting = false;
      }
    });
  }
}
