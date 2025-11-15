"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export interface HotSpot {
  name: string;
  location: string;
  description: string;
  category: string;
}

export function UMKMHotSpot() {
  const [hotSpot, setHotSpot] = useState<HotSpot>({
    name: "",
    location: "",
    description: "",
    category: "Kuliner",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hotSpot.name || !hotSpot.location || !hotSpot.description) {
      toast.error("Lengkapi semua field Hot Spot!");
      return;
    }
    console.log("Hot Spot submitted:", hotSpot);
    toast.success(`Hot Spot "${hotSpot.name}" berhasil ditambahkan!`);
    setHotSpot({ name:"", location:"", description:"", category:"Kuliner" });
  };

  return (
    <Card>
      <CardHeader><h2>Tambah Hot Spot</h2></CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="hotspotName">Nama Hot Spot *</Label>
            <Input id="hotspotName" value={hotSpot.name} onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setHotSpot({...hotSpot, name:e.target.value})} placeholder="Contoh: Pasar Tradisional Lamongan" />
          </div>
          <div>
            <Label htmlFor="hotspotLocation">Lokasi *</Label>
            <Input id="hotspotLocation" value={hotSpot.location} onChange={e=>setHotSpot({...hotSpot, location:e.target.value})} placeholder="Contoh: Jl. Panglima Sudirman, Lamongan" />
          </div>
          <div>
            <Label htmlFor="hotspotCategory">Kategori *</Label>
            <Select value={hotSpot.category} onValueChange={(val: any)=>setHotSpot({...hotSpot, category:val})}>
              <SelectTrigger id="hotspotCategory"><SelectValue/></SelectTrigger>
              <SelectContent>
                <SelectItem value="Kuliner">Kuliner</SelectItem>
                <SelectItem value="Ruang Publik">Ruang Publik</SelectItem>
                <SelectItem value="Sentra Kerajinan">Sentra Kerajinan</SelectItem>
                <SelectItem value="Desa Wisata">Desa Wisata</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="hotspotDescription">Deskripsi *</Label>
            <Textarea id="hotspotDescription" value={hotSpot.description} onChange={e=>setHotSpot({...hotSpot, description:e.target.value})} placeholder="Contoh: Pusat perdagangan tradisional dengan berbagai UMKM makanan dan kerajinan" />
          </div>
          <Button type="submit" className="w-full bg-primary hover:bg-green-700">
            <Plus className="w-4 h-4 mr-2" /> Tambah Hot Spot
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
