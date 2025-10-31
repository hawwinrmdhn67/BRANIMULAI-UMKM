"use client";

import { Card, CardContent, CardHeader } from "../ui/card";

interface UMKMMapProps {
  coordinates?: {
    lat: number;
    lng: number;
  };
  // new prop: a Google Maps link or any embeddable maps url
  locationLink?: string;
}

export function UMKMMap({ coordinates, locationLink }: UMKMMapProps) {
  // prefer explicit locationLink when provided
  let src: string | null = null;

  if (locationLink) {
    src = locationLink;
    // if it's a google maps url but missing output=embed, try to append it
    if (locationLink) {
      if (locationLink.includes("maps.app.goo.gl")) {
          // convert short link to search embed
          src = `https://www.google.com/maps?q=${encodeURIComponent(locationLink)}&output=embed`;
          } else {
            src = locationLink;
            if (src.includes("google.com") && !src.includes("output=embed")) {
              src = src.includes("?") ? `${src}&output=embed` : `${src}?output=embed`;
            }
          }
        }
    } else if (coordinates && coordinates.lat != null && coordinates.lng != null) {
    src = `https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=id&z=15&output=embed`;
  }

  if (!src) {
    return (
      <Card>
        <CardHeader>
          <h3>Lokasi</h3>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">Lokasi tidak tersedia.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <h3>Lokasi</h3>
      </CardHeader>
      <CardContent className="p-4"> {/* kasih padding agar tidak mepet */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            title="UMKM Location"
            src={src}
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            loading="lazy"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
