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
  types: string[];
}

export function HotSpot() {
  const [selectedFilter, setSelectedFilter] = useState<string>('Semua');

  // Data Hot Spot
  const hotSpots: HotSpot[] = [
    {
      id: '1',
      name: 'Pusat Kuliner Lamongan',
      location: 'Jl. Panglima Sudirman, Lamongan',
      description: 'Pusat perdagangan kuliner dengan berbagai UMKM makanan khas lamongan dan nasional.',
      umkmCount: 12,
      image: '/img/pusat.jpeg',
      category: 'Pusat Makanan',
      types: ['Makanan', 'Minuman']
    },
    {
      id: '2',
      name: 'Pusat Jajanan & Permainan Anak-Anak',
      location: 'Pusat Kota Lamongan',
      description: 'Kawasan sentra jajanan dan berbagai permainan anak anak dan keluarga.',
      umkmCount: 32,
      image: '/img/jajanan.jpeg',
      category: 'Pusat Makanan dan Permainan',
      types: ['Kerajinan']
    },
    {
      id: '3',
      name: 'Sentra Kuliner Andasari',
      location: 'Jl Andasari, Lamongan',
      description: 'Destinasi wisata kuliner dengan puluhan UMKM makanan khas lamongan hingga makanan laut dan oleh-oleh khas Lamongan.',
      umkmCount: 23,
      image: '/img/sentra.jpeg',
      category: 'Kuliner',
      types: ['Makanan', 'Minuman']
    },
    {
      id: '4',
      name: 'Pasar Buah Lamongan',
      location: 'Jl Kusuma Bangsa,Lamongan',
      description: 'Pusat perdagangan berbagai macam buah lamongan dengan kualitas tinggi harga merakyat.',
      umkmCount: 43,
      image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e?w=800&q=80',
      category: 'Pusat Buah-Buahan',
      types: ['Buah-Buahan','Sayuran']
    },
    {
      id: '5',
      name: 'Pusat Nasi Boran Belakang Gedung Pemda Lamongan',
      location: 'Jl KH. Ahmad Dahlan, Lamongan',
      description: 'Perkumpulan para pedagang nasi boran yang aktif sejak 2010 dari pagi sampai jam 6 malam.',
      umkmCount: 5,
      image: '/img/boran.jpeg',
      category: 'Kuliner',
      types: ['Makanan', 'Minuman']
    },
    {
      id: '6',
      name: 'Desa Wisata Sendangagung',
      location: 'Kec. Paciran, Lamongan',
      description: 'Desa wisata dengan berbagai UMKM produk pertanian organik dan olahan hasil bumi.',
      umkmCount: 25,
      image: 'https://jadesta.kemenparekraf.go.id/imgpost/94059_medium.jpg',
      category: 'Desa Wisata',
      types: ['Makanan', 'Minuman']
    },
    {
      id: '7',
      name: 'Sentra Batik Lamongan',
      location: 'Jl. Veteran, Lamongan',
      description: 'Kawasan pengrajin batik dengan motif khas Lamongan dan produk fashion lokal.',
      umkmCount: 8,
      image: 'https://asset.kompas.com/crops/HbK2EboXX66I8ZrgEbWKQFt_HNQ=/0x0:0x0/375x240/data/photo/2024/10/02/66fd4fabeb34b.jpg',
      category: 'Sentra Kerajinan',
      types: ['Kerajinan']
    },
    {
      id: '8',
      name: 'Moola(Mall Oleh Oleh Kabupaten Lamongan)',
      location: 'Jl. Panglima Sudirman No 94, Lamongan',
      description: 'Pusat Oleh Oleh Kabupaten Lamongan, dari jajanan,kerajinan sampai batik dengan motif khas Lamongan dan produk fashion lokal.',
      umkmCount: 1,
      image: 'https://api.minio.jatimprov.go.id/kominfo-jatim/images/IMG-20240725-WA0060.jpg',
      category: 'Mall',
      types: ['Kerajinan','Makanan','Minuman']
    }
  ];

  // Filter logic
  const filteredHotSpots = selectedFilter === 'Semua' 
    ? hotSpots 
    : hotSpots.filter(spot => spot.types.includes(selectedFilter));

  const filters = ['Semua', 'Makanan', 'Minuman', 'Kerajinan', 'Jasa'];

  return (
    <div className="hotspot-wrapper">
      {/* Hero Section */}
      <section className="hotspot-hero">
        <div className="hotspot-hero-container">
          <div className="hotspot-hero-content">
            <h1 className="hotspot-hero-title">Hot Spot UMKM Lamongan</h1>
            <p className="hotspot-hero-subtitle">
              Temukan lokasi-lokasi berkumpulnya UMKM terbaik di Lamongan
            </p>
            <p className="hotspot-hero-text">
              Kunjungi langsung dan dukung produk lokal!
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="hotspot-stats">
        <div className="hotspot-stats-grid">
          <div className="hotspot-stat-card">
            <div className="hotspot-stat-content">
              <div className="hotspot-stat-icon">
                <MapPin />
              </div>
              <div>
                <p className="hotspot-stat-label">Total Lokasi</p>
                <p className="hotspot-stat-value">{filteredHotSpots.length} Hot Spot</p>
              </div>
            </div>
          </div>

          <div className="hotspot-stat-card">
            <div className="hotspot-stat-content">
              <div className="hotspot-stat-icon">
                <Store />
              </div>
              <div>
                <p className="hotspot-stat-label">Total UMKM</p>
                <p className="hotspot-stat-value">
                  {filteredHotSpots.reduce((sum, spot) => sum + spot.umkmCount, 0)} UMKM
                </p>
              </div>
            </div>
          </div>

          <div className="hotspot-stat-card">
            <div className="hotspot-stat-content">
              <div className="hotspot-stat-icon">
                <Users />
              </div>
              <div>
                <p className="hotspot-stat-label">Kategori</p>
                <p className="hotspot-stat-value">
                  {new Set(hotSpots.map(spot => spot.category)).size} Kategori
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="hotspot-filter">
        <div className="hotspot-filter-buttons">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`hotspot-filter-btn ${selectedFilter === filter ? 'active' : ''}`}
            >
              {filter}
            </button>
          ))}
        </div>
        <p className="hotspot-filter-info">
          Menampilkan {filteredHotSpots.length} lokasi
        </p>
      </section>

      {/* Hot Spots Grid */}
      <section className="hotspot-grid-section">
        {filteredHotSpots.length > 0 ? (
          <div className="hotspot-grid">
            {filteredHotSpots.map((spot) => (
              <div key={spot.id} className="hotspot-card">
                {/* Image */}
                <div className="hotspot-card-image">
                  <img src={spot.image} alt={spot.name} />
                  <div className="hotspot-card-badge">
                    <p className="hotspot-card-badge-text">{spot.category}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="hotspot-card-content">
                  <h3 className="hotspot-card-title">{spot.name}</h3>
                  
                  <div className="hotspot-card-location">
                    <MapPin />
                    <p className="hotspot-card-location-text">{spot.location}</p>
                  </div>

                  <p className="hotspot-card-description">
                    {spot.description}
                  </p>

                  {/* Tags */}
                  <div className="hotspot-card-tags">
                    {spot.types.map((type, index) => (
                      <span key={index} className="hotspot-card-tag">
                        {type}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="hotspot-card-footer">
                    <div className="hotspot-card-umkm">
                      <Store />
                      <span className="hotspot-card-umkm-text">
                        {spot.umkmCount} UMKM
                      </span>
                    </div>
                    <button className="hotspot-card-detail-btn">
                      Lihat Detail
                      <ArrowRight />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="hotspot-empty">
            <Store />
            <p className="hotspot-empty-text">
              Tidak ada Hot Spot untuk kategori "{selectedFilter}"
            </p>
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="hotspot-cta-section">
        <div className="hotspot-cta">
          <h2 className="hotspot-cta-title">Punya Rekomendasi Hot Spot/UMKM?</h2>
          <p className="hotspot-cta-text">
            Bantu kami menemukan lokasi UMKM lainnya di Lamongan
          </p>
          <button className="hotspot-cta-btn">
            Usulkan Lokasi
          </button>
        </div>
      </section>
    </div>
  );
}