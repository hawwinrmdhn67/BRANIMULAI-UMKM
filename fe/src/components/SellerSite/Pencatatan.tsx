import React, { useState, useEffect } from 'react';
import { Plus, Trash2, Receipt, TrendingUp, Package, DollarSign } from 'lucide-react';

interface Transaction {
  id: string;
  itemName: string;
  price: number;
  quantity: number;
  total: number;
  timestamp: Date;
}

export function Pencatatan() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [newTransaction, setNewTransaction] = useState({
    itemName: '',
    price: 0,
    quantity: 0
  });

  // Load dari LocalStorage saat component mount
  useEffect(() => {
    const saved = localStorage.getItem('daily_transactions');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const withDates = parsed.map((t: any) => ({
          ...t,
          timestamp: new Date(t.timestamp)
        }));
        setTransactions(withDates);
      } catch (error) {
        console.error('Error loading transactions:', error);
      }
    }
  }, []);

  // Filter transaksi hari ini
  const getTodayTransactions = () => {
    const today = new Date().toDateString();
    return transactions.filter(t => 
      new Date(t.timestamp).toDateString() === today
    );
  };

  // Tambah transaksi baru
  const addTransaction = () => {
    // Validasi input
    if (!newTransaction.itemName.trim()) {
      alert('Nama barang tidak boleh kosong!');
      return;
    }
    if (newTransaction.price <= 0) {
      alert('Harga harus lebih dari 0!');
      return;
    }
    if (newTransaction.quantity <= 0) {
      alert('Jumlah harus lebih dari 0!');
      return;
    }

    // Buat objek transaksi
    const transaction: Transaction = {
      id: Date.now().toString(),
      itemName: newTransaction.itemName,
      price: newTransaction.price,
      quantity: newTransaction.quantity,
      total: newTransaction.price * newTransaction.quantity,
      timestamp: new Date()
    };

    // Update state dan LocalStorage
    const updated = [...transactions, transaction];
    setTransactions(updated);
    localStorage.setItem('daily_transactions', JSON.stringify(updated));

    // Reset form
    setNewTransaction({ itemName: '', price: 0, quantity: 0 });
  };

  // Hapus transaksi
  const deleteTransaction = (id: string) => {
    if (confirm('Yakin ingin menghapus transaksi ini?')) {
      const updated = transactions.filter(t => t.id !== id);
      setTransactions(updated);
      localStorage.setItem('daily_transactions', JSON.stringify(updated));
    }
  };

  // Format waktu
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format waktu relatif
  const getRelativeTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return 'Baru saja';
    if (diffMins < 60) return `${diffMins} menit lalu`;
    if (diffHours < 24) return `${diffHours} jam lalu`;
    return formatTime(date);
  };

  // Perhitungan summary
  const todayTransactions = getTodayTransactions();
  const totalTransactions = todayTransactions.length;
  const totalItems = todayTransactions.reduce((sum, t) => sum + t.quantity, 0);
  const totalRevenue = todayTransactions.reduce((sum, t) => sum + t.total, 0);

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-black shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Receipt className="w-8 h-8" />
          <div>
            <h2 className="text-2xl font-bold">Pencatatan Transaksi Harian</h2>
            <p className="text-green-600 text-sm">
              {new Date().toLocaleDateString('id-ID', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Input Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Form Input */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">📝</span>
              <h3 className="text-lg font-bold text-gray-900">Input Transaksi Baru</h3>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Nama Barang / Produk
                </label>
                <input
                  type="text"
                  value={newTransaction.itemName}
                  onChange={(e) => setNewTransaction({...newTransaction, itemName: e.target.value})}
                  placeholder="Contoh: Es Teh Manis, Nasi Goreng"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm"
                  onKeyPress={(e) => e.key === 'Enter' && addTransaction()}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Harga Jual (Rp)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm font-semibold">
                      Rp
                    </span>
                    <input
                      type="number"
                      value={newTransaction.price || ''}
                      onChange={(e) => setNewTransaction({...newTransaction, price: Number(e.target.value)})}
                      placeholder="5000"
                      min="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Jumlah Terjual
                  </label>
                  <input
                    type="number"
                    value={newTransaction.quantity || ''}
                    onChange={(e) => setNewTransaction({...newTransaction, quantity: Number(e.target.value)})}
                    placeholder="1"
                    min="0"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-sm"
                  />
                </div>
              </div>

              {/* Preview Total */}
              {newTransaction.price > 0 && newTransaction.quantity > 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Total Transaksi:</p>
                  <p className="text-2xl font-bold text-green-700">
                    Rp {(newTransaction.price * newTransaction.quantity).toLocaleString('id-ID')}
                  </p>
                </div>
              )}

              <button
                onClick={addTransaction}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-grey py-3 rounded-lg flex items-center justify-center gap-2 hover:from-green-600 hover:to-green-700 transition-all font-semibold shadow-md"
              >
                <Plus className="w-5 h-5" />
                Tambah Transaksi
              </button>
            </div>
          </div>

          {/* Daftar Transaksi Hari Ini */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">📋</span>
                <h3 className="text-lg font-bold text-gray-900">Transaksi Hari Ini</h3>
              </div>
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                {totalTransactions} transaksi
              </span>
            </div>

            {todayTransactions.length === 0 ? (
              <div className="text-center py-12">
                <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-sm">Belum ada transaksi hari ini</p>
                <p className="text-gray-400 text-xs mt-1">Tambahkan transaksi pertama Anda!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayTransactions.slice().reverse().map((transaction) => (
                  <div 
                    key={transaction.id} 
                    className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-900 text-base mb-1">
                          {transaction.itemName}
                        </h4>
                        <p className="text-sm text-gray-600 mb-2">
                          {transaction.quantity} item × Rp {transaction.price.toLocaleString('id-ID')} = 
                          <span className="font-bold text-green-700 ml-1">
                            Rp {transaction.total.toLocaleString('id-ID')}
                          </span>
                        </p>
                        <p className="text-xs text-gray-500">
                          🕐 {getRelativeTime(transaction.timestamp)}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition-all"
                        title="Hapus transaksi"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 lg:sticky lg:top-6 space-y-4">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Ringkasan Hari Ini</h3>

            {/* Total Transaksi */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Receipt className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Total Transaksi</span>
              </div>
              <p className="text-3xl font-bold text-blue-700">{totalTransactions}</p>
              <p className="text-xs text-blue-600 mt-1">transaksi tercatat</p>
            </div>

            {/* Total Item Terjual */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-green-900">Total Item</span>
              </div>
              <p className="text-3xl font-bold text-green-700">{totalItems}</p>
              <p className="text-xs text-green-600 mt-1">item terjual</p>
            </div>

            {/* Total Pendapatan */}
            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-lg p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-900">Total Pendapatan</span>
              </div>
              <p className="text-2xl font-bold text-emerald-700">
                Rp {totalRevenue.toLocaleString('id-ID')}
              </p>
              <p className="text-xs text-emerald-600 mt-1">pendapatan kotor</p>
            </div>

            {/* Info Tips */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-4">
              <p className="text-xs text-amber-800 leading-relaxed">
                <span className="font-bold">💡 Tips:</span> Data transaksi tersimpan otomatis di browser Anda. 
                Catat setiap transaksi untuk analisa penjualan yang lebih baik!
              </p>
            </div>

            {/* Reset Button */}
            {totalTransactions > 0 && (
              <button
                onClick={() => {
                  if (confirm('Yakin ingin menghapus SEMUA transaksi hari ini?')) {
                    const updated = transactions.filter(t => 
                      new Date(t.timestamp).toDateString() !== new Date().toDateString()
                    );
                    setTransactions(updated);
                    localStorage.setItem('daily_transactions', JSON.stringify(updated));
                  }
                }}
                className="w-full bg-red-50 text-red-600 py-2 rounded-lg hover:bg-red-100 transition-all font-medium text-sm border border-red-200"
              >
                🗑️ Hapus Semua Transaksi
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}