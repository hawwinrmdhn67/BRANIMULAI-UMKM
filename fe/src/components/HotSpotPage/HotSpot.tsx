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
          <h2 className="hotspot-cta-title">Punya Rekomendasi Hot Spot?</h2>
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