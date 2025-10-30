"use client";

import { Card, CardContent, CardHeader } from "../ui/card";

interface UMKMDetailsProps {
  category: string;
  address: string;
  createdAt: string;
}

export function UMKMDetails({ category, address, createdAt }: UMKMDetailsProps) {
  // Format tanggal agar lebih rapi (contoh: "28 Oktober 2025")
  const formattedDate = new Date(createdAt).toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <Card>
      <CardHeader>
        <h3>Detail Tambahan</h3>
      </CardHeader>

      <CardContent className="space-y-2 text-gray-700">
        <div>
          <p className="font-medium">Kategori:</p>
          <p>{category}</p>
        </div>

        <div>
          <p className="font-medium">Alamat:</p>
          <p>{address}</p>
        </div>

        <div>
          <p className="font-medium">Bergabung Sejak:</p>
          <p>{formattedDate}</p>
        </div>
      </CardContent>
    </Card>
  );
}
