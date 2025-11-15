"use client";

import { motion } from "framer-motion";
import { brandConfig } from "@/lib/brand";

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-medium mb-3">
            Giới thiệu
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-6">Về chúng tôi</h1>
        </div>
        
        <div className="prose prose-lg max-w-none space-y-6 text-slate-700 leading-relaxed">
          <p>
            <strong className="text-brand-dark">{brandConfig.name}</strong> là tiệm nail chuyên về các thiết kế hiện đại, sang trọng, với đội
            ngũ kỹ thuật viên nhiều kinh nghiệm. Chúng tôi tập trung vào trải nghiệm thư
            giãn, sạch sẽ và an toàn cho khách hàng.
          </p>
          <p>
            Bạn có thể tham khảo các mẫu nail tại trang <strong>Tác phẩm</strong>, xem bảng giá ở <strong>Bảng giá</strong> và
            đặt lịch trực tuyến tại <strong>Đặt lịch</strong>.
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="rounded-2xl bg-gradient-to-br from-brand-light to-white border border-brand-secondary/50 p-6">
          <h3 className="text-xl font-bold text-brand-dark mb-4">Tầm nhìn</h3>
          <p className="text-slate-600 leading-relaxed">
            Trở thành tiệm nail hàng đầu với dịch vụ chuyên nghiệp, không gian sang trọng và trải nghiệm tuyệt vời cho mọi khách hàng.
          </p>
        </div>
        <div className="rounded-2xl bg-gradient-to-br from-brand-light to-white border border-brand-secondary/50 p-6">
          <h3 className="text-xl font-bold text-brand-dark mb-4">Cam kết</h3>
          <p className="text-slate-600 leading-relaxed">
            Sử dụng sản phẩm chất lượng cao, đảm bảo vệ sinh an toàn, và luôn lắng nghe ý kiến của khách hàng để không ngừng cải thiện.
          </p>
        </div>
      </motion.div>
    </div>
  );
}
