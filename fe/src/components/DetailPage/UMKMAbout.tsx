"use client";

import { Card, CardContent, CardHeader } from "../ui/card";

interface UMKMAboutProps {
  description: string;
}

export function UMKMAbout({ description }: UMKMAboutProps) {
  return (
    <Card>
      <CardHeader>
        <h3>Tentang UMKM</h3>
      </CardHeader>

      <CardContent>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </CardContent>
    </Card>
  );
}
