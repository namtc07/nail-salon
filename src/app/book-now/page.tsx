"use client";

import { motion } from "framer-motion";
import EnhancedBookingForm from "@/components/enhanced-booking-form";
import { Suspense } from "react";
import BookingFormSkeleton from "@/components/booking-form-skeleton";

export default function BookNowPage() {
  return (
    <div className="space-y-12 pb-16 bg-gradient-to-b from-white to-brand-light min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center space-y-4 max-w-3xl mx-auto pt-8"
      >
        <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-medium">Đặt lịch</p>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-brand-dark">Đặt lịch ngay</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Chọn dịch vụ, thời gian và kỹ thuật viên phù hợp. Shop sẽ gửi SMS xác nhận sau khi kiểm tra lịch.
        </p>
      </motion.div>
      <Suspense fallback={<BookingFormSkeleton />}>
        <EnhancedBookingForm />
      </Suspense>
    </div>
  );
}
