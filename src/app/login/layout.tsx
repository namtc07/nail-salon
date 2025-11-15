import { ReactNode } from "react";

// Layout riêng cho login page - không hiển thị header/footer
export default function LoginLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      {children}
    </div>
  );
}

