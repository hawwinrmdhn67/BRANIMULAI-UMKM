"use client";

import { Home, UserCog } from "lucide-react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

interface NavbarProps {
  currentPage: "home" | "admin";
  onNavigate: (page: "home" | "admin") => void;
  pendingCount?: number;
}

export function Navbar({ currentPage, onNavigate, pendingCount = 0 }: NavbarProps) {
  return (
    <nav className="bg-primary text-primary-foreground shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo dan Nama */}
          <div className="flex items-center gap-2">
            <img 
              src="/img/branimulai.png"
              alt="Logo BRANIMULAI"
              className="w-50 h-10 object-contain"
            />
            <h1 className="text-white font-semibold">BRANIMULAI</h1>
          </div>
          
          {/* Navigasi */}
          <div className="flex gap-2">
            <Button
              variant={currentPage === "home" ? "secondary" : "ghost"}
              onClick={() => onNavigate("home")}
              className={currentPage === "home" ? "" : "text-white hover:bg-green-700"}
            >
              <Home className="w-4 h-4 mr-2" />
              Beranda
            </Button>
            <div className="relative">
              <Button
                variant={currentPage === "admin" ? "secondary" : "ghost"}
                onClick={() => onNavigate("admin")}
                className={currentPage === "admin" ? "" : "text-white hover:bg-green-700"}
              >
                <UserCog className="w-4 h-4 mr-2" />
                Admin
              </Button>
              {pendingCount > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white h-5 px-1.5 min-w-5 flex items-center justify-center">
                  {pendingCount}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
