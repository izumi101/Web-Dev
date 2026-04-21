import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/payments`;

  constructor(private http: HttpClient) {}

  createCheckoutSession(registrationId: number): Observable<{ checkout_url: string; session_id: string }> {
    return this.http.post<{ checkout_url: string; session_id: string }>(
      `${this.apiUrl}/create-checkout/${registrationId}/`, {}
    );
  }

  verifyPayment(sessionId: string): Observable<{ status: string; event_title: string; amount: string }> {
    return this.http.get<{ status: string; event_title: string; amount: string }>(
      `${this.apiUrl}/verify/`, { params: { session_id: sessionId } }
    );
  }
}
