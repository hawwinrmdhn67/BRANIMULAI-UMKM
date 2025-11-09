"use client";

import { useState } from "react";
import { UMKM } from "../../lib/types";
import { UMKMForm } from "./UMKMForm";
import { UMKMStats } from "./UMKMStats";
import { UMKMTabs } from "./UMKMTabs";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

interface AdminPageProps {
  umkmList: UMKM[];
  onAddUMKM: (umkm: UMKM) => void; // ✅ UMKM lengkap
  onDeleteUMKM: (id: string) => void;
  onApproveUMKM: (id: string) => void;
  onRejectUMKM: (id: string) => void;
}

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "demo123";

export function AdminPage({ umkmList, onAddUMKM, onDeleteUMKM, onApproveUMKM, onRejectUMKM }: AdminPageProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      setIsAuthenticated(true);
      setUsername("");
      setPassword("");
      setError(null);
    } else {
      setError("Credensial salah. Gunakan username: admin, password: demo123 untuk demo.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen relative">
        {/* Fullscreen overlay that blurs the rest of the page */}
        <div className="fixed inset-0 z-10 bg-black/30 backdrop-blur-sm" />

        {/* Centered small glass card */}
        <div className="fixed inset-0 z-20 flex items-center justify-center p-4">
          <Card className="w-full max-w-sm bg-black/5 backdrop-blur-md border border-black/10 shadow-lg rounded-xl">
              <CardHeader>
                <h2 className="text-black text-lg">Masuk ke Panel Admin</h2>
              </CardHeader>
              <CardContent className="text-black">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="username" className="text-black">Username</Label>
                    <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="admin" className="bg-black/10 text-black placeholder:text-black/60 border border-black/20" />
                  </div>

                  <div>
                    <Label htmlFor="password" className="text-black">Password</Label>
                    <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="demo123" className="bg-gray/10 text-black placeholder:text-black/60 border border-black/20" />
                  </div>

                  {error && <div className="text-sm text-red-300">{error}</div>}

                  <div className="flex items-center justify-between">
                    <Button type="submit">Masuk</Button>
                    <div className="text-sm text-gray/90">Gunakan: <strong>admin</strong> / <strong>demo123</strong></div>
                  </div>
                </form>
              </CardContent>
            </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/30">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="mb-0">Panel Admin</h1>
          <div>
            <Button variant="ghost" onClick={handleLogout}>Logout</Button>
          </div>
        </div>

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
