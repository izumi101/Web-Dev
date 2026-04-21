import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User, AuthResponse } from '../models/models';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUser();
  }

  private loadUser(): void {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.currentUserSubject.next(JSON.parse(userData));
    }
  }

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  register(
    username: string, 
    email: string, 
    password: string, 
    password2: string,
    first_name: string = '',
    last_name: string = '',
    phone: string = '',
    role: string = 'attendee'
  ): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register/`, {
      username, email, password, password2, first_name, last_name, phone, role
    }).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, {
      username, password
    }).pipe(
      tap(res => this.handleAuth(res))
    );
  }

  logout(): void {
    const refresh = localStorage.getItem('refresh_token');
    this.http.post(`${this.apiUrl}/logout/`, { refresh }).subscribe();
    this.forceLogout();
  }

  /** Clear auth state locally without API call (used when tokens are expired) */
  forceLogout(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }

  getProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/profile/`).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  updateProfile(data: any): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/profile/`, data).pipe(
      tap(user => {
        localStorage.setItem('user', JSON.stringify(user));
        this.currentUserSubject.next(user);
      })
    );
  }

  refreshToken(): Observable<any> {
    const refresh = localStorage.getItem('refresh_token');
    return this.http.post<any>(`${this.apiUrl}/token/refresh/`, { refresh }).pipe(
      tap(res => {
        localStorage.setItem('access_token', res.access);
      })
    );
  }

  private handleAuth(res: AuthResponse): void {
    localStorage.setItem('access_token', res.tokens.access);
    localStorage.setItem('refresh_token', res.tokens.refresh);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.currentUserSubject.next(res.user);
  }

  // ---- Password Reset Flow ---- //

  requestPasswordReset(identifier: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/password-reset/request/`, { identifier });
  }

  verifyResetCode(identifier: string, code: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/password-reset/verify/`, { identifier, code });
  }

  confirmPasswordReset(resetToken: string, newPassword: string, newPassword2: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/password-reset/confirm/`, {
      reset_token: resetToken,
      new_password: newPassword,
      new_password2: newPassword2,
    });
  }
}
