"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { brandConfig } from "@/lib/brand";
import Gallery from "@/components/gallery";

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-brand-light via-white to-brand-secondary">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/hero-nails.jpg')] bg-cover bg-center opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/60 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-sm uppercase tracking-[0.3em] text-brand-primary font-medium"
              >
                {brandConfig.tagline}
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold tracking-tight leading-tight text-brand-dark"
              >
                {brandConfig.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-xl text-slate-700 leading-relaxed max-w-lg"
              >
                Chăm sóc bàn tay và bàn chân của bạn với những thiết kế tinh tế, không gian
                thư giãn và dịch vụ chuyên nghiệp.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Link href="/book-now">
                  <motion.div
                    className="rounded-full bg-brand-primary px-8 py-4 text-sm font-semibold text-white shadow-lg hover:shadow-xl"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Đặt lịch ngay
                  </motion.div>
                </Link>
                <Link href="/menus">
                  <motion.div
                    className="rounded-full border-2 border-brand-primary px-8 py-4 text-sm font-semibold text-brand-primary bg-white/80 backdrop-blur-sm"
                    whileHover={{ scale: 1.05, backgroundColor: "white" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Xem bảng giá
                  </motion.div>
                </Link>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="pt-4 space-y-2 text-sm text-slate-600"
              >
                <p>📍 {brandConfig.address}</p>
                <p>📞 {brandConfig.phone}</p>
                <p>🕐 {brandConfig.hours.weekdays} (T2-T6) | {brandConfig.hours.weekend} (T7-CN)</p>
              </motion.div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-accent/20" />
              <img
                src="https://placehold.co/800x1000/F5E6D3/D4A574?text=Nail+Salon+Hero&font=playfair"
                alt="Nail salon hero"
                className="w-full h-full object-cover"
                loading="eager"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <Gallery />

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          >
            {[
              { icon: "💅", title: "Chuyên nghiệp", desc: "Đội ngũ kỹ thuật viên giàu kinh nghiệm, được đào tạo bài bản" },
              { icon: "✨", title: "Thiết kế độc đáo", desc: "Nhiều mẫu nail art theo xu hướng, cá nhân hóa theo sở thích" },
              { icon: "🌿", title: "Sản phẩm cao cấp", desc: "Sử dụng sơn và dụng cụ chất lượng, an toàn cho sức khỏe" },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="text-center p-8 rounded-2xl bg-gradient-to-br from-brand-light to-white border border-brand-secondary/50 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-3 text-brand-dark">{feature.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
