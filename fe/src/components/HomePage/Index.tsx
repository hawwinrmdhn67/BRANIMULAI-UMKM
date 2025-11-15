"use client";

import { useState } from "react";
import { UMKM, CategoryFilter as CategoryType } from "../../lib/types";
import { UMKMCard } from "./UMKMCard";
import { SearchBar } from "./SearchBar";
import { CategoryFilter } from "./CategoryFilter";

interface HomePageProps {
  umkmList: UMKM[];
  onViewDetail: (id: string) => void;
}

const categories: CategoryType[] = ["Semua", "Makanan", "Minuman", "Jasa", "Kerajinan"];

export function HomePage({ umkmList, onViewDetail }: HomePageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("Semua");

  const approvedUMKM = umkmList.filter((umkm) => umkm.status === "approved");

  const filteredUMKM = approvedUMKM.filter((umkm) => {
    const matchesSearch = umkm.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Semua" || umkm.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Hero Section */}
      <div className="hero-umkm text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-white mb-4">Direktori UMKM Lamongan</h1>
          <p className="text-green-50 mb-8 max-w-2xl mx-auto">
            Temukan dan dukung UMKM lokal di sekitar Anda. Jelajahi berbagai produk dan layanan dari pengusaha lokal.
          </p>
          <SearchBar query={searchQuery} onChange={setSearchQuery} />
        </div>
      </div>

      {/* Filter & Content */}
      <div className="container mx-auto px-4 py-8">
        <CategoryFilter
          categories={categories}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
        />

        <p className="text-muted-foreground mb-4">
          Menampilkan {filteredUMKM.length} UMKM
        </p>

        {filteredUMKM.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUMKM.map((umkm) => (
              <UMKMCard key={umkm.id} umkm={umkm} onViewDetail={onViewDetail} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Tidak ada UMKM yang ditemukan.</p>
          </div>
        )}
      </div>
    </div>
  );
}
