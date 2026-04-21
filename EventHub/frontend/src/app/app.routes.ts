import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

import { HomeComponent } from './components/home/home.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { EventFormComponent } from './components/event-form/event-form.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { MyEventsComponent } from './components/my-events/my-events.component';
import { MyRegistrationsComponent } from './components/my-registrations/my-registrations.component';
import { PaymentSuccessComponent } from './components/payment-success/payment-success.component';
import { PaymentCancelComponent } from './components/payment-cancel/payment-cancel.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'EventHub — Discover Events' },
  { path: 'events/:id', component: EventDetailComponent, title: 'EventHub — Event Details' },
  { path: 'create-event', component: EventFormComponent, canActivate: [authGuard], title: 'EventHub — Create Event' },
  { path: 'edit-event/:id', component: EventFormComponent, canActivate: [authGuard], title: 'EventHub — Edit Event' },
  { path: 'login', component: LoginComponent, title: 'EventHub — Sign In' },
  { path: 'forgot-password', loadComponent: () => import('./components/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent), title: 'EventHub — Reset Password' },
  { path: 'register', component: RegisterComponent, title: 'EventHub — Create Account' },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard], title: 'EventHub — Profile' },
  { path: 'my-events', component: MyEventsComponent, canActivate: [authGuard], title: 'EventHub — My Events' },
  { path: 'my-registrations', component: MyRegistrationsComponent, canActivate: [authGuard], title: 'EventHub — My Tickets' },
  { path: 'organizer/dashboard', loadComponent: () => import('./components/dashboard/dashboard.component').then(m => m.DashboardComponent), canActivate: [authGuard], title: 'EventHub — Organizer Dashboard' },
  { path: 'organizer/events/:id/attendees', loadComponent: () => import('./components/attendee-list/attendee-list.component').then(m => m.AttendeeListComponent), canActivate: [authGuard], title: 'EventHub — Attendee List' },
  { path: 'validate/:uuid', loadComponent: () => import('./components/validate-ticket/validate-ticket.component').then(m => m.ValidateTicketComponent), canActivate: [authGuard], title: 'EventHub — Validate Ticket' },
  { path: 'payment/success', component: PaymentSuccessComponent, title: 'EventHub — Payment Success' },
  { path: 'payment/cancel', component: PaymentCancelComponent, title: 'EventHub — Payment Cancelled' },
  { path: '**', component: NotFoundComponent, title: 'EventHub — Page Not Found' },
];
