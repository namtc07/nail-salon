"use client";

import { useState } from "react";
import { format, addDays, startOfWeek, isSameDay, isToday, isPast, addWeeks } from "date-fns";
import { motion, AnimatePresence } from "framer-motion";

type TimeSlot = {
  time: string;
  available: boolean;
};

const TIME_SLOTS: TimeSlot[] = [
  { time: "09:00", available: true },
  { time: "09:30", available: true },
  { time: "10:00", available: true },
  { time: "10:30", available: true },
  { time: "11:00", available: true },
  { time: "11:30", available: true },
  { time: "12:00", available: true },
  { time: "12:30", available: true },
  { time: "13:00", available: true },
  { time: "13:30", available: true },
  { time: "14:00", available: true },
  { time: "14:30", available: true },
  { time: "15:00", available: true },
  { time: "15:30", available: true },
  { time: "16:00", available: true },
  { time: "16:30", available: true },
  { time: "17:00", available: true },
  { time: "17:30", available: true },
  { time: "18:00", available: true },
  { time: "18:30", available: false },
  { time: "19:00", available: false },
];

export default function BookingCalendar({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
  duration = 60,
}: {
  selectedDate: Date | null;
  selectedTime: string | null;
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
  duration?: number;
}) {
  const [weekOffset, setWeekOffset] = useState(0);
  const weekStart = startOfWeek(addWeeks(new Date(), weekOffset), { weekStartsOn: 1 });
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  const getAvailableSlots = (date: Date): TimeSlot[] => {
    // Trong thực tế, bạn sẽ check với database để xem slots nào đã bị book
    // Ở đây tôi chỉ filter ra các slots không available và các slots trong quá khứ
    const now = new Date();
    const isSelectedDatePast = isPast(date) && !isToday(date);

    return TIME_SLOTS.filter((slot) => {
      if (!slot.available) return false;
      if (isSelectedDatePast) return false;
      if (isToday(date)) {
        const [hours, minutes] = slot.time.split(":").map(Number);
        const slotTime = new Date(date);
        slotTime.setHours(hours, minutes, 0, 0);
        return slotTime > now;
      }
      return true;
    });
  };

  const availableSlots = selectedDate ? getAvailableSlots(selectedDate) : [];

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setWeekOffset((prev) => prev - 1)}
          className="rounded-lg border p-2 hover:bg-slate-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <p className="text-sm font-medium text-slate-600">
          {format(weekStart, "MMM d")} - {format(addDays(weekStart, 6), "MMM d, yyyy")}
        </p>
        <button
          type="button"
          onClick={() => setWeekOffset((prev) => prev + 1)}
          className="rounded-lg border p-2 hover:bg-slate-50 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Date Picker */}
      <div className="grid grid-cols-7 gap-2">
        {weekDays.map((day) => {
          const isSelected = selectedDate && isSameDay(day, selectedDate);
          const isDayPast = isPast(day) && !isToday(day);
          const daySlots = getAvailableSlots(day);

          return (
            <motion.button
              key={day.toISOString()}
              type="button"
              onClick={() => !isDayPast && onDateSelect(day)}
              disabled={isDayPast}
              className={`
                relative rounded-xl p-3 text-center transition-all
                ${
                  isSelected
                    ? "bg-brand-primary text-white shadow-lg"
                    : "bg-white border border-slate-200 hover:border-brand-secondary"
                }
                ${isDayPast ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:shadow-md"}
                ${isToday(day) && !isSelected ? "ring-2 ring-brand-primary" : ""}
              `}
              whileHover={!isDayPast ? { scale: 1.05 } : {}}
              whileTap={!isDayPast ? { scale: 0.95 } : {}}
            >
              <div className="text-xs font-medium opacity-70">{format(day, "EEE")}</div>
              <div className="mt-1 text-lg font-semibold">{format(day, "d")}</div>
              {isToday(day) && !isSelected && (
                <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-brand-primary" />
              )}
              {daySlots.length > 0 && !isSelected && (
                <div className="mt-1 text-[10px] text-slate-500">{daySlots.length} slots</div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Time Slots */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            key={selectedDate.toISOString()}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-semibold text-slate-700">
                Chọn giờ - {format(selectedDate, "EEEE, MMMM d")}
              </h3>
              <span className="text-xs text-slate-500">({duration} phút)</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {availableSlots.map((slot) => {
                const isSelected = selectedTime === slot.time;
                return (
                  <motion.button
                    key={slot.time}
                    type="button"
                    onClick={() => onTimeSelect(slot.time)}
                    className={`
                      rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all
                      ${
                        isSelected
                          ? "border-brand-primary bg-brand-primary text-white shadow-md"
                          : "border-slate-200 bg-white text-slate-700 hover:border-brand-secondary hover:shadow-sm"
                      }
                    `}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {slot.time}
                  </motion.button>
                );
              })}
            </div>
            {availableSlots.length === 0 && (
              <p className="text-sm text-slate-500 text-center py-4">Không còn slot trống cho ngày này</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
