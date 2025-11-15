"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

type Service = {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
};

type Staff = {
  id: number;
  name: string;
};

export default function BookingForm() {
  const searchParams = useSearchParams();
  const preselectService = searchParams.get("serviceId");

  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    note: "",
    staffId: "" as string | "",
    dateTime: "",
  });

  useEffect(() => {
    async function fetchData() {
      const [sRes, stRes] = await Promise.all([fetch("/api/services"), fetch("/api/staff")]);
      const [sData, stData] = await Promise.all([sRes.json(), stRes.json()]);
      setServices(sData);
      setStaff(stData);

      if (preselectService) {
        const id = Number(preselectService);
        if (!Number.isNaN(id)) setSelectedServiceIds([id]);
      }
    }
    fetchData();
  }, [preselectService]);

  function toggleService(id: number) {
    setSelectedServiceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedServiceIds.length) {
      alert("Vui lòng chọn ít nhất 1 dịch vụ");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        body: JSON.stringify({
          customerName: form.customerName,
          customerPhone: form.customerPhone,
          customerEmail: form.customerEmail,
          note: form.note,
          staffId: form.staffId ? Number(form.staffId) : null,
          dateTime: form.dateTime,
          serviceIds: selectedServiceIds,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Đã gửi yêu cầu đặt lịch. Shop sẽ SMS xác nhận!");
      setForm({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        note: "",
        staffId: "",
        dateTime: "",
      });
      setSelectedServiceIds([]);
    } catch (err) {
      console.error(err);
      alert("Có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setLoading(false);
    }
  }

  const selectedServices = services.filter((s) => selectedServiceIds.includes(s.id));
  const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  return (
    <form className="grid gap-8 md:grid-cols-[2fr,1.2fr]" onSubmit={handleSubmit}>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Thông tin khách hàng</h2>
        <Input
          placeholder="Họ tên *"
          value={form.customerName}
          onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
          required
        />
        <Input
          placeholder="Số điện thoại *"
          value={form.customerPhone}
          onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))}
          required
        />
        <Input
          placeholder="Email (tuỳ chọn)"
          type="email"
          value={form.customerEmail}
          onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))}
        />
        <Textarea
          placeholder="Ghi chú (ví dụ: đi 2 người, da nhạy cảm, ...)"
          rows={3}
          value={form.note}
          onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
        />

        <h2 className="pt-4 text-xl font-semibold">Chọn thời gian</h2>
        <Input
          type="datetime-local"
          value={form.dateTime}
          onChange={(e) => setForm((f) => ({ ...f, dateTime: e.target.value }))}
          required
        />

        <h2 className="pt-4 text-xl font-semibold">Chọn kỹ thuật viên</h2>
        <select
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          value={form.staffId}
          onChange={(e) => setForm((f) => ({ ...f, staffId: e.target.value }))}
        >
          <option value="">Any staff</option>
          {staff.map((s) => (
            <option key={s.id} value={String(s.id)}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Chọn dịch vụ</h2>
        <div className="max-h-[360px] space-y-2 overflow-y-auto rounded-xl border bg-white p-3">
          {services.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => toggleService(s.id)}
              className={`flex w-full items-center justify-between rounded-lg border px-3 py-2 text-left text-sm ${
                selectedServiceIds.includes(s.id)
                  ? "border-black bg-black text-white"
                  : "border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>
                <span className="font-medium">{s.name}</span>
                <span className="block text-xs opacity-80">
                  {s.duration} min · {s.category}
                </span>
              </span>
              <span className="text-sm font-semibold">{s.price.toLocaleString()}₫</span>
            </button>
          ))}
          {!services.length && <p className="text-sm text-muted-foreground">Chưa có dịch vụ nào.</p>}
        </div>

        <div className="rounded-xl border bg-white p-4 text-sm space-y-2">
          <p className="font-semibold">Tóm tắt</p>
          <p>Dịch vụ: {selectedServices.length}</p>
          <p>Thời lượng ước tính: {totalDuration} phút</p>
          <p>Tổng giá dự kiến: {totalPrice.toLocaleString()}₫</p>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Đang gửi..." : "Gửi yêu cầu đặt lịch"}
        </Button>
      </div>
    </form>
  );
}
