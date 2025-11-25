import { UMKM } from "./types";

// Map raw DB row to frontend UMKM shape.
// Support both older numeric latitude/longitude and new location_link.
export function mapUMKMCoordinates(umkm: any): UMKM {
  const mapped: any = { ...umkm };

  // parse photos if stored as JSON string
  if (typeof mapped.photos === "string") {
    try {
      mapped.photos = JSON.parse(mapped.photos);
    } catch (e) {
      mapped.photos = [];
    }
  }

  if (umkm.location_link) {
    mapped.locationLink = umkm.location_link;
  } else if (umkm.locationLink) {
    // already camelCase
    mapped.locationLink = umkm.locationLink;
  }

  if (umkm.latitude != null && umkm.longitude != null) {
    mapped.coordinates = {
      lat: Number(umkm.latitude),
      lng: Number(umkm.longitude),
    };
  }

  return mapped as UMKM;
}
