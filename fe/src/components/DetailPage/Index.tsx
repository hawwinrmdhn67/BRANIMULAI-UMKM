"use client";

import { UMKM } from "../../lib/types";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";
import { UMKMPhotos } from "./UMKMPhotos";
import { UMKMAbout } from "./UMKMAbout";
import { UMKMMap } from "./UMKMMap";
import { UMKMContact } from "./UMKMContact";
import { UMKMDetails } from "./UMKMDetails";

interface DetailPageProps {
  umkm: UMKM;
  onBack: () => void;
}

export function DetailPage({ umkm, onBack }: DetailPageProps) {
  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <div className="bg-primary text-white py-6">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="text-white hover:bg-green-700 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>

          <div>
            <h1 className="text-white text-lg font-semibold">{umkm.name}</h1>

            {/* Mini card kategori lebih menonjol */}
            <div className="inline-block bg-white text-primary text-sm font-semibold px-3 py-1 rounded-xl mt-4">
              {umkm.category}
            </div>
          </div>
        </div>  
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Kolom kiri */}
          <div className="lg:col-span-2 space-y-6">
            <UMKMPhotos name={umkm.name} photos={umkm.photos} />

            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <UMKMAbout description={umkm.description} />
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <UMKMMap coordinates={umkm.coordinates} />
            </div>
          </div>

          {/* Kolom kanan */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-2xl shadow-sm">
              <UMKMContact phone={umkm.phone} whatsapp={umkm.whatsapp} />
            </div>

            <UMKMDetails
              category={umkm.category}
              address={umkm.address}
              createdAt={umkm.createdAt}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
