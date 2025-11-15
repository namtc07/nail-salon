"use client";

import { motion } from "framer-motion";

const galleryImages = [
  { id: 1, src: "https://placehold.co/600x600/F5E6D3/D4A574?text=Nail+Art+1&font=playfair", alt: "Nail art design 1" },
  { id: 2, src: "https://placehold.co/600x600/F5E6D3/D4A574?text=Nail+Art+2&font=playfair", alt: "Nail art design 2" },
  { id: 3, src: "https://placehold.co/600x600/F5E6D3/D4A574?text=Nail+Art+3&font=playfair", alt: "Nail art design 3" },
  { id: 4, src: "https://placehold.co/600x600/F5E6D3/D4A574?text=Nail+Art+4&font=playfair", alt: "Nail art design 4" },
  { id: 5, src: "https://placehold.co/600x600/F5E6D3/D4A574?text=Nail+Art+5&font=playfair", alt: "Nail art design 5" },
  { id: 6, src: "https://placehold.co/600x600/F5E6D3/D4A574?text=Nail+Art+6&font=playfair", alt: "Nail art design 6" },
];

export default function Gallery() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-brand-light">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.2em] text-brand-primary font-medium mb-3">Our Work</p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Khám phá những tác phẩm nghệ thuật trên móng tay của chúng tôi
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {galleryImages.map((image, index) => (
            <motion.div
              key={image.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square overflow-hidden rounded-2xl group cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
