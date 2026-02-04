"use client";

import { useEffect, useState } from "react";

function formatTime(date: Date) {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}

export default function AvailabilityStatus() {
  const [time, setTime] = useState("00:00:00");

  useEffect(() => {
    const update = () => setTime(formatTime(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute top-8 right-6 md:right-16 flex items-center gap-2 z-20">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <div className="flex flex-col leading-tight">
        <span className="text-[11px] tracking-wide text-neutral-500">
          Available for work
        </span>
        <span className="text-[11px] tracking-[0.18em] text-neutral-500/70 font-mono tabular-nums">
          {time}
        </span>
      </div>
    </div>
  );
}
