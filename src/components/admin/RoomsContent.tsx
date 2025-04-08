"use client"

import { useState, useEffect } from "react"
import { Plus, Edit, Trash, ImageOff } from "lucide-react"
import RoomTypeModal from "@/components/admin/RoomTypeModal"
import ConfirmDialog from "@/components/alert/confirmDialog"
import AlertMessage from "@/components/alert/alertMessage"
import RoomTypeSkeleton from "@/components/sekleton/roomtype"
import { apiRequest } from "@/lib/api"
import type { RoomTypeResponse } from "@/types/room"
import type { FacilityDetailResponse } from "@/types/facility"
import Image from "next/image"

interface Props {
  accessToken: string
  facilities: FacilityDetailResponse[]
}

export default function RoomsContent({ accessToken, facilities }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedRoomType, setSelectedRoomType] = useState<RoomTypeResponse | undefined>(undefined)
  const [roomTypes, setRoomTypes] = useState<RoomTypeResponse[]>([])
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [roomTypeToDelete, setRoomTypeToDelete] = useState<RoomTypeResponse | null>(null)
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({})

  const fetchRoomTypes = async () => {
    setIsLoading(true)
    try {
      const response = await apiRequest<RoomTypeResponse[]>({
        endpoint: "/roomtype",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      console.log("Room types fetched successfully:", response)
      setRoomTypes(response)
      setError(null)
    } catch (err) {
      console.error("Error fetching room types:", err)
      setError("Gagal memuat data tipe kamar")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchRoomTypes()
  }, [])

  const [alert, setAlert] = useState({
    type: "success" as "success" | "error",
    message: "",
    isOpen: false,
  })

  const handleAddClick = () => {
    setSelectedRoomType(undefined)
    setIsModalOpen(true)
  }

  const handleEditClick = (roomType: RoomTypeResponse) => {
    setSelectedRoomType(roomType)
    setIsModalOpen(true)
  }

  const handleDeleteClick = (roomType: RoomTypeResponse) => {
    setRoomTypeToDelete(roomType)
    setIsConfirmDialogOpen(true)
  }

  const handleDataChange = () => {
    fetchRoomTypes()
  }

  const handleConfirmDelete = async () => {
    if (!roomTypeToDelete) return

    try {
      await apiRequest({
        endpoint: `/roomtype/${roomTypeToDelete.id_roomtype}`,
        method: "DELETE",
      })

      setAlert({
        type: "success",
        message: "Tipe kamar berhasil dihapus",
        isOpen: true,
      })

      handleDataChange()
    } catch (error) {
      console.error("Error deleting room type:", error)
      setAlert({
        type: "error",
        message: "Gagal menghapus tipe kamar. Silakan coba lagi.",
        isOpen: true,
      })
    } finally {
      setIsConfirmDialogOpen(false)
      setRoomTypeToDelete(null)
    }
  }

  const handleSuccess = () => {
    setIsModalOpen(false)
    handleDataChange()
  }

  const handleImageError = (id: string) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }))
  }

  // Function to get the correct image URL
  const getImageUrl = (roomType: RoomTypeResponse) => {
    if (!roomType.image && !roomType.image) {
      return null
    }

    // // If image_url exists and is a full URL, use it directly
    // if (roomType.image && (roomType.image.startsWith("http://") || roomType.image_url.startsWith("https://"))) {
    //   return roomType.image
    // }

    // // If image_url exists but is a relative path, prepend the API URL
    // if (roomType.image_url) {
    //   return `${process.env.NEXT_PUBLIC_API_URL}/${roomType.image_url}`
    // }

    // If image exists, use it with the API URL
    if (roomType.image) {
      return `${process.env.NEXT_PUBLIC_API_URL}/${roomType.image}`
    }

    return null
  }

  if (isLoading) {
    return <RoomTypeSkeleton />
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-500 mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">{error}</h3>
        <button
          onClick={fetchRoomTypes}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          Coba Lagi
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Tipe Kamar</h2>
        <button
          onClick={handleAddClick}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Tipe Kamar
        </button>
      </div>

      {roomTypes.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="text-gray-400 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Belum ada tipe kamar</h3>
          <p className="text-gray-500 mb-4">Tambahkan tipe kamar baru untuk mulai mengelola kamar Anda</p>
          <button
            onClick={handleAddClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Tipe Kamar
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {roomTypes.map((roomType) => {
            const imageUrl = getImageUrl(roomType)
            const hasImageError = imageErrors[roomType.id_roomtype]

            return (
              <div key={roomType.id_roomtype} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="h-48 bg-gray-100 relative">
                  <div className="absolute top-3 left-3 bg-green-500 text-white px-3 py-1 rounded-lg font-medium z-10">
                    {roomType.room_type}
                  </div>

                  {imageUrl && !hasImageError ? (
                    <Image
                      src={imageUrl || "/placeholder.svg"}
                      alt={`Tipe ${roomType.room_type}`}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      onError={() => handleImageError(roomType.id_roomtype)}
                      priority
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
                      <ImageOff className="w-12 h-12 mb-2" />
                      <span className="text-sm">Tidak ada gambar</span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-800">{roomType.room_type}</h3>

                  {roomType.facility && roomType.facility.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {roomType.facility.slice(0, 3).map((facility, index: number) => (
                        <span
                          key={index}
                          className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded"
                        >
                          {facility.facility_name || `Fasilitas ${index + 1}`}
                        </span>
                      ))}
                      {roomType.facility.length > 3 && (
                        <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                          +{roomType.facility.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-green-600 font-bold">Rp {roomType.price.toLocaleString("id-ID")} / bulan</div>
                    <div className="flex space-x-2">
                      <button
                        className="p-2 rounded-full hover:bg-gray-100"
                        onClick={() => handleEditClick(roomType)}
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        className="p-2 rounded-full hover:bg-gray-100"
                        title="Hapus"
                        onClick={() => handleDeleteClick(roomType)}
                      >
                        <Trash className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      <RoomTypeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        facilities={facilities}
        onSuccess={handleSuccess}
        roomType={selectedRoomType}
      />

      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus tipe kamar "${roomTypeToDelete?.room_type}"?`}
        confirmText="Hapus"
        cancelText="Batal"
        confirmButtonClass="bg-red-500 hover:bg-red-600"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmDialogOpen(false)}
      />

      <AlertMessage
        type={alert.type}
        message={alert.message}
        isOpen={alert.isOpen}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  )
}
