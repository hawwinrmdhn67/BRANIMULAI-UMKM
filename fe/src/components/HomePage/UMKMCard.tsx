"use client";

import { useState, useEffect } from "react";
import { UMKM } from "../../lib/types";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MapPin } from "lucide-react";

interface UMKMCardProps {
  umkm: UMKM;
  onViewDetail: (id: string) => void;
}

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  fallbackSrc?: string;
}

function ImageWithFallback({ src, fallbackSrc = "/no-image.jpg", ...props }: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(fallbackSrc);

  useEffect(() => {
    if (!src) return setImgSrc(fallbackSrc);
    setImgSrc(src);
  }, [src, fallbackSrc]);

  return <img {...props} src={imgSrc} onError={() => setImgSrc(fallbackSrc)} />;
}

function getUMKMPhoto(umkm: UMKM): string | undefined {
  return umkm.photos && umkm.photos.length > 0 ? umkm.photos[0] : undefined;
}

export function UMKMCard({ umkm, onViewDetail }: UMKMCardProps) {
  const photoUrl = getUMKMPhoto(umkm);

  return (
    <Card
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => onViewDetail(umkm.id)}
    >
      <div className="relative h-48 overflow-hidden">
        <ImageWithFallback
          src={photoUrl || undefined}
          alt={umkm.name}
          className="w-full h-full object-cover"
        />
        <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
          {umkm.category}
        </Badge>
      </div>

      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg">{umkm.name}</h3>
      </CardHeader>

      <CardContent className="pb-3">
        <p className="text-muted-foreground line-clamp-2 mb-3">{umkm.description}</p>
        <div className="flex items-start gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
          <p className="line-clamp-1">{umkm.address}</p>
        </div>
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-primary hover:bg-green-700"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            onViewDetail(umkm.id);
          }}
        >
          Lihat Detail
        </Button>
      </CardFooter>
    </Card>
  );
}
