import React, { useState } from 'react';
import { MapPin, Store, Users, ArrowRight } from 'lucide-react';

interface HotSpot {
  id: string;
  name: string;
  location: string;
  description: string;
  umkmCount: number;
  image: string;
  category: string;
  types: string[]; // makanan, minuman, kerajinan, dll
}

export function HotSpot() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');

  // Data Hot Spot
  const hotSpots: HotSpot[] = [
    {
      id: '1',
      name: 'Pasar Tradisional Lamongan',
      location: 'Jl. Panglima Sudirman, Lamongan',
      description: 'Pusat perdagangan tradisional dengan berbagai UMKM makanan, kerajinan, dan produk lokal.',
      umkmCount: 45,
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80',
      category: 'Pasar Tradisional',
      types: ['Makanan', 'Minuman', 'Kerajinan', 'Jasa']
    },
    {
      id: '2',
      name: 'Sentra Kerajinan Bambu',
      location: 'Desa Sukomalo, Lamongan',
      description: 'Kawasan sentra industri kerajinan bambu dengan berbagai produk unik dan berkualitas.',
      umkmCount: 32,
      image: 'https://images.unsplash.com/photo-1452860606245-08befc0ff44b?w=800&q=80',
      category: 'Sentra Kerajinan',
      types: ['Kerajinan']
    },
    {
      id: '3',
      name: 'Kawasan Kuliner Tanjung',
      location: 'Pantai Tanjung Kodok, Lamongan',
      description: 'Destinasi wisata kuliner dengan puluhan UMKM makanan laut dan oleh-oleh khas Lamongan.',
      umkmCount: 38,
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
      category: 'Kuliner',
      types: ['Makanan', 'Minuman']
    },
    {
      id: '4',
      name: 'Alun-Alun Lamongan',
      location: 'Pusat Kota Lamongan',
      description: 'Pusat keramaian dengan berbagai stand UMKM fashion, aksesoris, dan jajanan.',
      umkmCount: 28,
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80',
      category: 'Ruang Publik',
      types: ['Makanan', 'Minuman', 'Kerajinan']
    },
    {
      id: '5',
      name: 'Desa Wisata Sendangagung',
      location: 'Kec. Paciran, Lamongan',
      description: 'Desa wisata dengan berbagai UMKM produk pertanian organik dan olahan hasil bumi.',
      umkmCount: 25,
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&q=80',
      category: 'Desa Wisata',
      types: ['Makanan', 'Minuman']
    },
    {
      id: '6',
      name: 'Sentra Batik Lamongan',
      location: 'Jl. Veteran, Lamongan',
      description: 'Kawasan pengrajin batik dengan motif khas Lamongan dan produk fashion lokal.',
      umkmCount: 20,
      image: 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&q=80',
      category: 'Sentra Kerajinan',
      types: ['Kerajinan']
    }
  ];

  // Filter logic
  const filteredHotSpots = selectedFilter === 'Semua' 
    ? hotSpots 
    : hotSpots.filter(spot => spot.types.includes(selectedFilter));

  const filters = ['Semua', 'Makanan', 'Minuman', 'Kerajinan', 'Jasa'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100">
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">Hot Spot UMKM Lamongan</h1>
            <p className="text-base text-white mb-2">
              Temukan lokasi-lokasi berkumpulnya UMKM terbaik di Lamongan
            </p>
            <p className="text-sm text-green-100">
              Kunjungi langsung dan dukung produk lokal!
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Lokasi</p>
                <p className="text-xl font-medium">{filteredHotSpots.length} Hot Spot</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total UMKM</p>
                <p className="text-xl font-medium">
                  {filteredHotSpots.reduce((sum, spot) => sum + spot.umkmCount, 0)} UMKM
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Kategori</p>
                <p className="text-xl font-medium">
                  {new Set(hotSpots.map(spot => spot.category)).size} Kategori
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFilter === filter
                  ? 'bg-primary text-white'
                  : 'bg-white text-foreground hover:bg-green-50'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted-foreground mt-3">
          Menampilkan {filteredHotSpots.length} lokasi
        </p>
      </section>

      {/* Hot Spots Grid */}
      <section className="container mx-auto px-4 pb-8">
        {filteredHotSpots.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredHotSpots.map((spot) => (
              <div
                key={spot.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={spot.image}
                    alt={spot.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-3 right-3 bg-white rounded-lg px-2 py-1">
                    <p className="text-xs font-medium text-green-700">{spot.category}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="font-medium text-base mb-2 line-clamp-1">{spot.name}</h3>
                  
                  <div className="flex items-start gap-2 mb-3">
                    <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                    <p className="text-sm text-muted-foreground line-clamp-2">{spot.location}</p>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {spot.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {spot.types.map((type, index) => (
                      <span key={index} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-2">
                      <Store className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">
                        {spot.umkmCount} UMKM
                      </span>
                    </div>
                    <button className="flex items-center gap-1 text-sm text-primary hover:text-green-700 transition-colors">
                      Lihat Detail
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Store className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-base text-muted-foreground">
              Tidak ada Hot Spot untuk kategori "{selectedFilter}"
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 pb-8">
        <div className="bg-primary rounded-lg p-8 text-center text-white">
          <h2 className="text-xl font-medium mb-2">Punya Rekomendasi Hot Spot?</h2>
          <p className="text-sm text-white mb-4">
            Bantu kami menemukan lokasi UMKM lainnya di Lamongan
          </p>
          <button className="bg-white text-primary px-6 py-2 rounded-md font-medium hover:bg-green-50 transition-colors">
            Usulkan Lokasi
          </button>
        </div>
      </section>
    </div>
  );
}