"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { X } from "lucide-react"
import { apiRequest } from "@/lib/api"
import type { RoomTypeResponse } from "@/types/room"
import type { FacilityDetailResponse } from "@/types/facility"
import AlertMessage from "@/components/alert/alertMessage"

interface RoomTypeModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess?: () => void
  roomType?: RoomTypeResponse
  facilities: FacilityDetailResponse[]
}

export default function RoomTypeModal({ isOpen, onClose,facilities, onSuccess, roomType }: RoomTypeModalProps) {
  const isUpdateMode = !!roomType
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    roomType: "",
    price: "",
    facilities: [] as string[],
  })

  const [alert, setAlert] = useState({
    type: "success" as "success" | "error",
    message: "",
    isOpen: false,
  })

  useEffect(() => {
    if (roomType) {
      setFormData({
        roomType: roomType.room_type || "",
        price: roomType.price ? `Rp ${Number(roomType.price).toLocaleString("id-ID")}` : "",
        facilities: roomType.facility?.map((f: { id_facility: string }) => f.id_facility) || [],
      })
    } else {
      resetForm()
    }
  }, [roomType, isOpen])
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }


  const handleFacilityChange = (facilityId: string) => {
    setFormData((prev) => {
      const facilities = [...prev.facilities]
      if (facilities.includes(facilityId)) {
        return {
          ...prev,
          facilities: facilities.filter((id) => id !== facilityId),
        }
      } else {
        return {
          ...prev,
          facilities: [...facilities, facilityId],
        }
      }
    })
  }

  const showAlert = (type: "success" | "error", message: string) => {
    setAlert({
      type,
      message,
      isOpen: true,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const priceAsNumber = Number.parseFloat(formData.price.replace(/[^\d]/g, ""))

      const requestData = {
        room_type: formData.roomType,
        price: priceAsNumber,
        facilities: formData.facilities,
      }

      let res

      if (isUpdateMode && roomType?.id_roomtype) {
        res = await apiRequest({
          endpoint: `/roomtype/${roomType.id_roomtype}`,
          method: "PUT",
          body: requestData,
        })
      } else {
        console.log("Request Data:", requestData)
        res = await apiRequest({
          endpoint: "/roomtype",
          method: "POST",
          body: requestData,
        })
      }

      if (res) {
        showAlert("success", `Tipe kamar berhasil ${isUpdateMode ? "diperbarui" : "ditambahkan"}`)
        resetForm()
        onClose()

        if (onSuccess) onSuccess()
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      showAlert("error", `Gagal ${isUpdateMode ? "memperbarui" : "menambahkan"} tipe kamar. Silakan coba lagi.`)
    } finally {
      setIsSubmitting(false)
    }
  }

  const resetForm = () => {
    setFormData({
      roomType: "",
      price: "",
      facilities: [],
    })
  }

  const formatPrice = (value: string) => {
    const numericValue = value.replace(/[^\d]/g, "")
    if (numericValue) {
      return `Rp ${Number.parseInt(numericValue).toLocaleString("id-ID")}`
    }
    return ""
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    const formattedValue = formatPrice(value)
    setFormData((prev) => ({ ...prev, price: formattedValue }))
  }

  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
            <h2 className="text-xl font-semibold text-gray-800">
              {isUpdateMode ? "Edit Tipe Kamar" : "Tambah Tipe Kamar Baru"}
            </h2>
            <button title="Close" onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                {/* Nama Tipe Kamar */}
                <div className="space-y-2">
                  <label htmlFor="roomType" className="block text-sm font-medium text-gray-700">
                    Nama Tipe Kamar
                  </label>
                  <input
                    type="text"
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    placeholder="Contoh: Tipe A, Deluxe, Standard"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                    Harga per Bulan
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handlePriceChange}
                    placeholder="Rp 0"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Fasilitas */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Fasilitas</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {facilities.map((facility) => (
                      <div key={facility.id_fasility} className="flex items-center">
                        <input
                          type="checkbox"
                          id={facility.id_fasility}
                          checked={formData.facilities.includes(facility.id_fasility)}
                          onChange={() => handleFacilityChange(facility.id_fasility)}
                          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        />
                        <label htmlFor={facility.id_fasility} className="ml-2 text-sm text-gray-700">
                          {facility.facility_name}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              <div className="flex justify-end gap-3 mt-8">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  disabled={isSubmitting}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors disabled:bg-green-300"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Menyimpan..." : isUpdateMode ? "Perbarui" : "Simpan"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <AlertMessage
        type={alert.type}
        message={alert.message}
        isOpen={alert.isOpen}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
      />
    </>
  )
}
