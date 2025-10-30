"use client";

import { Input } from "../ui/input";
import { Search } from "lucide-react";

interface SearchBarProps {
  query: string;
  onChange: (value: string) => void;
}

export function SearchBar({ query, onChange }: SearchBarProps) {
  return (
    <div className="max-w-2xl mx-auto relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
      <Input
        type="text"
        placeholder="Cari nama UMKM..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
        style={{ color: "black", backgroundColor: "white" }}
        className="pl-10 h-12 border border-gray-300 placeholder-gray-500"
      />
    </div>
  );
}
