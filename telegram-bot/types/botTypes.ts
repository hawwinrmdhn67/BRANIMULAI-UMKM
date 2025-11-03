export interface Coordinates {
  lat: number;
  lng: number;
}

export interface UMKM {
  id?: number;
  name: string;
  category: string;
  description: string;
  address: string;
  coordinates: Coordinates;
  photos: string[];
  phone?: string;
  whatsapp?: string;
  mapsLink: string;
  status: "pending" | "approved" | "rejected";
  message?: string;
}

export interface UserState {
  step: number;
  name?: string;
  category?: string;
  description?: string;
  address?: string;
  mapsLink?: string;
  photoUrl?: string;
  phone?: string;
  whatsapp?: string;
  photos?: string[];
}
