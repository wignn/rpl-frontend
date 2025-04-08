"use client"

import { useEffect, useState } from "react"
import { apiRequest } from "@/lib/api"
import type { PaginatedReportResponse } from "@/types/report"
import ReportFilter from "@/components/dasbord/laporan/Filter"
import ReportTable from "@/components/dasbord/laporan/Tabel"
import ReportSkeleton from "@/components/sekleton/report"


interface ReportContentProps {
  accessToken: string
}

export default function ReportContent({ accessToken }: ReportContentProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reportData, setReportData] = useState<PaginatedReportResponse | null>(null)
  const [page, setPage] = useState(1)
  const [month, setMonth] = useState(new Date().toLocaleString("default", { month: "long" }))
  const [searchQuery, setSearchQuery] = useState("")
  const limit = 5

  const fetchReportData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        _t: Date.now().toString(),
      })
      if (month.toLowerCase() !== "semua") {
        queryParams.append("month", month.toLowerCase())
      }

      if (searchQuery) {
        queryParams.append("search", searchQuery)
      }

      const result = await apiRequest<PaginatedReportResponse>({
        endpoint: `/report?${queryParams.toString()}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      setReportData(result)
    } catch (error) {
      console.error("Error fetching report data:", error)
      setError("Gagal memuat data laporan. Silakan coba lagi.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchReportData()
  }, [page, month, searchQuery, accessToken])

  const handlePageChange = (newPage: number) => {
    setPage(newPage)
  }

  const handleMonthChange = (newMonth: string) => {
    setMonth(newMonth)
    setPage(1)
  }

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setPage(1) 
  }

  if (isLoading) {
    return <ReportSkeleton />
  }

  if (error) {
    return (
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-800">Laporan</h2>
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-500 mb-2">⚠️ {error}</div>
          <button
            onClick={fetchReportData}
            className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Laporan</h2>

      <ReportFilter
        currentMonth={month}
        onMonthChange={handleMonthChange}
        onSearch={handleSearch}
        searchQuery={searchQuery}
      />

      {reportData && (
        <ReportTable
          data={reportData.data}
          currentPage={reportData.currentPage}
          totalPages={reportData.totalPages}
          totalItems={reportData.totalItems}
          onPageChange={handlePageChange}
          accessToken={accessToken}
        />
      )}
    </div>
  )
}
