import { prisma } from "@/lib/prisma";
import BookingActions from "@/components/admin/booking-actions";

export const dynamic = "force-dynamic";

export default async function AdminBookingsPage() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: "desc" },
    include: { services: true, staff: true },
  });

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Bookings</h1>
      <div className="overflow-x-auto rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-3 py-2 text-left">Customer</th>
              <th className="px-3 py-2 text-left">Phone</th>
              <th className="px-3 py-2 text-left">Services</th>
              <th className="px-3 py-2 text-left">Staff</th>
              <th className="px-3 py-2 text-left">Time</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="px-3 py-2 font-medium">{b.customerName}</td>
                <td className="px-3 py-2">{b.customerPhone}</td>
                <td className="px-3 py-2">{b.services.map((s) => s.name).join(", ")}</td>
                <td className="px-3 py-2">{b.staff?.name || "Any"}</td>
                <td className="px-3 py-2">{new Date(b.dateTime as any).toLocaleString("vi-VN")}</td>
                <td className="px-3 py-2">
                  <span
                    className={
                      b.status === "PENDING"
                        ? "rounded-full bg-amber-100 px-2 py-1 text-xs text-amber-700"
                        : b.status === "CONFIRMED"
                        ? "rounded-full bg-emerald-100 px-2 py-1 text-xs text-emerald-700"
                        : "rounded-full bg-rose-100 px-2 py-1 text-xs text-rose-700"
                    }
                  >
                    {b.status}
                  </span>
                </td>
                <td className="px-3 py-2">
                  <BookingActions bookingId={b.id} disabled={b.status !== "PENDING"} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
