"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import BookingCalendar from "./booking-calendar";
import BookingFormSkeleton from "./booking-form-skeleton";

type Service = {
  id: number;
  name: string;
  category: string;
  duration: number;
  price: number;
  description?: string | null;
};

type Staff = {
  id: number;
  name: string;
};

export default function EnhancedBookingForm() {
  const searchParams = useSearchParams();
  const preselectService = searchParams.get("serviceId");

  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState<"services" | "datetime" | "info" | "review">("services");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const [form, setForm] = useState({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    note: "",
    staffId: "" as string | "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [sRes, stRes] = await Promise.all([fetch("/api/services"), fetch("/api/staff")]);
        const [sData, stData] = await Promise.all([sRes.json(), stRes.json()]);
        setServices(sData);
        setStaff(stData);

        if (preselectService) {
          const id = Number(preselectService);
          if (!Number.isNaN(id)) {
            setSelectedServiceIds([id]);
            setCurrentStep("datetime");
          }
        }
      } finally {
        setInitialLoading(false);
      }
    }
    fetchData();
  }, [preselectService]);

  function toggleService(id: number) {
    setSelectedServiceIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }

  function handleDateSelect(date: Date) {
    setSelectedDate(date);
    setSelectedTime(null);
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
  }

  function getDateTimeString(): string {
    if (!selectedDate || !selectedTime) return "";
    const [hours, minutes] = selectedTime.split(":").map(Number);
    const dateTime = new Date(selectedDate);
    dateTime.setHours(hours, minutes, 0, 0);
    return dateTime.toISOString();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedServiceIds.length) {
      alert("Vui lòng chọn ít nhất 1 dịch vụ");
      return;
    }
    if (!selectedDate || !selectedTime) {
      alert("Vui lòng chọn ngày và giờ");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.customerName,
          customerPhone: form.customerPhone,
          customerEmail: form.customerEmail,
          note: form.note,
          staffId: form.staffId ? Number(form.staffId) : null,
          dateTime: getDateTimeString(),
          serviceIds: selectedServiceIds,
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      alert("Đã gửi yêu cầu đặt lịch. Shop sẽ SMS xác nhận!");
      // Reset form
      setForm({
        customerName: "",
        customerPhone: "",
        customerEmail: "",
        note: "",
        staffId: "",
      });
      setSelectedServiceIds([]);
      setSelectedDate(null);
      setSelectedTime(null);
      setCurrentStep("services");
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

  const steps = [
    { id: "services", label: "Dịch vụ", number: 1 },
    { id: "datetime", label: "Thời gian", number: 2 },
    { id: "info", label: "Thông tin", number: 3 },
    { id: "review", label: "Xác nhận", number: 4 },
  ];

  if (initialLoading) {
    return <BookingFormSkeleton />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isActive = steps.findIndex((s) => s.id === currentStep) >= index;
            const isCurrent = step.id === currentStep;
            return (
              <div key={step.id} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`
                      flex items-center justify-center w-10 h-10 rounded-full font-semibold text-sm transition-all
                      ${isActive ? "bg-brand-primary text-white" : "bg-slate-200 text-slate-500"}
                      ${isCurrent ? "ring-4 ring-brand-primary ring-offset-2" : ""}
                    `}
                  >
                    {step.number}
                  </div>
                  <span className={`mt-2 text-xs font-medium ${isActive ? "text-brand-dark" : "text-slate-400"}`}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 flex-1 mx-2 ${isActive ? "bg-brand-primary" : "bg-slate-200"}`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[1.5fr,1fr]">
        {/* Main Content */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            {currentStep === "services" && (
              <motion.div
                key="services"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <h2 className="text-2xl font-bold">Chọn dịch vụ</h2>
                <div className="grid gap-3">
                  {services.map((s) => {
                    const isSelected = selectedServiceIds.includes(s.id);
                    return (
                      <motion.button
                        key={s.id}
                        type="button"
                        onClick={() => toggleService(s.id)}
                        className={`
                          relative rounded-xl border-2 p-4 text-left transition-all
                          ${isSelected 
                            ? "border-brand-primary bg-brand-primary text-white shadow-lg" 
                            : "border-slate-200 bg-white hover:border-brand-secondary hover:shadow-md"
                          }
                        `}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold">{s.name}</h3>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="h-5 w-5 rounded-full bg-white flex items-center justify-center"
                                >
                                  <svg className="w-3 h-3 text-black" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                  </svg>
                                </motion.div>
                              )}
                            </div>
                            {s.description && (
                              <p className={`mt-1 text-sm ${isSelected ? "opacity-90" : "text-slate-600"}`}>
                                {s.description}
                              </p>
                            )}
                            <div className="mt-2 flex items-center gap-3 text-sm">
                              <span className={isSelected ? "opacity-80" : "text-slate-500"}>
                                {s.duration} phút
                              </span>
                              <span className={isSelected ? "opacity-80" : "text-slate-500"}>·</span>
                              <span className={isSelected ? "opacity-80" : "text-slate-500"}>
                                {s.category}
                              </span>
                            </div>
                          </div>
                          <div className={`ml-4 text-lg font-bold ${isSelected ? "text-white" : "text-black"}`}>
                            {s.price.toLocaleString()}₫
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
                {selectedServiceIds.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4"
                  >
                    <Button
                      type="button"
                      onClick={() => setCurrentStep("datetime")}
                      className="w-full bg-brand-primary hover:bg-brand-accent text-white"
                    >
                      Tiếp tục ({selectedServiceIds.length} dịch vụ)
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {currentStep === "datetime" && (
              <motion.div
                key="datetime"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Chọn thời gian</h2>
                  <button
                    type="button"
                    onClick={() => setCurrentStep("services")}
                    className="text-sm text-slate-600 hover:text-black"
                  >
                    ← Quay lại
                  </button>
                </div>
                <BookingCalendar
                  selectedDate={selectedDate}
                  selectedTime={selectedTime}
                  onDateSelect={handleDateSelect}
                  onTimeSelect={handleTimeSelect}
                  duration={totalDuration}
                />
                {selectedDate && selectedTime && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4"
                  >
                    <Button
                      type="button"
                      onClick={() => setCurrentStep("info")}
                      className="w-full bg-brand-primary hover:bg-brand-accent text-white"
                    >
                      Tiếp tục
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {currentStep === "info" && (
              <motion.div
                key="info"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Thông tin khách hàng</h2>
                  <button
                    type="button"
                    onClick={() => setCurrentStep("datetime")}
                    className="text-sm text-slate-600 hover:text-black"
                  >
                    ← Quay lại
                  </button>
                </div>
                <Input
                  placeholder="Họ tên *"
                  value={form.customerName}
                  onChange={(e) => setForm((f) => ({ ...f, customerName: e.target.value }))}
                  required
                  className="h-12"
                />
                <Input
                  placeholder="Số điện thoại *"
                  value={form.customerPhone}
                  onChange={(e) => setForm((f) => ({ ...f, customerPhone: e.target.value }))}
                  required
                  className="h-12"
                />
                <Input
                  placeholder="Email (tuỳ chọn)"
                  type="email"
                  value={form.customerEmail}
                  onChange={(e) => setForm((f) => ({ ...f, customerEmail: e.target.value }))}
                  className="h-12"
                />
                <Textarea
                  placeholder="Ghi chú (ví dụ: đi 2 người, da nhạy cảm, ...)"
                  rows={3}
                  value={form.note}
                  onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                />
                <div>
                  <label className="mb-2 block text-sm font-medium">Kỹ thuật viên (tuỳ chọn)</label>
                  <select
                    className="w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm h-12"
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
                {form.customerName && form.customerPhone && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="pt-4"
                  >
                    <Button
                      type="button"
                      onClick={() => setCurrentStep("review")}
                      className="w-full bg-brand-primary hover:bg-brand-accent text-white"
                    >
                      Xem lại đặt lịch
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {currentStep === "review" && (
              <motion.div
                key="review"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Xác nhận đặt lịch</h2>
                  <button
                    type="button"
                    onClick={() => setCurrentStep("info")}
                    className="text-sm text-slate-600 hover:text-black"
                  >
                    ← Quay lại
                  </button>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Dịch vụ</h3>
                    <div className="space-y-2">
                      {selectedServices.map((s) => (
                        <div key={s.id} className="flex justify-between text-sm">
                          <span>{s.name}</span>
                          <span className="font-medium">{s.price.toLocaleString()}₫</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Thời gian</h3>
                    <p className="text-sm">
                      {selectedDate && format(selectedDate, "EEEE, d MMMM yyyy")} lúc {selectedTime}
                    </p>
                    <p className="text-xs text-slate-500 mt-1">Thời lượng: {totalDuration} phút</p>
                  </div>
                  <div className="border-t pt-4">
                    <h3 className="text-sm font-medium text-slate-500 mb-2">Thông tin</h3>
                    <p className="text-sm">{form.customerName}</p>
                    <p className="text-sm">{form.customerPhone}</p>
                    {form.customerEmail && <p className="text-sm">{form.customerEmail}</p>}
                  </div>
                  <div className="border-t pt-4 flex justify-between items-center">
                    <span className="text-lg font-bold">Tổng cộng</span>
                    <span className="text-2xl font-bold">{totalPrice.toLocaleString()}₫</span>
                  </div>
                </div>
                <Button type="submit" className="w-full bg-brand-primary hover:bg-brand-accent text-white h-12" disabled={loading}>
                  {loading ? "Đang gửi..." : "Xác nhận đặt lịch"}
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar Summary */}
        <div className="lg:sticky lg:top-8 h-fit">
          <div className="rounded-2xl border border-brand-secondary/50 bg-gradient-to-br from-brand-light to-white p-6 space-y-4 shadow-sm">
            <h3 className="font-semibold text-lg">Tóm tắt</h3>
            {selectedServices.length > 0 ? (
              <>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Dịch vụ</span>
                    <span className="font-medium">{selectedServices.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Thời lượng</span>
                    <span className="font-medium">{totalDuration} phút</span>
                  </div>
                  {selectedDate && selectedTime && (
                    <div className="flex justify-between">
                      <span className="text-slate-600">Thời gian</span>
                      <span className="font-medium text-xs">
                        {format(selectedDate, "d/M")} {selectedTime}
                      </span>
                    </div>
                  )}
                </div>
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Tổng giá</span>
                    <span className="text-2xl font-bold">{totalPrice.toLocaleString()}₫</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-500">Chưa chọn dịch vụ</p>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

