"use client";

import { UMKM } from "../../lib/types";
import { UMKMForm } from "./UMKMForm";
import { UMKMStats } from "./UMKMStats";
import { UMKMTabs } from "./UMKMTabs";

interface AdminPageProps {
  umkmList: UMKM[];
  onAddUMKM: (umkm: UMKM) => void; // ✅ UMKM lengkap
  onDeleteUMKM: (id: string) => void;
  onApproveUMKM: (id: string) => void;
  onRejectUMKM: (id: string) => void;
}

export function AdminPage({ umkmList, onAddUMKM, onDeleteUMKM, onApproveUMKM, onRejectUMKM }: AdminPageProps) {
  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8">Panel Admin</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <UMKMForm onAddUMKM={onAddUMKM} />
          <UMKMStats umkmList={umkmList} />
        </div>
        <UMKMTabs
          umkmList={umkmList}
          onDeleteUMKM={onDeleteUMKM}
          onApproveUMKM={onApproveUMKM}
          onRejectUMKM={onRejectUMKM}
        />
      </div>
    </div>
  );
}
