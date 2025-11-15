import { prisma } from "@/lib/prisma";
import ServiceManagement from "@/components/admin/service-management";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await prisma.service.findMany({
    orderBy: [{ category: "asc" }, { name: "asc" }],
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Quản lý Dịch vụ</h1>
      </div>
      <ServiceManagement initialServices={services} />
    </div>
  );
}

