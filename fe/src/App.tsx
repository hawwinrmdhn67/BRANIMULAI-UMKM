"use client";

import { useEffect, useState } from "react";
import { Navbar } from "./components/Navbar/Navbar";
import { HomePage } from "./components/HomePage/Index";
import { DetailPage } from "./components/DetailPage/Index";
import { AdminPage } from "./components/AdminPage/Index";
import { UMKM } from "./lib/types";
import { Toaster } from "./components/ui/sonner";

type Page = "home" | "detail" | "admin";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedUMKMId, setSelectedUMKMId] = useState<string | null>(null);
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const API_URL = "http://localhost:5000/api/umkm";

  useEffect(() => {
    const fetchUMKM = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();

        // Pastikan photos selalu array
        const parsedData: UMKM[] = data.map((u: any) => ({
          ...u,
          photos: Array.isArray(u.photos)
            ? u.photos
            : typeof u.photos === "string"
            ? JSON.parse(u.photos)
            : [],
        }));

        setUmkmList(parsedData);
      } catch (err) {
        console.error("Gagal fetch UMKM:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUMKM();
  }, []);

  const handleNavigate = (page: "home" | "admin") => {
    setCurrentPage(page);
    setSelectedUMKMId(null);
  };

  const handleViewDetail = (id: string) => {
    setSelectedUMKMId(id);
    setCurrentPage("detail");
  };

  const handleBack = () => {
    setCurrentPage("home");
    setSelectedUMKMId(null);
  };

  const handleAddUMKM = async (umkmData: Omit<UMKM, "id" | "createdAt">) => {
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(umkmData),
      });
      const newUMKM = await res.json();
      setUmkmList((prev) => [
        ...prev,
        {
          ...newUMKM,
          photos: Array.isArray(newUMKM.photos)
            ? newUMKM.photos
            : typeof newUMKM.photos === "string"
            ? JSON.parse(newUMKM.photos)
            : [],
        },
      ]);
    } catch (err) {
      console.error("Gagal tambah UMKM:", err);
    }
  };

  const handleDeleteUMKM = async (id: string) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setUmkmList((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      console.error("Gagal hapus UMKM:", err);
    }
  };

  const handleApproveUMKM = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}/approve`, { method: "PUT" });
      const updated = await res.json();
      setUmkmList((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...updated,
                photos: Array.isArray(updated.photos)
                  ? updated.photos
                  : typeof updated.photos === "string"
                  ? JSON.parse(updated.photos)
                  : [],
              }
            : u
        )
      );
    } catch (err) {
      console.error("Gagal approve UMKM:", err);
    }
  };

  const handleRejectUMKM = async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/${id}/reject`, { method: "PUT" });
      const updated = await res.json();
      setUmkmList((prev) =>
        prev.map((u) =>
          u.id === id
            ? {
                ...updated,
                photos: Array.isArray(updated.photos)
                  ? updated.photos
                  : typeof updated.photos === "string"
                  ? JSON.parse(updated.photos)
                  : [],
              }
            : u
        )
      );
    } catch (err) {
      console.error("Gagal reject UMKM:", err);
    }
  };

  const selectedUMKM = selectedUMKMId
    ? umkmList.find((umkm) => umkm.id === selectedUMKMId)
    : null;

  const pendingCount = umkmList.filter((u) => u.status === "pending").length;

  if (loading) return <div className="text-center mt-10">Memuat data...</div>;

  return (
    <div className="min-h-screen">
      <Navbar
        currentPage={currentPage === "detail" ? "home" : currentPage}
        onNavigate={handleNavigate}
        pendingCount={pendingCount}
      />

      {currentPage === "home" && (
        <HomePage umkmList={umkmList} onViewDetail={handleViewDetail} />
      )}
      {currentPage === "detail" && selectedUMKM && (
        <DetailPage umkm={selectedUMKM} onBack={handleBack} />
      )}
      {currentPage === "admin" && (
        <AdminPage
          umkmList={umkmList}
          onAddUMKM={handleAddUMKM}
          onDeleteUMKM={handleDeleteUMKM}
          onApproveUMKM={handleApproveUMKM}
          onRejectUMKM={handleRejectUMKM}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}
