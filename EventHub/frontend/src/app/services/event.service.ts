import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event, Category, Registration, PaginatedResponse } from '../models/models';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class EventService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http
      .get<Category[] | PaginatedResponse<Category>>(`${this.apiUrl}/categories/`)
      .pipe(map(response => Array.isArray(response) ? response : response.results));
  }

  createCategory(data: { name: string; description: string }): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/categories/`, data);
  }

  getEvents(params?: {
    category?: number;
    search?: string;
    ordering?: string;
    is_free?: boolean;
    is_online?: boolean;
    page?: number;
  }): Observable<PaginatedResponse<Event>> {
    let httpParams = new HttpParams();
    if (params) {
      if (params.category) httpParams = httpParams.set('category', params.category.toString());
      if (params.search) httpParams = httpParams.set('search', params.search);
      if (params.ordering) httpParams = httpParams.set('ordering', params.ordering);
      if (params.is_free) httpParams = httpParams.set('is_free', 'true');
      if (params.is_online) httpParams = httpParams.set('is_online', 'true');
      if (params.page) httpParams = httpParams.set('page', params.page.toString());
    }
    return this.http.get<PaginatedResponse<Event>>(`${this.apiUrl}/events/`, { params: httpParams });
  }

  getEvent(id: number): Observable<Event> {
    return this.http.get<Event>(`${this.apiUrl}/events/${id}/`);
  }

  createEvent(data: any): Observable<Event> {
    return this.http.post<Event>(`${this.apiUrl}/events/`, data);
  }

  updateEvent(id: number, data: any): Observable<Event> {
    return this.http.put<Event>(`${this.apiUrl}/events/${id}/`, data);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/events/${id}/`);
  }

  registerForEvent(eventId: number, notes: string = ''): Observable<Registration> {
    return this.http.post<Registration>(`${this.apiUrl}/events/${eventId}/register/`, { notes });
  }

  cancelRegistration(eventId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/events/${eventId}/cancel/`, {});
  }

  getMyEvents(): Observable<PaginatedResponse<Event>> {
    return this.http.get<PaginatedResponse<Event>>(`${this.apiUrl}/my-events/`);
  }

  getMyRegistrations(): Observable<PaginatedResponse<Registration>> {
    return this.http.get<PaginatedResponse<Registration>>(`${this.apiUrl}/my-registrations/`);
  }

  // --- Organizer/Check-in Features ---

  /**
   * Validates a ticket by its unique UUID.
   * Can only be performed by the event organizer.
   */
  checkIn(uuid: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/registrations/check-in/${uuid}/`, {});
  }

  /**
   * Retrieves real-time statistics for an organized event.
   */
  getEventStats(eventId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/events/${eventId}/stats/`);
  }

  /**
   * Retrieves all confirmed registrations for a specific event.
   */
  getEventRegistrations(eventId: number): Observable<Registration[]> {
    return this.http.get<Registration[]>(`${this.apiUrl}/events/${eventId}/registrations/`);
  }
}
