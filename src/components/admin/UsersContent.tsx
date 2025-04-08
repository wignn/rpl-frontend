"use client"

import type { TenantWithRentAndRoom } from "@/types/tenat"
import { Plus, Eye, Edit, Trash } from "lucide-react"
import { useEffect, useState } from "react"
import TenantModal from "./TenatModal"
import { apiRequest } from "@/lib/api"
import TenantSkeleton from "@/components/sekleton/tenant"

interface Props {
  accessToken: string
}

export default function UsersContent({ accessToken }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [tenants, setTenants] = useState<TenantWithRentAndRoom[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchTenants = async () => {
    setIsLoading(true)
    try {
      const response = await apiRequest<TenantWithRentAndRoom[]>({
        endpoint: "/tenant",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })

      setTenants(response)
    } catch (error) {
      console.error("Error fetching tenants:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTenants()
  }, []) 

  const handleSuccess = () => {
    fetchTenants()
    setIsModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Penghuni</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Penghuni
        </button>
      </div>

      {isLoading ? (
        <TenantSkeleton />
      ) : (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kamar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tanggal Masuk
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tenants.map((item) => (
                  <tr key={item.id_tenant} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <span className="text-green-600 font-medium">{item.full_name.charAt(0).toUpperCase()}</span>
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.full_name}</div>
                          <div className="text-sm text-gray-500">{item.no_telp}</div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{item.room ? item.room.room_name : "-"}</div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        {item.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.rent?.rent_date ? new Date(item.rent.rent_date).toLocaleDateString("id-ID") : "-"}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button title="Lihat" className="text-blue-600 hover:text-blue-900">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button title="Edit" className="text-gray-600 hover:text-gray-900">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button title="Hapus" className="text-red-600 hover:text-red-900">
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 px-6 py-3 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Menampilkan <span className="font-medium">1</span> sampai{" "}
              <span className="font-medium">{Math.min(5, tenants.length)}</span> dari{" "}
              <span className="font-medium">{tenants.length}</span> penghuni
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border rounded-md bg-white text-gray-700 hover:bg-gray-50">
                Sebelumnya
              </button>
              <button className="px-3 py-1 border rounded-md bg-white text-gray-700 hover:bg-gray-50">
                Selanjutnya
              </button>
            </div>
          </div>
        </div>
      )}

      <TenantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSuccess={handleSuccess} />
    </div>
  )
}
