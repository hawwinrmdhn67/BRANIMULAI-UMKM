"use client";

import { Card, CardContent, CardHeader } from "../ui/card";

interface UMKMMapProps {
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export function UMKMMap({ coordinates }: UMKMMapProps) {
  if (!coordinates || !coordinates.lat || !coordinates.lng) {
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
    <Card>
      <CardHeader>
        <h3>Lokasi</h3>
      </CardHeader>
      <CardContent>
        <iframe
          title="UMKM Location"
          src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=id&z=15&output=embed`}
          className="w-full h-64 rounded-xl"
          loading="lazy"
        ></iframe>
      </CardContent>
    </Card>
  );
}
