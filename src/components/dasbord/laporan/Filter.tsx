"use client";
import type React from "react";
import { useState } from "react";
import { getCurrentMonth } from "@/utils/getMonth";
import { months } from "@/data/mock-data";
import { ChevronDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const b = [...months, "semua"];


function Filter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonth());

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value;
    setSelectedMonth(month);

    const params = new URLSearchParams(searchParams.toString());
    params.set("month", month);
    router.push(`/admin/report?${params.toString()}`);
  };

  // const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const status = e.target.value;
  //   setSelectStatus(status);

  //   /*
  //   this is function to update the params in the url with the new status value while preserving other params
  //   and redirect to the same page with the new params

  //   */
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set("status", status);
  //   router.push(`/admin/report?${params.toString()}`);
  // };

  return (
    <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
      <div className="relative">
        <select
          title="Pilih Bulan"
          className="appearance-none rounded-full bg-white px-4 py-2 pr-8 text-gray-800 shadow-sm"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {b.map((m: string) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>
      <button className="rounded-full bg-white px-4 py-2 text-gray-800 shadow-sm">
        laporan fasilitas penyewa kos
      </button>
    </div>
  );
}

export default Filter;
