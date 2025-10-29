"use client";

import { UMKM } from "../../lib/types";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { CheckCircle, XCircle, Clock } from "lucide-react";

interface UMKMStatsProps {
  umkmList: UMKM[];
}

export function UMKMStats({ umkmList }: UMKMStatsProps) {
  const pendingUMKM = umkmList.filter(u => u.status === "pending");
  const approvedUMKM = umkmList.filter(u => u.status === "approved");
  const rejectedUMKM = umkmList.filter(u => u.status === "rejected");

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><h2>Statistik</h2></CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                <p className="text-yellow-900">{pendingUMKM.length}</p>
                <p className="text-yellow-700">Pending</p>
              </div>
              <div className="text-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-green-900">{approvedUMKM.length}</p>
                <p className="text-green-700">Disetujui</p>
              </div>
              <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
                <XCircle className="w-6 h-6 text-red-600 mx-auto mb-2" />
                <p className="text-red-900">{rejectedUMKM.length}</p>
                <p className="text-red-700">Ditolak</p>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-muted-foreground mb-3">Per Kategori (Disetujui):</p>
              {["Makanan", "Minuman", "Jasa", "Kerajinan"].map(cat => {
                const count = approvedUMKM.filter(u => u.category === cat).length;
                return (
                  <div key={cat} className="flex justify-between items-center mb-2">
                    <span>{cat}</span>
                    <Badge variant="secondary">{count}</Badge>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-green-50 border-green-200">
        <CardContent className="pt-6">
          <h4 className="text-green-800 mb-2">Petunjuk Penggunaan</h4>
          <ul className="text-green-700 space-y-1 list-disc list-inside">
            <li>Isi semua field yang bertanda *</li>
            <li>UMKM baru berstatus "Pending"</li>
            <li>Setujui UMKM untuk ditampilkan</li>
            <li>Format WhatsApp: 62 + nomor tanpa 0</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
