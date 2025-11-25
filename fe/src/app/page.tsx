"use client";

import { useEffect, useState } from "react";
import { AdminPage } from "../components/AdminPage/Index";
import { UMKM } from "../lib/types";

const API_BASE_URL = "https://backendbranimuali-production.up.railway.app/api/umkm"; 

export default function AdminContainer() {
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUMKM = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/umkm`);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setUmkmList(data);
      } catch (err) {
        console.error("❌ Gagal fetch data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUMKM();
  }, []);

  const handleAddUMKM = async (umkm: Omit<UMKM, "id" | "createdAt">) => {
    try {
      const res = await fetch(`${API_BASE_URL}/umkm`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(umkm),
      });

      if (!res.ok) throw new Error("Gagal menambah UMKM");

      const newUMKM = await res.json();
      setUmkmList((prev) => [...prev, newUMKM]);
    } catch (err) {
      console.error("❌ Error saat tambah UMKM:", err);
    }
  };

  const handleDeleteUMKM = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/umkm/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus UMKM");

      setUmkmList((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("❌ Error saat hapus UMKM:", err);
    }
  };

  const handleApproveUMKM = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/umkm/${id}/approve`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Gagal approve UMKM");

      const updated = await res.json();
      setUmkmList((prev) => prev.map((u) => (u.id === id ? updated : u)));
    } catch (err) {
      console.error("❌ Error saat approve UMKM:", err);
    }
  };

  const handleRejectUMKM = async (id: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/umkm/${id}/reject`, {
        method: "PUT",
      });
      if (!res.ok) throw new Error("Gagal reject UMKM");

      const updated = await res.json();
      setUmkmList((prev) => prev.map((u) => (u.id === id ? updated : u)));
    } catch (err) {
      console.error("❌ Error saat reject UMKM:", err);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading data UMKM...</div>;
  }

  return (
    <AdminPage
      umkmList={umkmList}
      onAddUMKM={handleAddUMKM}
      onDeleteUMKM={handleDeleteUMKM}
      onApproveUMKM={handleApproveUMKM}
      onRejectUMKM={handleRejectUMKM}
    />
  );
}
