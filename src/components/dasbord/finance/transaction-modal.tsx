"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { FinanceDetailsResponse } from "@/types/finance"
import { apiRequest } from "@/lib/api"

interface TransactionModalProps {
  onClose: () => void
  transaction: FinanceDetailsResponse | null
  onSave: (transaction: FinanceDetailsResponse) => void
}

enum INOUT {
  INCOME = "INCOME",
  OUTCOME = "OUTCOME",
}

interface Tenant {
  id_tenant: string
  full_name: string
  room?: {
    id_room: string
    room_name: string
    rent_in: string
    rent_out: string | null
    status: string
  }
    rent?: {
        id_rent: string
        id_tenant: string
        id_room: string
        rent_date: string
        rent_out: string | null
    }
}

export function TransactionModal({ onClose, transaction, onSave }: TransactionModalProps) {
  const isEditing = !!transaction
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    id_finance: transaction?.id_finance || "",
    type: transaction?.type || INOUT.INCOME,
    category: transaction?.category || "",
    amount: transaction?.amount.toString() || "",
    payment_date: transaction?.payment_date
      ? new Date(transaction.payment_date).toISOString().split("T")[0]
      : new Date().toISOString().split("T")[0],
    id_tenant: transaction?.id_tenant || "",
    id_rent: transaction?.id_rent || "",
  })

  // Fetch tenants data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const tenantsData = await apiRequest<Tenant[]>({
          endpoint: "/tenant",
          method: "GET",
        })

        if (tenantsData) {
          setTenants(tenantsData)
        }
      } catch (err) {
        console.error("Error fetching tenant data:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Auto-update id_rent when tenant changes
  useEffect(() => {
    const selectedTenant = tenants.find(t => t.id_tenant === formData.id_tenant)
    if (selectedTenant?.room?.id_room) {
      setFormData((prev) => ({
        ...prev,
        id_rent: selectedTenant.rent?.id_rent || "",
      }))
      console.log("Selected tenant ID:", selectedTenant)
      console.log("Selected tenant room ID:", selectedTenant.room.id_room)
    }
  }, [formData.id_tenant, tenants])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const submissionData = {
      ...formData,
      amount: Number.parseFloat(formData.amount),
    } as unknown as FinanceDetailsResponse

    onSave(submissionData)
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {isEditing ? "Edit Transaksi" : "Tambah Transaksi Baru"}
            </h3>
            <button title="x" onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-slate-500"></div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                  Tipe Transaksi
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value={INOUT.INCOME}>Pemasukan</option>
                  <option value={INOUT.OUTCOME}>Pengeluaran</option>
                </select>
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                  Kategori
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  placeholder="Contoh: Sewa Kamar, Listrik, dll"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                  Jumlah (Rp)
                </label>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="payment_date" className="block text-sm font-medium text-gray-700 mb-1">
                  Tanggal
                </label>
                <input
                  type="date"
                  id="payment_date"
                  name="payment_date"
                  value={formData.payment_date}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                />
              </div>

              <div>
                <label htmlFor="id_tenant" className="block text-sm font-medium text-gray-700 mb-1">
                  Penyewa
                </label>
                <select
                  id="id_tenant"
                  name="id_tenant"
                  value={formData.id_tenant}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Pilih Penyewa</option>
                  {tenants.map((tenant) => (
                    <option key={tenant.id_tenant} value={tenant.id_tenant}>
                      {tenant.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="id_rent" className="block text-sm font-medium text-gray-700 mb-1">
                  Kamar
                </label>
                <select
                  id="id_rent"
                  name="id_rent"
                  value={formData.id_rent}
                  disabled
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500 cursor-not-allowed"
                >
                  <option value="">
                    {formData.id_rent
                      ? tenants.find(t => t.id_tenant === formData.id_tenant)?.room?.id_room
                      : "Pilih kamar"}
                  </option>
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md text-sm font-medium text-white bg-slate-600 hover:bg-slate-700"
                >
                  {isEditing ? "Simpan Perubahan" : "Simpan"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
