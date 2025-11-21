import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Suspense } from "react";
import MenusSkeleton from "@/components/menus-skeleton";

type Service = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  price: number;
  duration: number;
};

async function getServices(): Promise<Service[]> {
  // Fetch directly from database with caching
  try {
    const services = await prisma.service.findMany({
      orderBy: [{ category: "asc" }, { name: "asc" }],
    });
    return services;
  } catch (error) {
    console.error("Không thể tải danh sách dịch vụ", error);
    return [];
  }
}

function MenusContent() {
  return (
    <Suspense fallback={<MenusSkeleton />}>
      <MenusContentInner />
    </Suspense>
  );
}

async function MenusContentInner() {
  const services = await getServices();

  if (services.length === 0) {
    return (
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <h1 className="text-2xl font-bold text-brand-dark">Service Menu</h1>
        </CardHeader>
        <CardContent className="space-y-2 text-slate-600">
          <p>Hiện chúng tôi chưa tải được danh sách dịch vụ.</p>
          <p>Vui lòng thử lại sau vài phút hoặc kiểm tra kết nối cơ sở dữ liệu.</p>
        </CardContent>
      </Card>
    );
  }

  type Service = (typeof services)[number];
  const grouped = services.reduce((acc: Record<string, Service[]>, s: Service) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, Service[]>);

  return (
    <div className="space-y-12">
      <div className="max-w-3xl space-y-4 text-center mb-12">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-medium">
          Bảng giá
        </p>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-brand-dark">Service Menu</h1>
        <p className="text-lg text-slate-600 leading-relaxed">Bảng giá tham khảo cho các dịch vụ manicure, pedicure và nail art.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {Object.entries(grouped).map(([category, items], categoryIndex) => (
          <div key={category}>
            <Card className="h-full hover:shadow-xl transition-all duration-300 border-brand-secondary/50">
              <CardHeader className="border-b border-brand-secondary/30 bg-gradient-to-br from-brand-light/50 to-white">
                <h2 className="text-2xl font-bold text-brand-dark">{category}</h2>
              </CardHeader>
              <CardContent className="space-y-4 pt-6">
                {(items as Service[]).map((s: Service, index) => (
                  <div
                    key={s.id}
                    className="flex items-start justify-between gap-4 border-b border-slate-100 pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="font-semibold text-lg">{s.name}</p>
                        <Badge variant="outline" className="text-xs">
                          {s.duration} min
                        </Badge>
                      </div>
                      {s.description && (
                        <p className="text-sm text-slate-600 leading-relaxed">{s.description}</p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <p className="text-xl font-bold mb-2">{s.price.toLocaleString()}₫</p>
                      <Link href={`/book-now?serviceId=${s.id}`}>
                        <span className="text-sm text-brand-primary hover:text-brand-accent font-medium inline-block transition-transform hover:scale-105">
                          Đặt lịch →
                        </span>
                      </Link>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function MenusPage() {
  return <MenusContent />;
}

// Tránh pre-render lúc build để không cần kết nối DB ở build step (Vercel)
export const dynamic = "force-dynamic";
