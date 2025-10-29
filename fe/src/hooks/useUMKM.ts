"use client";

import { useState, useEffect } from "react";
import { UMKM } from "../lib/types";

type Page = "home" | "detail" | "admin";

export function useUMKM() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [selectedUMKMId, setSelectedUMKMId] = useState<string | null>(null);
  const [umkmList, setUmkmList] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchUMKM = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:5000/api/umkm"); 
        const data = await res.json();
        setUmkmList(data);
      } catch (err) {
        console.error("Gagal mengambil data UMKM:", err);
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
      const res = await fetch("http://localhost:5000/api/umkm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(umkmData),
      });
      const newUMKM = await res.json();
      setUmkmList((prev) => [...prev, newUMKM]);
    } catch (err) {
      console.error("Gagal menambah UMKM:", err);
    }
  };

  const handleDeleteUMKM = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/umkm/${id}`, { method: "DELETE" });
      setUmkmList((prev) => prev.filter((umkm) => umkm.id !== id));
    } catch (err) {
      console.error("Gagal menghapus UMKM:", err);
    }
  };

  const handleApproveUMKM = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/umkm/${id}/approve`, { method: "PUT" });
      setUmkmList((prev) =>
        prev.map((umkm) =>
          umkm.id === id ? { ...umkm, status: "approved" } : umkm
        )
      );
    } catch (err) {
      console.error("Gagal approve UMKM:", err);
    }
  };

  const handleRejectUMKM = async (id: string) => {
    try {
      await fetch(`http://localhost:5000/api/umkm/${id}/reject`, { method: "PUT" });
      setUmkmList((prev) =>
        prev.map((umkm) =>
          umkm.id === id ? { ...umkm, status: "rejected" } : umkm
        )
      );
    } catch (err) {
      console.error("Gagal reject UMKM:", err);
    }
  };

  const selectedUMKM = selectedUMKMId
    ? umkmList.find((umkm) => umkm.id === selectedUMKMId)
    : null;

  const pendingCount = umkmList.filter((umkm) => umkm.status === "pending").length;

  return {
    currentPage,
    selectedUMKM,
    umkmList,
    pendingCount,
    loading,
    handleNavigate,
    handleViewDetail,
    handleBack,
    handleAddUMKM,
    handleDeleteUMKM,
    handleApproveUMKM,
    handleRejectUMKM,
  };
}
