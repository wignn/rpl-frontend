"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { getCurrentMonth } from "@/lib/utils/getMonth"

const months = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
]

const allMonths = [...months, "semua"]

interface ReportFilterProps {
  currentMonth: string
  onMonthChange: (month: string) => void
}

export default function ReportFilter({ currentMonth, onMonthChange }: ReportFilterProps) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth || getCurrentMonth())

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value
    setSelectedMonth(month)
    onMonthChange(month)
  }

  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
      <div className="relative">
        <select
          title="Pilih Bulan"
          className="appearance-none rounded-full bg-white px-4 py-2 pr-8 text-gray-800 shadow-sm"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          {allMonths.map((m: string) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
      </div>
      <button className="rounded-full bg-white px-4 py-2 text-gray-800 shadow-sm">Laporan fasilitas penyewa kos</button>
    </div>
  )
}
