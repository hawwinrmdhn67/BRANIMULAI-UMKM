"use client";

import { UMKM } from "../../lib/types";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../ui/table";
import { Button } from "../ui/button";
import { CheckCircle, XCircle, Trash2 } from "lucide-react";

interface UMKMTableProps {
  umkmList: UMKM[];
  type: "pending" | "approved" | "rejected";
  onDelete?: (id: string) => void;
  onApprove?: (id: string) => void;
  onReject?: (id: string) => void;
}

export function UMKMTable({ umkmList, type, onDelete, onApprove, onReject }: UMKMTableProps) {
  if (umkmList.length === 0) {
    const emptyText = type === "pending" ? "Tidak ada UMKM yang menunggu persetujuan"
      : type === "approved" ? "Belum ada UMKM yang disetujui"
      : "Tidak ada UMKM yang ditolak";
    return <div className="text-center py-8 text-muted-foreground">{emptyText}</div>;
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Alamat</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {umkmList.map(umkm => (
            <TableRow key={umkm.id}>
              <TableCell>{umkm.name}</TableCell>
              <TableCell>{umkm.category}</TableCell>
              <TableCell className="max-w-xs truncate">{umkm.address}</TableCell>
              <TableCell>{new Date(umkm.createdAt).toLocaleDateString('id-ID')}</TableCell>
              <TableCell className="text-right flex justify-end gap-2">
                {type === "pending" && onApprove && onReject && (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => onApprove(umkm.id)} className="text-green-600 hover:bg-green-50">
                      <CheckCircle className="w-4 h-4 mr-1" />Setujui
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onReject(umkm.id)} className="text-red-600 hover:bg-red-50">
                      <XCircle className="w-4 h-4 mr-1" />Tolak
                    </Button>
                  </>
                )}

                {type === "approved" && onDelete && (
                  <Button variant="ghost" size="sm" onClick={() => onDelete(umkm.id)} className="text-destructive hover:bg-destructive/10">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}

                {type === "rejected" && onDelete && onApprove && (
                  <>
                    <Button variant="ghost" size="sm" onClick={() => onApprove(umkm.id)} className="text-green-600 hover:bg-green-50">
                      <CheckCircle className="w-4 h-4 mr-1" />Setujui
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => onDelete(umkm.id)} className="text-destructive hover:bg-destructive/10">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
