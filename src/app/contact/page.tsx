"use client";

import { motion } from "framer-motion";
import ContactForm from "@/components/contact-form";
import { brandConfig } from "@/lib/brand";

export default function ContactPage() {
  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-brand-dark">Liên hệ với chúng tôi</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Nếu bạn có câu hỏi về dịch vụ, bảng giá hoặc hợp tác, hãy để lại thông tin và chúng tôi sẽ liên hệ lại.
        </p>
      </motion.div>

      <div className="grid gap-12 md:grid-cols-[1.5fr,1fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="space-y-6"
        >
          <ContactForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-6"
        >
          <div className="rounded-2xl bg-gradient-to-br from-brand-light to-white border border-brand-secondary/50 p-6 space-y-4">
            <h3 className="text-xl font-bold text-brand-dark mb-4">Thông tin liên hệ</h3>
            <div className="space-y-3 text-sm text-slate-700">
              <div>
                <p className="font-medium text-brand-primary mb-1">📍 Địa chỉ</p>
                <p>{brandConfig.address}</p>
              </div>
              <div>
                <p className="font-medium text-brand-primary mb-1">📞 Điện thoại</p>
                <a href={`tel:${brandConfig.phone.replace(/\s/g, '')}`} className="hover:text-brand-primary transition-colors">
                  {brandConfig.phone}
                </a>
              </div>
              <div>
                <p className="font-medium text-brand-primary mb-1">✉️ Email</p>
                <a href={`mailto:${brandConfig.email}`} className="hover:text-brand-primary transition-colors">
                  {brandConfig.email}
                </a>
              </div>
              <div>
                <p className="font-medium text-brand-primary mb-1">🕐 Giờ mở cửa</p>
                <p>{brandConfig.hours.weekdays} (T2-T6)</p>
                <p>{brandConfig.hours.weekend} (T7-CN)</p>
              </div>
            </div>
          </div>

          <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-brand-secondary to-brand-light border border-brand-secondary/50 flex items-center justify-center">
            <div className="text-center text-slate-400 text-xs p-4">
              <p className="mb-2">🗺️</p>
              <p>Embed Google Maps here</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
