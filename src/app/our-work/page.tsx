"use client";

const works = [
  {
    id: 1,
    image: "https://placehold.co/600x800/F5E6D3/D4A574?text=Soft+Nude&font=playfair",
    title: "Soft Nude & Glitter",
    category: "Nude",
  },
  {
    id: 2,
    image: "https://placehold.co/600x800/F5E6D3/D4A574?text=Classic+Red&font=playfair",
    title: "Classic Red",
    category: "Classic",
  },
  {
    id: 3,
    image: "https://placehold.co/600x800/F5E6D3/D4A574?text=French+Tip&font=playfair",
    title: "French Tip",
    category: "French",
  },
  {
    id: 4,
    image: "https://placehold.co/600x800/F5E6D3/D4A574?text=Floral+Art&font=playfair",
    title: "Floral Nail Art",
    category: "Nail Art",
  },
  {
    id: 5,
    image: "https://placehold.co/600x800/F5E6D3/D4A574?text=Geometric&font=playfair",
    title: "Geometric Design",
    category: "Nail Art",
  },
  {
    id: 6,
    image: "https://placehold.co/600x800/F5E6D3/D4A574?text=Ombre&font=playfair",
    title: "Ombre Gradient",
    category: "Gradient",
  },
];

export default function OurWorkPage() {
  return (
    <div className="space-y-12">
      <div className="max-w-3xl space-y-4">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-primary font-medium">Tác phẩm</p>
        <h1 className="text-4xl md:text-5xl font-bold text-brand-dark">Our Work</h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Một vài mẫu đã thực hiện. Bạn có thể lưu lại ảnh và gửi cho shop khi muốn làm mẫu tương tự.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {works.map((w, index) => (
          <div
            key={w.id}
            className="group overflow-hidden rounded-2xl border border-brand-secondary/50 bg-white shadow-sm hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img
                src={w.image}
                alt={w.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div className="space-y-1 p-4">
              <p className="text-base font-semibold text-brand-dark">{w.title}</p>
              <p className="text-xs text-brand-primary font-medium">{w.category}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
