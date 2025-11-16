import React, { useState } from 'react';
import { Plus, Trash2, Calculator, BookOpen, Package, Users, TrendingUp, Album, Briefcase } from 'lucide-react';
import { Pencatatan } from './Pencatatan';
import Kalkulator from './Kalkulator';

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
  const [productUnit, setProductUnit] = useState(100);
  const [selectedMargin, setSelectedMargin] = useState(30); // Default margin 30%

  const [newMaterial, setNewMaterial] = useState({
    name: '',
    price: 0,
    quantity: 1,
    unit: 'kg'
  });

  const addMaterial = () => {
    if (newMaterial.name && newMaterial.price > 0 && newMaterial.quantity > 0) {
      const material: Material = {
        id: Date.now().toString(),
        ...newMaterial
      };
      setMaterials([...materials, material]);
      setNewMaterial({ name: '', price: 0, quantity: 1, unit: 'kg' });
    }
  };

  const removeMaterial = (id: string) => {
    setMaterials(materials.filter(m => m.id !== id));
  };

  const totalMaterialCost = materials.reduce((sum, m) => sum + m.price, 0);
  const totalCost = totalMaterialCost + laborCost + overheadCost;
  const hppPerUnit = productUnit > 0 ? totalCost / productUnit : 0;
  
  // Perhitungan harga jual berdasarkan margin
  const sellingPrice = hppPerUnit > 0 ? hppPerUnit * (1 + selectedMargin / 100) : 0;
  const profitPerUnit = sellingPrice - hppPerUnit;

  const marginOptions = [
    { value: 20, label: '20%', color: 'blue' },
    { value: 25, label: '25%', color: 'indigo' },
    { value: 30, label: '30%', color: 'green' },
    { value: 35, label: '35%', color: 'emerald' },
    { value: 40, label: '40%', color: 'teal' },
    { value: 50, label: '50%', color: 'cyan' }
  ];

  const tabs = [
    { id: 'calculator', label: 'Kalkulator HPP', icon: Calculator },    
    { id: 'simulation', label: 'Kalkulator Titik Impas', icon: Package },
    { id: 'pencatatan', label: 'Pencatatan Harian', icon: TrendingUp },
    { id: 'tips', label: 'Tips Bisnis', icon: BookOpen },
    { id: 'marketing', label: 'Strategi Pemasaran', icon: Users }
  ];

  return (
    <div className="sellersite-wrapper min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="bg-black rounded-xl p-4 sm:p-6 mb-6 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Briefcase className="w-6 h-6 sm:w-7 sm:h-7 text-black" />
            </div>
            <div className="flex-1">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-1">
                Seller Site <span className="text-green-600">BraniMulai</span>
              </h1>
              <p className="text-sm sm:text-base text-gray-600">
                Hadir sebagai Alat Bantu Seller untuk memudahkan para seller dalam mengelola UMKM mereka
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
                  className={`flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-lg font-medium text-sm transition-all ${
                    activeTab === tab.id
                      ? 'bg-green-600 text-gray shadow-sm border border-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200  '
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content Based on Active Tab */}
        {activeTab === 'calculator' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
            {/* Left Sidebar - Panduan */}
            <div className="lg:col-span-3">
              <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-xl p-4 border-2 border-yellow-200 lg:sticky lg:top-6">
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-yellow-200">
                  <span className="text-xl">💡</span>
                  <h3 className="font-bold text-gray-900 text-sm">Panduan Mudah Menghitung HPP</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-base">📝</span>
                      <div>
                        <p className="font-bold text-gray-900 text-xs mb-1">Langkah 1 - Input Bahan:</p>
                        <div className="text-xs text-gray-600 leading-relaxed space-y-1">
                          <p>• <span className="font-semibold">Nama</span>: Tulis nama bahan</p>
                          <p>• <span className="font-semibold">Jumlah</span>: Masukkan angka (bisa desimal)</p>
                          <p>• <span className="font-semibold">Satuan</span>: Pilih kg/gram/liter/pcs/dll</p>
                          <p>• <span className="font-semibold">Harga</span>: Total harga untuk jumlah tersebut</p>
                        </div>
                        <p className="text-xs text-green-600 mt-2 font-medium bg-green-50 p-2 rounded">
                          📌 Contoh: Gula 5 kg harga Rp 75.000
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-base">⚡</span>
                      <div>
                        <p className="font-bold text-gray-900 text-xs mb-1">Langkah 2 - Biaya Tenaga Kerja:</p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Masukkan total biaya tenaga kerja untuk proses produksi.
                        </p>
                        <p className="text-xs text-green-600 mt-1 bg-green-50 font-medium">
                          📌 Contoh: Upah karyawan Rp 50.000/hari
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-base">💡</span>
                      <div>
                        <p className="font-bold text-gray-900 text-xs mb-1">Langkah 3 - Biaya Overhead:</p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Masukkan total biaya overhead (listrik, gas, sewa tempat, dll).
                        </p>
                        <p className="text-xs text-green-600 mt-1 bg-green-50 font-medium">
                          📌 Contoh: Listrik + gas + sewa = Rp 40.000/hari
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm">
                    <div className="flex items-start gap-2 mb-2">
                      <span className="text-base">🎯</span>
                      <div>
                        <p className="font-bold text-gray-900 text-xs mb-1">Langkah 4 - Jumlah Produk:</p>
                        <p className="text-xs text-gray-600 leading-relaxed">
                          Masukkan <span className="font-semibold text-gray-900">total produk yang dihasilkan</span> dari bahan yang dibeli.
                        </p>
                        <p className="text-xs text-green-600 mt-1 bg-green-50 font-medium">
                          📌 Contoh: Dari bahan di atas bisa 100 gelas es teh
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border-2 border-amber-200">
                    <p className="font-bold text-xs mb-2 text-gray-900">📊 Cara Kerja Kalkulator:</p>
                    <div className="space-y-1.5 text-xs text-gray-900">
                      <p className="leading-relaxed">1. Gula 5kg = Rp 75.000</p>
                      <p className="leading-relaxed">2. Teh 25pcs = Rp 12.500</p>
                      <p className="leading-relaxed">3. Total Bahan = Rp 87.500</p>
                      <p className="leading-relaxed">4. + Tenaga Kerja + Overhead = Total Biaya</p>
                      <p className="leading-relaxed">5. HPP = Total Biaya ÷ Jumlah Produk</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg p-3 shadow-sm border-2 border-amber-200">
                    <p className="font-bold text-xs mb-2 text-gray-900">💰 Pilih Margin Keuntungan:</p>
                    <ul className="space-y-1 text-xs text-gray-600">
                      <li className="flex items-start gap-1.5">
                        <span className="text-green-600 font-bold">•</span>
                        <span><span className="font-semibold">25%</span>: Harga jual Rp 1.444 (untung Rp 269)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-green-600 font-bold">•</span>
                        <span><span className="font-semibold">35%</span>: Harga jual Rp 1.654 (untung Rp 579)</span>
                      </li>
                      <li className="flex items-start gap-1.5">
                        <span className="text-green-600 font-bold">•</span>
                        <span><span className="font-semibold">50%</span>: Harga jual Rp 2.150 (untung Rp 1.075)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-4 sm:space-y-6">
              {/* Product Name */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                <h2 className="text-base font-bold text-gray-900 mb-3">Informasi Produk</h2>
                <div>
                  <label className="text-sm font-medium mb-2 block text-gray-700">Nama Produk</label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="Contoh: Es Teh, Nasi Goreng, Bakso"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all text-sm"
                  />
                </div>
              </div>

              {/* Bahan Baku */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg">📝</span>
                  <h2 className="text-base font-bold text-gray-900">Bahan yang Dibeli</h2>
                </div>
                
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1.5 block">Nama Bahan</label>
                    <input
                      type="text"
                      value={newMaterial.name}
                      onChange={(e) => setNewMaterial({...newMaterial, name: e.target.value})}
                      placeholder="Contoh: Gula pasir, Teh celup, Minyak goreng"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1.5 block">Jumlah</label>
                      <input
                        type="number"
                        value={newMaterial.quantity || ''}
                        onChange={(e) => setNewMaterial({...newMaterial, quantity: Number(e.target.value)})}
                        placeholder="Contoh: 5"
                        min="0"
                        step="0.1"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-700 mb-1.5 block">Satuan</label>
                      <select
                        value={newMaterial.unit}
                        onChange={(e) => setNewMaterial({...newMaterial, unit: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      >
                        <option value="kg">Kilogram (kg)</option>
                        <option value="gram">Gram (gr)</option>
                        <option value="liter">Liter (L)</option>
                        <option value="ml">Mililiter (ml)</option>
                        <option value="pcs">Pieces (pcs)</option>
                        <option value="box">Box</option>
                        <option value="pack">Pack</option>
                        <option value="botol">Botol</option>
                        <option value="kaleng">Kaleng</option>
                        <option value="sachet">Sachet</option>
                        <option value="meter">Meter (m)</option>
                        <option value="lembar">Lembar</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-xs font-medium text-gray-700 mb-1.5 block">
                      Harga Total untuk {newMaterial.quantity || '...'} {newMaterial.unit}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">Rp</span>
                      <input
                        type="number"
                        value={newMaterial.price || ''}
                        onChange={(e) => setNewMaterial({...newMaterial, price: Number(e.target.value)})}
                        placeholder="Contoh: 75000"
                        min="0"
                        className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1 flex items-start gap-1">
                      <span>💡</span>
                      <span>
                        Masukkan harga pembelian untuk <span className="font-semibold text-gray-700">{newMaterial.quantity || '...'} {newMaterial.unit}</span> ini
                      </span>
                    </p>
                  </div>
                </div>

                <button
                  onClick={addMaterial}
                  className="w-full bg-gray-600 text-black py-2.5 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transition-all font-medium text-sm shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Tambah Bahan
                </button>

                {/* Material List */}
                {materials.length > 0 && (
                  <div className="mt-4 space-y-2">
                    <p className="text-xs font-bold text-gray-900 mb-2 flex items-center justify-between">
                      <span>Total Pembelian Bahan:</span>
                      <span className="text-green-600 text-base">Rp {totalMaterialCost.toLocaleString('id-ID')}</span>
                    </p>
                    {materials.map((material) => (
                      <div key={material.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-gray-900">{material.name}</p>
                          <p className="text-xs text-gray-600">
                            {material.quantity} {material.unit} = 
                            <span className="font-bold text-gray-900 ml-1">
                              Rp {material.price.toLocaleString('id-ID')}
                            </span>
                          </p>
                        </div>
                        <button
                          onClick={() => removeMaterial(material.id)}
                          className="text-red-600 hover:bg-red-50 p-1.5 rounded transition-all ml-2"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Biaya Operasional */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                <h2 className="text-base font-bold text-gray-900 mb-4">Biaya Operasional</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">⚡</span>
                      <label className="text-sm font-bold text-gray-900">Biaya Tenaga Kerja per Unit (Rp)</label>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rp</span>
                      <input
                        type="number"
                        value={laborCost || ''}
                        onChange={(e) => setLaborCost(Number(e.target.value))}
                        placeholder="0"
                        className="w-full pl-10 pr-3 py-2.5 border border-amber-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white"
                      />
                    </div>
                    <p className="text-xs text-amber-700 mt-2 flex items-start gap-1">
                      <span>💡</span>
                      <span>Cara hitung: Gaji per hari ÷ jumlah produk per hari. Contoh: Rp 100.000 ÷ 500 = Rp 200</span>
                    </p>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-base">💡</span>
                      <label className="text-sm font-bold text-gray-900">Biaya Overhead per Unit (Rp)</label>
                    </div>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm">Rp</span>
                      <input
                        type="number"
                        value={overheadCost || ''}
                        onChange={(e) => setOverheadCost(Number(e.target.value))}
                        placeholder="0"
                        className="w-full pl-10 pr-3 py-2.5 border border-green-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 bg-white"
                      />
                    </div>
                    <p className="text-xs text-green-700 mt-2 flex items-start gap-1">
                      <span>💡</span>
                      <span>Cara hitung: Total biaya bulanan (listrik, sewa, dll) ÷ jumlah produksi. Contoh: Rp 2.000.000 ÷ 10.000 = Rp 200</span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Jumlah Produk */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg">🎯</span>
                  <h2 className="text-base font-bold text-gray-900">Jumlah Produk yang Dihasilkan</h2>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Jumlah Produk (Unit)</label>
                  <input
                    type="number"
                    value={productUnit || ''}
                    onChange={(e) => setProductUnit(Number(e.target.value))}
                    placeholder="Contoh: 100, 500, 1000"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm"
                  />
                  <p className="text-xs text-amber-600 mt-2 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <span className="font-bold">💡 Contoh:</span> Dari bahan yang dibeli bisa menghasilkan 100 gelas es teh
                  </p>
                </div>
              </div>

              {/* Hasil HPP & Margin Selector */}
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-200">
                <div className="grid grid-cols-1 gap-4">
                  {/* HPP Display */}
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-300">
                    <div className="flex items-center gap-2 mb-2">
                      <Calculator className="w-5 h-5 text-green-700" />
                      <span className="text-sm font-bold text-green-900">Total HPP per Unit</span>
                    </div>
                    <p className="text-3xl font-bold text-green-700">
                      Rp {Math.round(hppPerUnit).toLocaleString('id-ID')}
                    </p>
                    <p className="text-xs text-green-600 mt-2">
                      Total Biaya: Rp {totalCost.toLocaleString('id-ID')} ÷ {productUnit} unit
                    </p>
                  </div>

                  {/* Margin Selector */}
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-300">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="text-xl">💰</span>
                      <h3 className="text-base font-bold text-gray-900">Pilih Margin Keuntungan</h3>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-4">
                      {marginOptions.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => setSelectedMargin(option.value)}
                          className={`px-4 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                            selectedMargin === option.value
                              ? 'bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border-2  text-gray scale-105'
                              : 'bg-green-600 text-gray-700 hover:bg-green-50 border border-gray-300'
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>

                    {/* Hasil Perhitungan Harga Jual */}
                    {hppPerUnit > 0 && (
                      <div className="bg-white rounded-lg p-4 border-2 border-green-400">
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">HPP per Unit:</span>
                            <span className="text-base font-semibold text-gray-900">
                              Rp {Math.round(hppPerUnit).toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-gray-600">Margin Keuntungan:</span>
                            <span className="text-base font-semibold text-green-600">
                              {selectedMargin}%
                            </span>
                          </div>
                          <div className="h-px bg-gray-300"></div>
                          <div className="flex justify-between items-center">
                            <span className="text-base font-bold text-gray-900">Harga Jual Rekomendasi:</span>
                            <span className="text-2xl font-bold text-green-600">
                              Rp {Math.round(sellingPrice).toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="flex justify-between items-center bg-green-50 p-2 rounded">
                            <span className="text-sm text-green-700">Keuntungan per Unit:</span>
                            <span className="text-base font-bold text-green-700">
                              Rp {Math.round(profitPerUnit).toLocaleString('id-ID')}
                            </span>
                          </div>
                          <div className="flex justify-between items-center bg-blue-50 p-2 rounded">
                            <span className="text-sm text-blue-700">Total Keuntungan ({productUnit} unit):</span>
                            <span className="text-base font-bold text-blue-700">
                              Rp {Math.round(profitPerUnit * productUnit).toLocaleString('id-ID')}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Contoh & Reset Buttons */}
              <div className="flex gap-3">
                <button className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm flex items-center justify-center gap-2">
                  <span>📋</span> Contoh
                </button>
                <button 
                  onClick={() => {
                    setMaterials([]);
                    setProductName('');
                    setLaborCost(0);
                    setOverheadCost(0);
                    setProductUnit(100);
                    setSelectedMargin(30);
                  }}
                  className="flex-1 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-all font-medium text-sm"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab Pencatatan Harian */}
        {activeTab === 'pencatatan' && <Pencatatan />}

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

        {activeTab === 'simulation' && (
            <Kalkulator />
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
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

function MarketingCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border border-gray-200">
      <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-2 h-8 bg-gradient-to-b from-green-500 to-green-600 rounded-full"></span>
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