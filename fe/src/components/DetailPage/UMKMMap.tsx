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
    <Card className="w-full">
      <CardHeader>
        <h3>Lokasi</h3>
      </CardHeader>
      <CardContent className="p-4"> {/* kasih padding agar tidak mepet */}
        <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
          <iframe
            title="UMKM Location"
            src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&hl=id&z=15&output=embed`}
            className="absolute top-0 left-0 w-full h-full rounded-xl"
            loading="lazy"
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
