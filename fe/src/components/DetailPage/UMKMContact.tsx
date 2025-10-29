"use client";

import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Phone, MessageCircle } from "lucide-react";

interface UMKMContactProps {
  phone?: string;
  whatsapp?: string;
}

export function UMKMContact({ phone, whatsapp }: UMKMContactProps) {
  const handleWhatsApp = () => {
    if (whatsapp) window.open(`https://wa.me/${whatsapp}`, "_blank");
  };

  const handleCall = () => {
    if (phone) window.location.href = `tel:${phone}`;
  };

  return (
    <Card>
      <CardHeader>
        <h3>Informasi Kontak</h3>
      </CardHeader>
      <CardContent className="space-y-3">
        {phone && (
          <Button
            variant="outline"
            className="w-full justify-start"
            onClick={handleCall}
          >
            <Phone className="w-4 h-4 mr-2" />
            {phone}
          </Button>
        )}
        {whatsapp && (
          <Button
            className="w-full justify-start bg-green-500 hover:bg-green-600 text-white"
            onClick={handleWhatsApp}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Chat WhatsApp
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
