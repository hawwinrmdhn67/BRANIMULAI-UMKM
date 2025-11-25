export interface UMKM {
  message: string;
  id: string;
  name: string;
  category: string;
  description: string;
  address: string;
  // coordinates may be present as numeric lat/lng (old model)
  coordinates?: {
    lat: number;
    lng: number;
  };
  // or a single location link can be provided (new model)
  locationLink?: string;
  photos: string[];
  phone?: string;
  whatsapp?: string;
  mapsLink?: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

export type CategoryFilter = "Semua" | "Makanan" | "Minuman" | "Jasa" | "Kerajinan";