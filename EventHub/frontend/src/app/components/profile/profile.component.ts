import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/models';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  template: `
    <div class="profile-page">
      <div class="container profile-layout">
        <header class="profile-header animate-fade-in">
          <h1 class="profile-title">Digital <span class="accent-glow">Identity</span></h1>
          <p class="profile-subtitle">Personalize your presence in the EventHub ecosystem</p>
        </header>

        <div class="glass profile-matte-card animate-scale-in">
          @if (loading) {
            <div class="profile-loader">
              <div class="spinner-premium"></div>
              <p>Syncing identity...</p>
            </div>
          } @else if (user) {
            <form (ngSubmit)="onSubmit()" class="premier-profile-form">
              <!-- Section: Authentication -->
              <section class="profile-section">
                <h2 class="section-tag">Authentication</h2>
                <div class="grid-fields">
                  <div class="field-item">
                    <label class="field-lbl">Username</label>
                    <input type="text" [value]="user.username" class="field-input readonly" disabled>
                    <span class="field-hint">Fixed identifier</span>
                  </div>
                  <div class="field-item">
                    <label class="field-lbl">Email Address</label>
                    <input type="email" [value]="user.email" class="field-input readonly" disabled>
                    <span class="field-hint">Verified access</span>
                  </div>
                </div>
              </section>

              <!-- Section: Personal Details -->
              <section class="profile-section">
                <h2 class="section-tag">Identity Details</h2>
                <div class="grid-fields">
                  <div class="field-item">
                    <label class="field-lbl">First Name</label>
                    <input
                      type="text"
                      [(ngModel)]="formData.first_name"
                      name="first_name"
                      class="field-input"
                      placeholder="Enter first name"
                    >
                  </div>
                  <div class="field-item">
                    <label class="field-lbl">Last Name</label>
                    <input
                      type="text"
                      [(ngModel)]="formData.last_name"
                      name="last_name"
                      class="field-input"
                      placeholder="Enter last name"
                    >
                  </div>
                </div>

                <div class="field-item">
                  <label class="field-lbl">Professional Bio</label>
                  <textarea
                    [(ngModel)]="formData.profile.bio"
                    name="bio"
                    class="field-input h-32"
                    placeholder="Share your story with the community..."
                  ></textarea>
                </div>
              </section>

              <!-- Section: Connectivity -->
              <section class="profile-section">
                <h2 class="section-tag">Connectivity</h2>
                <div class="grid-fields">
                  <div class="field-item">
                    <label class="field-lbl">Contact Phone</label>
                    <input
                      type="tel"
                      [(ngModel)]="formData.profile.phone"
                      name="phone"
                      class="field-input"
                      placeholder="+1 (555) 000-0000"
                    >
                  </div>
                  <div class="field-item">
                    <label class="field-lbl">Base Location</label>
                    <input
                      type="text"
                      [(ngModel)]="formData.profile.location"
                      name="location"
                      class="field-input"
                      placeholder="City, Country"
                    >
                  </div>
                </div>

                <div class="field-item">
                  <label class="field-lbl">Digital Portfolio (Website)</label>
                  <input
                    type="url"
                    [(ngModel)]="formData.profile.website"
                    name="website"
                    class="field-input"
                    placeholder="https://yourpage.com"
                  >
                </div>
              </section>

              <!-- Feedback -->
              @if (error) { <div class="alert-box-error animate-fade-in">{{ error }}</div> }
              @if (success) { <div class="alert-box-success animate-fade-in">{{ success }}</div> }

              <footer class="profile-footer">
                <button type="submit" class="btn-primary-glow" [disabled]="submitting">
                  {{ submitting ? 'Updating...' : 'Save Preferences' }}
                </button>
              </footer>
            </form>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-page { min-height: 100vh; background: var(--background); padding-top: 8rem; padding-bottom: 5rem; }
    .profile-layout { max-width: 800px !important; margin: 0 auto; }

    .profile-header { text-align: center; margin-bottom: 3.5rem; }
    .profile-title { font-size: 2.5rem; font-weight: 800; color: white; letter-spacing: -0.02em; }
    .accent-glow { color: var(--primary); text-shadow: 0 0 20px rgba(56, 189, 248, 0.3); }
    .profile-subtitle { color: var(--muted-foreground); margin-top: 0.5rem; }

    .profile-matte-card { padding: 3.5rem; border-radius: 2.5rem; background: rgba(255,255,255,0.02); border: 1px solid var(--border); }
    .premier-profile-form { display: flex; flex-direction: column; gap: 3.5rem; }

    .profile-section { display: flex; flex-direction: column; gap: 1.5rem; }
    .section-tag { font-size: 0.75rem; font-weight: 800; color: var(--primary); text-transform: uppercase; letter-spacing: 0.15em; opacity: 0.6; }

    .field-item { display: flex; flex-direction: column; gap: 0.625rem; }
    .field-lbl { font-size: 0.8125rem; font-weight: 700; color: var(--muted-foreground); margin-left: 0.25rem; }
    .field-hint { font-size: 0.6875rem; color: var(--muted-foreground); opacity: 0.4; margin-left: 0.25rem; }
    
    .field-input {
      background: rgba(255, 255, 255, 0.03); border: 1px solid var(--border);
      border-radius: 1rem; padding: 1rem 1.25rem; color: white; font-size: 0.9375rem; transition: all 0.2s;
    }
    .field-input:focus { outline: none; border-color: var(--primary); background: rgba(255,255,255,0.05); box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.1); }
    .field-input.readonly { opacity: 0.5; cursor: not-allowed; border-style: dashed; }
    .h-32 { height: 7rem; resize: none; }

    .grid-fields { display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem; }
    @media (max-width: 640px) { .grid-fields { grid-template-columns: 1fr; } }

    .btn-primary-glow {
      padding: 1.125rem 2.5rem; background: var(--primary); color: white; border-radius: 1.25rem;
      font-weight: 800; font-size: 1rem; cursor: pointer; transition: all 0.2s; width: 100%;
      box-shadow: 0 10px 25px rgba(56, 189, 248, 0.2);
    }
    .btn-primary-glow:hover:not(:disabled) { transform: translateY(-2px); box-shadow: 0 15px 35px rgba(56, 189, 248, 0.3); }

    .alert-box-error { padding: 1rem; background: rgba(244, 63, 94, 0.1); border-left: 4px solid #f43f5e; color: #f43f5e; font-size: 0.875rem; font-weight: 600; border-radius: 0.75rem; }
    .alert-box-success { padding: 1rem; background: rgba(34, 197, 94, 0.1); border-left: 4px solid #22c55e; color: #22c55e; font-size: 0.875rem; font-weight: 600; border-radius: 0.75rem; }

    .profile-loader { text-align: center; padding: 5rem 0; color: var(--muted-foreground); }
    .spinner-premium { width: 32px; height: 32px; border: 2px solid rgba(56, 189, 248, 0.1); border-top-color: var(--primary); border-radius: 50%; animation: spin 0.8s linear infinite; margin: 0 auto 1.5rem; }

    @keyframes spin { to { transform: rotate(360deg); } }
    @media (max-width: 640px) { .profile-matte-card { padding: 2rem; } }
  `]
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loading = false;
  submitting = false;
  error = '';
  success = '';

  formData = {
    first_name: '',
    last_name: '',
    profile: {
      bio: '',
      phone: '',
      location: '',
      website: '',
      avatar: null as string | null
    }
  };

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile(): void {
    this.loading = true;
    this.authService.getProfile().subscribe({
      next: (user) => {
        this.user = user;
        this.formData = {
          first_name: user.first_name,
          last_name: user.last_name,
          profile: {
            bio: user.profile.bio,
            phone: user.profile.phone,
            location: user.profile.location,
            website: user.profile.website,
            avatar: user.profile.avatar
          }
        };
        this.loading = false;
      },
      error: (err) => {
        console.error('Failed to load profile:', err);
        this.error = 'Failed to load profile';
        this.loading = false;
      }
    });
  }

  onSubmit(): void {
    this.error = '';
    this.success = '';
    this.submitting = true;

    this.authService.updateProfile(this.formData).subscribe({
      next: (user) => {
        this.user = user;
        this.success = 'Profile updated successfully!';
        this.submitting = false;
      },
      error: (err) => {
        console.error('Update failed:', err);
        this.error = err.error?.detail || 'Failed to update profile';
        this.submitting = false;
      }
    });
  }
}
