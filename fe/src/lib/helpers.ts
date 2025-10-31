import { UMKM } from "./types";

export function mapUMKMCoordinates(umkm: any): UMKM {
  return {
    ...umkm,
    coordinates: {
      lat: umkm.latitude,
      lng: umkm.longitude,
    },
  };
}
