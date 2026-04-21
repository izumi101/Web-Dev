import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { ConfirmModalComponent } from './components/shared/confirm-modal/confirm-modal.component';
import { ToastContainerComponent } from './components/shared/toast-container/toast-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ConfirmModalComponent, ToastContainerComponent],
  template: `
    <div class="app-wrapper relative">
      <app-navbar />
      <main class="main-content">
        <router-outlet />
      </main>
      <app-footer />
      <app-confirm-modal />
      <app-toast-container />
    </div>
  `,
  styles: [`
    .app-wrapper {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }
    .main-content {
      flex: 1;
    }
  `]
})
export class AppComponent {
  title = 'EventHub';
}
