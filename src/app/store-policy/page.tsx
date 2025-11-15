"use client";

import { motion } from "framer-motion";

export default function StorePolicyPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-medium mb-3">
          Chính sách
        </p>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Store Policy</h1>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-brand-light to-white border border-brand-secondary/50 p-8"
        >
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Chính sách đặt lịch & hủy lịch</h2>
          <ul className="space-y-3 text-slate-700">
            <li className="flex items-start gap-3">
              <span className="text-brand-primary mt-1">•</span>
              <span>Vui lòng đến đúng giờ. Trễ quá 15 phút có thể phải xếp lại lịch.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-primary mt-1">•</span>
              <span>Hủy lịch trước 2 giờ vui lòng báo qua điện thoại/Zalo.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-brand-primary mt-1">•</span>
              <span>Đặt lịch online sẽ được xác nhận qua SMS trong vòng 30 phút.</span>
            </li>
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rounded-2xl bg-gradient-to-br from-brand-light to-white border border-brand-secondary/50 p-8"
        >
          <h2 className="text-2xl font-bold text-brand-dark mb-4">Chính sách bảo hành</h2>
          <div className="space-y-3 text-slate-700">
            <p>
              Nếu trong vòng <strong className="text-brand-dark">3 ngày</strong> móng bị bong tróc, tróc sơn (không do va chạm mạnh), shop
              sẽ hỗ trợ sửa miễn phí.
            </p>
            <p>
              Vui lòng liên hệ shop ngay khi phát hiện vấn đề để được hỗ trợ tốt nhất.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
