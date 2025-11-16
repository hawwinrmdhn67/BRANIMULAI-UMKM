import React, { useState } from "react";
import { Calculator, Package } from "lucide-react";

export default function Kalkalkulator() {
  const [totalModal, setTotalModal] = useState(0);
  const [hpp, setHpp] = useState(0);
  const [hargaJual, setHargaJual] = useState(0);

  // Hasil perhitungan
  const marginPerUnit = hargaJual - hpp;
  const titikImpas =
    marginPerUnit > 0 ? Math.ceil(totalModal / marginPerUnit) : 0;

  return (
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-200">
        <div className="flex flex-col items-center text-center mb-10">
            <Package className="w-16 h-16 sm:w-20 sm:h-20 text-green-600 mb-4" />
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
            Kalkulator Titik Impas (Break Even Point)
            </h3>
            <p className="text-sm text-gray-600 max-w-md">
            Hitung berapa banyak barang yang harus terjual agar modal kembali (balik modal).
            </p>
        </div>

        {/* Form */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 space-y-3 sm:space-y-0">
            
            {/* Total Modal */}
            <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
                Total Modal (Rp)
            </label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">
                Rp
                </span>
                <input
                type="number"
                value={totalModal || ""}
                onChange={(e) => setTotalModal(Number(e.target.value))}
                placeholder="Contoh: 500000"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl
                            focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
            </div>
            </div>

            {/* HPP */}
            <div>
            <label className="text-sm font-medium text-gray-700 mb-2 block">
                HPP per Unit (Rp)
            </label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">
                Rp
                </span>
                <input
                type="number"
                value={hpp || ""}
                onChange={(e) => setHpp(Number(e.target.value))}
                placeholder="Contoh: 1500"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl
                            focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
            </div>
            </div>

            {/* Harga Jual */}
            <div className="sm:col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
                Harga Jual per Unit (Rp)
            </label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">
                Rp
                </span>
                <input
                type="number"
                value={hargaJual || ""}
                onChange={(e) => setHargaJual(Number(e.target.value))}
                placeholder="Contoh: 3000"
                className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl
                            focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
            </div>

            {marginPerUnit <= 0 && (
                <p className="text-xs text-red-600 mt-2">
                ⚠️ Harga jual harus lebih besar dari HPP agar tidak rugi.
                </p>
            )}
            </div>
        </div>

        {/* Hasil */}
        <div className="mt-10 bg-green-50 border border-green-300 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-2">
            <Calculator className="w-5 h-5 text-green-700" />
            <span className="text-sm font-bold text-green-900">
                Hasil Perhitungan Titik Impas
            </span>
            </div>

            <p className="text-3xl font-bold text-green-700">
            {marginPerUnit > 0 ? `${titikImpas} Unit Untuk Balik Modal` : "—"}
            </p>

            <p className="text-xs text-green-700 mt-2 leading-relaxed">
            Total Modal: Rp {totalModal.toLocaleString("id-ID")} <br />
            Margin per Unit: Rp {marginPerUnit > 0 ? marginPerUnit.toLocaleString("id-ID") : 0}
            </p>
        </div>
        </div>
  );
}
