import React, { useState } from 'react';
import { Plus, Trash2, Calculator, DollarSign, TrendingUp, BookOpen, TrendingDown, Package, Users } from 'lucide-react';

interface Material {
  id: string;
  name: string;
  price: number;
  quantity: number;
  unit: string;
}

export function SellerSite() {
  const [activeTab, setActiveTab] = useState('calculator');
  const [materials, setMaterials] = useState<Material[]>([]);
  const [productName, setProductName] = useState('');
  const [laborCost, setLaborCost] = useState(0);
  const [overheadCost, setOverheadCost] = useState(0);
  const [profitMargin, setProfitMargin] = useState(30);

  const [newMaterial, setNewMaterial] = useState({
    name: '',
    price: 0,
    quantity: 0,
    unit: 'pcs'
  });

  const addMaterial = () => {
    if (newMaterial.name && newMaterial.price > 0 && newMaterial.quantity > 0) {
      const material: Material = {
        id: Date.now().toString(),
        ...newMaterial
      };
      setMaterials([...materials, material]);
      setNewMaterial({ name: '', price: 0, quantity: 0, unit: 'pcs' });
    }
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const totalMaterialCost = materials.reduce((sum, m) => sum + (m.price * m.quantity), 0);
  const totalHPP = totalMaterialCost + laborCost + overheadCost;
  const suggestedPrice = totalHPP + (totalHPP * profitMargin / 100);
  const profitAmount = suggestedPrice - totalHPP;

  const tabs = [
    { id: 'calculator', label: 'Kalkulator HPP', icon: Calculator },
    { id: 'tips', label: 'Tips Bisnis', icon: BookOpen },
    { id: 'products', label: 'Manajemen Produk', icon: Package },
    { id: 'marketing', label: 'Strategi Pemasaran', icon: Users }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="bg-white rounded-2xl p-4 sm:p-6 lg:p-8 mb-6 shadow-lg border border-green-100">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Calculator className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-1">
                Seller Hub UMKM
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Kelola bisnis Anda dengan lebih mudah dan profesional
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-3 border-t pt-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-sm sm:text-base transition-all ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-black shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'calculator' && (
          <>
            {/* Product Name Section */}
            <div className="bg-white rounded-2xl p-4 sm:p-6 mb-6 shadow-lg border border-green-100">
              <label className="text-sm sm:text-base font-semibold mb-3 block text-gray-700">
                Nama Produk
              </label>
              <input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Contoh: Tas Rajut Handmade"
                className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              {/* Input Section */}
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                {/* Bahan Baku */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-green-100">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-green-600">1</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      Bahan Baku & Material
                    </h2>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                    <div className="sm:col-span-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                        Nama Bahan
                      </label>
                      <input
                        type="text"
                        value={newMaterial.name}
                        onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                        placeholder="Contoh: Benang Rajut"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                        Harga per Unit (Rp)
                      </label>
                      <input
                        type="number"
                        value={newMaterial.price || ''}
                        onChange={(e) => setNewMaterial({...newMaterial, price: Number(e.target.value)})}
                        placeholder="0"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      />
                    </div>
                    <div>
                      <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                        Jumlah
                      </label>
                      <input
                        type="number"
                        value={newMaterial.quantity || ''}
                        onChange={(e) => setNewMaterial({...newMaterial, quantity: Number(e.target.value)})}
                        placeholder="0"
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-xs sm:text-sm font-medium text-gray-700 mb-2 block">
                        Satuan
                      </label>
                      <select
                        value={newMaterial.unit}
                        onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                        className="w-full px-3 sm:px-4 py-2 sm:py-2.5 border-2 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all"
                      >
                        <option value="pcs">Pcs</option>
                        <option value="kg">Kg</option>
                        <option value="gram">Gram</option>
                        <option value="meter">Meter</option>
                        <option value="liter">Liter</option>
                        <option value="ml">Ml</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={addMaterial}
                    className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 sm:py-3.5 rounded-xl flex items-center justify-center gap-2 hover:from-green-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg font-medium text-sm sm:text-base"
                  >
                    <Plus className="w-5 h-5" />
                    Tambah Bahan
                  </button>

                  {/* Material List */}
                  {materials.length > 0 && (
                    <div className="mt-4 sm:mt-6 space-y-2 sm:space-y-3">
                      <p className="text-xs sm:text-sm font-semibold text-gray-700 mb-2">
                        Daftar Bahan ({materials.length})
                      </p>
                      {materials.map((material) => (
                        <div key={material.id} className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                          <div className="flex-1 min-w-0">
                            <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">
                              {material.name}
                            </p>
                            <p className="text-xs sm:text-sm text-gray-600 mt-1">
                              {material.quantity} {material.unit} × Rp {material.price.toLocaleString('id-ID')} = 
                              <span className="font-bold text-green-700 ml-1">
                                Rp {(material.price * material.quantity).toLocaleString('id-ID')}
                              </span>
                            </p>
                          </div>
                          <button
                            onClick={() => removeMaterial(material.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-100 p-2 rounded-lg transition-all ml-2"
                          >
                            <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Biaya Lain */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-green-100">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-green-600">2</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      Biaya Produksi Lainnya
                    </h2>
                  </div>
                  
                  <div className="space-y-4 sm:space-y-5">
                    <div>
                      <label className="text-xs sm:text-sm font-semibold mb-2 block text-gray-700">
                        Biaya Tenaga Kerja (Rp)
                      </label>
                      <input
                        type="number"
                        value={laborCost || ''}
                        onChange={(e) => setLaborCost(Number(e.target.value))}
                        placeholder="0"
                        className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-sm sm:text-base"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        💼 Upah pembuat atau biaya produksi
                      </p>
                    </div>

                    <div>
                      <label className="text-xs sm:text-sm font-semibold mb-2 block text-gray-700">
                        Biaya Overhead (Rp)
                      </label>
                      <input
                        type="number"
                        value={overheadCost || ''}
                        onChange={(e) => setOverheadCost(Number(e.target.value))}
                        placeholder="0"
                        className="w-full px-4 py-3 sm:py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-all text-sm sm:text-base"
                      />
                      <p className="text-xs text-gray-500 mt-2">
                        ⚡ Listrik, sewa tempat, packaging, dll
                      </p>
                    </div>
                  </div>
                </div>

                {/* Margin Keuntungan */}
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-green-100">
                  <div className="flex items-center gap-3 mb-4 sm:mb-6">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-green-600">3</span>
                    </div>
                    <h2 className="text-base sm:text-lg font-bold text-gray-900">
                      Target Keuntungan
                    </h2>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <label className="text-xs sm:text-sm font-semibold text-gray-700">
                        Margin Keuntungan
                      </label>
                      <span className="text-2xl sm:text-3xl font-bold text-green-600">
                        {profitMargin}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={profitMargin}
                      onChange={(e) => setProfitMargin(Number(e.target.value))}
                      className="w-full h-3 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-600"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-2">
                      <span>0%</span>
                      <span>25%</span>
                      <span>50%</span>
                      <span>75%</span>
                      <span>100%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Result Section */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-lg border border-green-100 lg:sticky lg:top-6">
                  <h2 className="text-base sm:text-lg font-bold text-gray-900 mb-4 sm:mb-6">
                    📊 Hasil Perhitungan
                  </h2>

                  <div className="space-y-3 sm:space-y-4 mb-6">
                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-100">
                      <span className="text-xs sm:text-sm text-gray-600">Total Bahan Baku</span>
                      <span className="text-sm sm:text-base font-bold text-gray-900">
                        Rp {totalMaterialCost.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-100">
                      <span className="text-xs sm:text-sm text-gray-600">Biaya Tenaga Kerja</span>
                      <span className="text-sm sm:text-base font-bold text-gray-900">
                        Rp {laborCost.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center pb-3 border-b-2 border-gray-100">
                      <span className="text-xs sm:text-sm text-gray-600">Biaya Overhead</span>
                      <span className="text-sm sm:text-base font-bold text-gray-900">
                        Rp {overheadCost.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 sm:p-5 mb-4 border-2 border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                      <span className="text-sm sm:text-base font-bold text-green-900">
                        Total HPP
                      </span>
                    </div>
                    <p className="text-2xl sm:text-3xl font-bold text-green-700">
                      Rp {totalHPP.toLocaleString('id-ID')}
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl p-4 sm:p-5 text-white mb-4 sm:mb-6 shadow-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                      <span className="text-sm sm:text-base font-bold">
                        Harga Jual Disarankan
                      </span>
                    </div>
                    <p className="text-3xl sm:text-4xl font-bold mb-2">
                      Rp {suggestedPrice.toLocaleString('id-ID')}
                    </p>
                    <div className="bg-white/20 rounded-lg p-2 mt-3">
                      <p className="text-xs sm:text-sm">
                        💰 Keuntungan Bersih: <span className="font-bold">Rp {profitAmount.toLocaleString('id-ID')}</span>
                      </p>
                    </div>
                  </div>

                  <div className="text-xs sm:text-sm bg-gradient-to-br from-amber-50 to-orange-50 p-4 rounded-xl border border-amber-200">
                    <p className="font-bold mb-2 text-amber-900 flex items-center gap-2">
                      <span className="text-base">💡</span> Tips Pricing
                    </p>
                    <ul className="space-y-1.5 text-gray-700">
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>Riset harga kompetitor</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>Pertimbangkan nilai unik produk</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-600 mt-0.5">✓</span>
                        <span>Sesuaikan dengan target pasar</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'tips' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            <TipsCard
              icon="🎯"
              title="Tentukan Target Pasar"
              description="Kenali siapa customer ideal Anda. Pahami demografi, kebutuhan, dan daya beli mereka untuk strategi yang tepat sasaran."
            />
            <TipsCard
              icon="📸"
              title="Foto Produk Berkualitas"
              description="Gunakan pencahayaan natural, background bersih, dan tampilkan produk dari berbagai sudut untuk menarik pembeli."
            />
            <TipsCard
              icon="💬"
              title="Pelayanan Prima"
              description="Respons cepat, ramah, dan informatif. Pelayanan baik akan menciptakan pelanggan setia dan word-of-mouth positif."
            />
            <TipsCard
              icon="📦"
              title="Packaging Menarik"
              description="Kemasan yang rapi dan menarik meningkatkan nilai produk dan memberikan pengalaman unboxing yang memorable."
            />
            <TipsCard
              icon="📊"
              title="Monitor Keuangan"
              description="Catat semua pemasukan dan pengeluaran. Analisa profit margin dan identifikasi area yang bisa dioptimalkan."
            />
            <TipsCard
              icon="🚀"
              title="Manfaatkan Media Sosial"
              description="Posting konsisten, gunakan hashtag relevan, dan engage dengan followers untuk membangun brand awareness."
            />
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-green-100">
            <div className="text-center py-12">
              <Package className="w-16 h-16 sm:w-20 sm:h-20 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                Manajemen Produk
              </h3>
              <p className="text-sm sm:text-base text-gray-600 mb-6">
                Fitur ini akan segera hadir untuk membantu Anda mengelola katalog produk
              </p>
              <div className="inline-block bg-green-50 border border-green-200 rounded-xl px-6 py-3">
                <p className="text-sm font-medium text-green-700">
                  🎉 Coming Soon
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'marketing' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <MarketingCard
              title="Strategi Media Sosial"
              items={[
                "Posting konsisten 1-2x sehari",
                "Gunakan Instagram Reels & TikTok",
                "Buat konten edukatif tentang produk",
                "Kolaborasi dengan micro-influencer",
                "Manfaatkan Instagram Shopping"
              ]}
            />
            <MarketingCard
              title="Promosi Efektif"
              items={[
                "Flash sale di waktu peak hours",
                "Bundle product dengan discount",
                "Program loyalty untuk repeat customer",
                "Free shipping untuk minimum purchase",
                "Referral program dengan reward"
              ]}
            />
            <MarketingCard
              title="Content Marketing"
              items={[
                "Behind the scenes proses produksi",
                "Customer testimonial & review",
                "Tutorial penggunaan produk",
                "Tips & trik terkait produk",
                "User generated content campaign"
              ]}
            />
            <MarketingCard
              title="Marketplace Strategy"
              items={[
                "Optimasi keyword di judul & deskripsi",
                "Manfaatkan flash sale marketplace",
                "Aktif di forum & diskusi produk",
                "Tingkatkan rating dengan service baik",
                "Gunakan iklan marketplace secara strategis"
              ]}
            />
          </div>
        )}
      </div>
    </div>
  );
}

function TipsCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-green-100 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function MarketingCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-green-100">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-emerald-600 rounded-full"></span>
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-gray-700">
            <span className="text-green-600 font-bold mt-0.5">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}