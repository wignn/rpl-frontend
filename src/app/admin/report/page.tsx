import AdminNavbar from "@/components/dasbord/AdminNavbar"
import Filter from "@/components/dasbord/laporan/Filter"
import Table from "@/components/dasbord/laporan/Tabel"
import { apiRequest } from "@/lib/api"
import type { PaginatedReportResponse } from "@/types/report"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import type { UserDetailResponse } from "@/types/user"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ page: string; month: string }>
}) {
  const page = (await searchParams).page ? Number.parseInt((await searchParams).page) : 1
  const mot = (await searchParams).month
    ? (await searchParams).month
    : new Date().toLocaleString("default", { month: "long" })
  const limit = 5
  const result = await apiRequest<PaginatedReportResponse>({
    endpoint: `/report?page=${page}&limit=${limit}&month=${mot.toLocaleLowerCase()}&_t=${Date.now()}`,
    method: "GET",
  })
  const session = await getServerSession(authOptions)
  let isUser = false
  try {
    if (session?.id_user) {
      const user = await apiRequest<UserDetailResponse>({
        endpoint: `/users/${session.id_user}`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.backendTokens.accessToken}`,
        },
      })
      if (user) {
        isUser = true
      }
    }
  } catch (e) {
    console.log(e)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-500">
      <div className="justify-center flex-col flex mx-auto px-4 container">
        <AdminNavbar user={isUser} />
        <Filter />
        <Table
          data={result.data}
          currentPage={result.currentPage}
          totalPages={result.totalPages}
          month={mot}
          totalItems={result.totalItems}
        />
      </div>
    </div>
  )
}

