"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

type Service = {
  id: number;
  name: string;
  description: string | null;
  category: string;
  price: number;
  duration: number;
};

export default function ServiceManagement({ initialServices }: { initialServices: Service[] }) {
  const router = useRouter();
  const [services, setServices] = useState(initialServices);
  const [editing, setEditing] = useState<number | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    duration: "",
  });

  const grouped = services.reduce((acc: Record<string, Service[]>, s: Service) => {
    acc[s.category] = acc[s.category] || [];
    acc[s.category].push(s);
    return acc;
  }, {} as Record<string, Service[]>);

  function resetForm() {
    setForm({ name: "", description: "", category: "", price: "", duration: "" });
    setEditing(null);
    setIsCreating(false);
  }

  function startEdit(service: Service) {
    setForm({
      name: service.name,
      description: service.description || "",
      category: service.category,
      price: service.price.toString(),
      duration: service.duration.toString(),
    });
    setEditing(service.id);
    setIsCreating(false);
  }

  function startCreate() {
    resetForm();
    setIsCreating(true);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const data = {
      name: form.name,
      description: form.description || null,
      category: form.category,
      price: parseInt(form.price),
      duration: parseInt(form.duration),
    };

    startTransition(async () => {
      const url = editing ? `/api/admin/services/${editing}` : "/api/admin/services";
      const method = editing ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        const updatedService = await res.json();

        if (editing) {
          // Cập nhật service đã sửa
          setServices((prev) => {
            const updated = prev.map((s) => (s.id === editing ? updatedService : s));
            // Sắp xếp lại theo category và name
            return updated.sort((a, b) => {
              if (a.category !== b.category) {
                return a.category.localeCompare(b.category);
              }
              return a.name.localeCompare(b.name);
            });
          });
        } else {
          // Thêm service mới và sắp xếp lại
          setServices((prev) => {
            const updated = [...prev, updatedService];
            return updated.sort((a, b) => {
              if (a.category !== b.category) {
                return a.category.localeCompare(b.category);
              }
              return a.name.localeCompare(b.name);
            });
          });
        }

        resetForm();
        router.refresh(); // Refresh để sync với server
      } else {
        alert("Có lỗi xảy ra");
      }
    });
  }

  async function handleDelete(id: number) {
    if (!confirm("Bạn có chắc muốn xóa dịch vụ này?")) return;

    startTransition(async () => {
      const res = await fetch(`/api/admin/services/${id}`, { method: "DELETE" });
      if (res.ok) {
        // Xóa service khỏi state ngay lập tức
        setServices((prev) => prev.filter((s) => s.id !== id));
        router.refresh(); // Refresh để sync với server
      } else {
        alert("Có lỗi xảy ra");
      }
    });
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Danh sách Dịch vụ</CardTitle>
            <Button onClick={startCreate} disabled={isCreating || editing !== null}>
              + Thêm dịch vụ
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category} className="mb-6 last:mb-0">
              <h3 className="mb-3 text-lg font-semibold">{category}</h3>
              <div className="space-y-2">
                {items.map((s) => (
                  <div key={s.id} className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{s.name}</p>
                        <Badge>{s.duration} min</Badge>
                        <Badge variant="outline">{s.price.toLocaleString()}₫</Badge>
                      </div>
                      {s.description && <p className="text-sm text-muted-foreground">{s.description}</p>}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => startEdit(s)}>
                        Sửa
                      </Button>
                      <Button size="sm" variant="danger" onClick={() => handleDelete(s.id)} disabled={pending}>
                        Xóa
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {(isCreating || editing) && (
        <Card>
          <CardHeader>
            <CardTitle>{editing ? "Sửa dịch vụ" : "Thêm dịch vụ mới"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium">Tên dịch vụ</label>
                <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} required />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Mô tả</label>
                <Textarea
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  rows={2}
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium">Danh mục</label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  placeholder="Ví dụ: Manicure, Pedicure, Nail Art"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">Giá (₫)</label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                    required
                    min="0"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Thời gian (phút)</label>
                  <Input
                    type="number"
                    value={form.duration}
                    onChange={(e) => setForm((f) => ({ ...f, duration: e.target.value }))}
                    required
                    min="1"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button type="submit" disabled={pending}>
                  {pending ? "Đang lưu..." : editing ? "Cập nhật" : "Thêm"}
                </Button>
                <Button type="button" variant="outline" onClick={resetForm}>
                  Hủy
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
