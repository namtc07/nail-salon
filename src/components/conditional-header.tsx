"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ReactNode } from "react";
import { brandConfig } from "@/lib/brand";

export function ConditionalHeader() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isAdminPage) return null;

  const nav = [
    { href: "/about", label: "Giới thiệu" },
    { href: "/our-work", label: "Tác phẩm" },
    { href: "/menus", label: "Bảng giá" },
    { href: "/store-policy", label: "Chính sách" },
    { href: "/contact", label: "Liên hệ" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-brand-secondary/50 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-2xl font-bold tracking-tight text-brand-dark">
          {brandConfig.name}
        </Link>
        <nav className="hidden items-center gap-6 text-sm md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-slate-600 hover:text-brand-primary transition-colors font-medium"
            >
              {item.label}
            </Link>
          ))}
          <Link href="/book-now">
            <span className="rounded-full bg-brand-primary px-5 py-2 text-sm font-semibold text-white shadow-md hover:shadow-lg hover:bg-brand-accent transition-all">
              Đặt lịch
            </span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function ConditionalFooter() {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isAdminPage) return null;

  return (
    <footer className="border-t border-brand-secondary/50 bg-brand-light">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold text-brand-dark mb-4">{brandConfig.name}</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-3">
              {brandConfig.tagline}
            </p>
            <p className="text-sm text-slate-600">
              {brandConfig.address}
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-brand-dark mb-4">Liên hệ</h4>
            <div className="space-y-2 text-sm text-slate-600">
              <p>📞 {brandConfig.phone}</p>
              <p>✉️ {brandConfig.email}</p>
              <p className="pt-2">
                🕐 {brandConfig.hours.weekdays} (T2-T6)
                <br />
                &nbsp;&nbsp;&nbsp;{brandConfig.hours.weekend} (T7-CN)
              </p>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-brand-dark mb-4">Theo dõi chúng tôi</h4>
            <div className="space-y-2 text-sm">
              <a href={brandConfig.social.facebook} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-brand-primary transition-colors block">
                Facebook
              </a>
              <a href={brandConfig.social.instagram} target="_blank" rel="noopener noreferrer" className="text-slate-600 hover:text-brand-primary transition-colors block">
                Instagram
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-brand-secondary/30 pt-6 text-center text-sm text-slate-500">
          <p>© {new Date().getFullYear()} {brandConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export function ConditionalMain({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin") || pathname?.startsWith("/login");

  if (isAdminPage) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <main className="flex-1">
      <div className="container mx-auto px-4 py-8">{children}</div>
    </main>
  );
}

