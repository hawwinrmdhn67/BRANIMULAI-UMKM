"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";

interface UMKMPhotosProps {
  name: string;
  photos?: string[];
}

export function UMKMPhotos({ name, photos }: UMKMPhotosProps) {
  if (!photos || photos.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <h3>Galeri Foto</h3>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-video overflow-hidden rounded-lg"
            >
              <ImageWithFallback
                src={photo}
                alt={`${name} - Foto ${index + 1}`}
                className="w-full h-full object-cover hover:scale-105 transition-transform"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
