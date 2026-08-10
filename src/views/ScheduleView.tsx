import React, { useState } from "react";
import { Calendar, Clock, MapPin, User } from "lucide-react";
import { ScheduleItem } from "../types";

interface ScheduleViewProps {
  schedule: ScheduleItem[];
  className?: string;
}

export const ScheduleView: React.FC<ScheduleViewProps> = ({ schedule, className = "السنة الثانية - ب" }) => {
  const days: ('الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس')[] = [
    "الأحد",
    "الإثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
  ];

  const [selectedDay, setSelectedDay] = useState<'الأحد' | 'الإثنين' | 'الثلاثاء' | 'الأربعاء' | 'الخميس'>("الأحد");

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-extrabold text-slate-900 text-lg">البرنامج الدراسي الأسبوعي</h1>
              <p className="text-xs text-slate-500">جدول الحصص والتوقيت اليومي لـ ({className})</p>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-1.5 rounded-xl text-xs font-bold self-start sm:self-auto">
          التوقيت الصباحي: 08:00 - 11:15
        </div>
      </div>

      {/* Mobile Day Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {days.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold shrink-0 transition-all ${
              selectedDay === day
                ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Items Grid for Selected Day */}
      <div className="space-y-3">
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
          حصص يوم {selectedDay}:
        </h2>

        {schedule.filter((s) => s.day === selectedDay).length === 0 ? (
          <div className="bg-white p-8 rounded-3xl text-center border border-slate-100 text-slate-400 font-bold text-xs">
            لا توجد حصص مبرمجة في هذا اليوم 🎉
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {schedule
              .filter((s) => s.day === selectedDay)
              .map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs hover:border-emerald-300 transition-all space-y-2 text-right"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5" />
                      {item.timeSlot}
                    </span>

                    {item.room && (
                      <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400" />
                        {item.room}
                      </span>
                    )}
                  </div>

                  <h3 className="font-extrabold text-sm text-slate-900">{item.subjectName}</h3>

                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.teacherName}</span>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>

    </div>
  );
};
