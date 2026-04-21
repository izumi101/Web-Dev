export interface UserProfile {
  bio: string;
  phone: string;
  avatar: string | null;
  location: string;
  website: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  profile: UserProfile;
  is_superuser?: boolean;
  is_staff?: boolean;
}

export interface AuthResponse {
  user: User;
  tokens: {
    refresh: string;
    access: string;
  };
}

export interface Category {
  id: number;
  name: string;
  description: string;
  icon: string;
  event_count: number;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  organizer: {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
  };
  category: Category;
  date: string;
  end_date: string | null;
  location: string;
  address: string;
  image: string | null;
  price: string;
  max_participants: number;
  status: string;
  is_online: boolean;
  online_link: string;
  available_spots: number;
  is_free: boolean;
  registered_count: number;
  created_at: string;
}

export interface Registration {
  id: number;
  event: Event;
  username: string;
  status: string;
  registered_at: string;
  notes: string;
  ticket_uuid: string;
  is_checked_in: boolean;
  checked_in_at: string | null;
}

export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
