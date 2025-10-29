"use client";

import { UMKM } from "../../lib/types";
import { Card, CardHeader, CardContent } from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { UMKMTable } from "./UMKMTable";

interface UMKMTabsProps {
  umkmList: UMKM[];
  onDeleteUMKM: (id: string) => void;
  onApproveUMKM: (id: string) => void;
  onRejectUMKM: (id: string) => void;
}

export function UMKMTabs({ umkmList, onDeleteUMKM, onApproveUMKM, onRejectUMKM }: UMKMTabsProps) {
  const pendingUMKM = umkmList.filter(u => u.status === "pending");
  const approvedUMKM = umkmList.filter(u => u.status === "approved");
  const rejectedUMKM = umkmList.filter(u => u.status === "rejected");

  return (
    <Card>
      <CardHeader><h2>Kelola UMKM</h2></CardHeader>
      <CardContent>
        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="pending">Pending ({pendingUMKM.length})</TabsTrigger>
            <TabsTrigger value="approved">Disetujui ({approvedUMKM.length})</TabsTrigger>
            <TabsTrigger value="rejected">Ditolak ({rejectedUMKM.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <UMKMTable umkmList={pendingUMKM} type="pending" onDelete={onDeleteUMKM} onApprove={onApproveUMKM} onReject={onRejectUMKM} />
          </TabsContent>

          <TabsContent value="approved">
            <UMKMTable umkmList={approvedUMKM} type="approved" onDelete={onDeleteUMKM} />
          </TabsContent>

          <TabsContent value="rejected">
            <UMKMTable umkmList={rejectedUMKM} type="rejected" onDelete={onDeleteUMKM} onApprove={onApproveUMKM} onReject={onRejectUMKM} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
