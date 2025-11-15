import Link from "next/link";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Đây là khu vực quản lý dành cho chủ shop: xem và xử lý booking, quản lý dịch vụ.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Quản lý Bookings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Xem danh sách booking, xác nhận hoặc từ chối các đặt lịch.
            </p>
            <Link href="/admin/bookings" className="text-sm text-blue-600 hover:underline">
              Xem bookings →
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quản lý Dịch vụ</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Thêm, sửa, xóa các dịch vụ nail salon (Manicure, Pedicure, Nail Art...).
            </p>
            <Link href="/admin/services" className="text-sm text-blue-600 hover:underline">
              Quản lý dịch vụ →
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
