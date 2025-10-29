"use client";

import { useState } from "react";
import { UMKM } from "../../lib/types";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface UMKMFormProps {
  onAddUMKM?: (umkm: Omit<UMKM, "id" | "createdAt">) => void;
}

export function UMKMForm({ onAddUMKM }: UMKMFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    category: "Makanan",
    description: "",
    address: "",
    lat: "",
    lng: "",
    photoUrl: "",
    phone: "",
    whatsapp: "",
  });

  const handleCategoryChange = (value: string) =>
    setFormData({ ...formData, category: value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.description ||
      !formData.address ||
      !formData.lat ||
      !formData.lng ||
      !formData.photoUrl
    ) {
      toast.error("Mohon lengkapi semua field yang wajib diisi");
      return;
    }

    const lat = parseFloat(formData.lat);
    const lng = parseFloat(formData.lng);
    if (isNaN(lat) || isNaN(lng)) {
      toast.error("Latitude dan Longitude harus berupa angka yang valid");
      return;
    }

    const status: "pending" | "approved" | "rejected" = "pending";

    const newUMKM: Omit<UMKM, "id" | "createdAt"> = {
      name: formData.name,
      category: formData.category,
      description: formData.description,
      address: formData.address,
      coordinates: { lat, lng },
      photos: [formData.photoUrl],
      phone: formData.phone || undefined,
      whatsapp: formData.whatsapp || undefined,
      status,
    };

    try {
      const res = await fetch("http://localhost:5000/api/umkm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUMKM),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        console.error("Backend error:", errorData);
        toast.error(
          "Gagal menambahkan UMKM: " + (errorData.message || res.statusText)
        );
        return;
      }

      toast.success("UMKM berhasil ditambahkan! Menunggu persetujuan.");
      
      setFormData({
        name: "",
        category: "Makanan",
        description: "",
        address: "",
        lat: "",
        lng: "",
        photoUrl: "",
        phone: "",
        whatsapp: "",
      });

      if (onAddUMKM) onAddUMKM(newUMKM);
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Gagal menambahkan UMKM. Cek console untuk detail.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2>Tambah UMKM Baru</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nama UMKM *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Contoh: Warung Makan Bu Yanti"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Kategori *</Label>
            <Select value={formData.category} onValueChange={handleCategoryChange}>
              <SelectTrigger id="category"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Makanan">Makanan</SelectItem>
                <SelectItem value="Minuman">Minuman</SelectItem>
                <SelectItem value="Jasa">Jasa</SelectItem>
                <SelectItem value="Kerajinan">Kerajinan</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="description">Deskripsi *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Ceritakan tentang UMKM Anda..."
              rows={3}
              required
            />
          </div>

          <div>
            <Label htmlFor="address">Alamat *</Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Jl. Contoh No. 123, Jakarta"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lat">Latitude *</Label>
              <Input
                id="lat"
                type="number"
                step="any"
                value={formData.lat}
                onChange={(e) =>
                  setFormData({ ...formData, lat: e.target.value })
                }
                placeholder="-6.2088"
                required
              />
            </div>
            <div>
              <Label htmlFor="lng">Longitude *</Label>
              <Input
                id="lng"
                type="number"
                step="any"
                value={formData.lng}
                onChange={(e) =>
                  setFormData({ ...formData, lng: e.target.value })
                }
                placeholder="106.8456"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="photoUrl">URL Foto *</Label>
            <Input
              id="photoUrl"
              type="url"
              value={formData.photoUrl}
              onChange={(e) =>
                setFormData({ ...formData, photoUrl: e.target.value })
              }
              placeholder="https://example.com/photo.jpg"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Nomor Telepon</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              placeholder="081234567890"
            />
          </div>

          <div>
            <Label htmlFor="whatsapp">WhatsApp</Label>
            <Input
              id="whatsapp"
              value={formData.whatsapp}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp: e.target.value })
              }
              placeholder="6281234567890"
            />
          </div>

          <Button type="submit" className="w-full bg-primary hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" /> Tambah UMKM
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
