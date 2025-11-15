"use client";

import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export default function BookingActions({ bookingId, disabled }: { bookingId: number; disabled: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handle(action: "confirm" | "reject") {
    const reason = action === "reject" ? window.prompt("Lý do từ chối (có thể bỏ qua)", "") : undefined;

    startTransition(async () => {
      await fetch(`/api/admin/bookings/${action}`, {
        method: "POST",
        body: JSON.stringify({ id: bookingId, reason }),
      });
      router.refresh();
    });
  }

  if (disabled) return null;

  return (
    <div className="flex gap-2">
      <Button size="sm" disabled={pending} onClick={() => handle("confirm")}>
        Confirm
      </Button>
      <Button size="sm" variant="destructive" disabled={pending} onClick={() => handle("reject")}>
        Reject
      </Button>
    </div>
  );
}
