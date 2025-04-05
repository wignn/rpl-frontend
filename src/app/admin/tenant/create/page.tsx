"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { apiRequest } from "@/lib/api"

export default function TambahPenyewaPage() {
  const [status, setStatus] = useState()
  const router = useRouter()
  const [formData, setFormData] = useState({
    nama: "",
    nomorTelepon: "",
    status: "aktif",
    alamat: "",
    tipeKost: "",
    harga: "",
    tanggalMasuk: "",
  })

  useEffect(()=>{
    const fetchData = async ()=>{
      try {
        const response = await apiRequest<any>({endpoint: "/roomtype", method: "GET"})
        if (response) {
          const data = await response.json()
          setStatus(data)
        } else {
          console.error("Error fetching data:", response.statusText)
        }
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  },[])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Here you would typically send the data to your API
      // const response = await fetch('/api/penyewa', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData)
      // })

      // if (response.ok) {
      //   router.push('/penyewa')
      // }

      console.log("Form submitted:", formData)
      // For now, just redirect
      router.push("/penyewa")
    } catch (error) {
      console.error("Error submitting form:", error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-md w-full max-w-4xl p-8">
        <h1 className="text-xl font-medium text-gray-700 mb-6">Identitas penyewa</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nama" className="block text-sm text-gray-600">
                nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="tipeKost" className="block text-sm text-gray-600">
                tipe kost
              </label>
              <select
                id="tipeKost"
                name="tipeKost"
                value={formData.tipeKost}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none bg-white"
                required
              >
                <option value="" disabled>
                  Pilih tipe kost
                </option>
                <option value="standard">Standard</option>
                <option value="premium">Premium</option>
                <option value="deluxe">Deluxe</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="nomorTelepon" className="block text-sm text-gray-600">
                nomor telepon
              </label>
              <input
                type="tel"
                id="nomorTelepon"
                name="nomorTelepon"
                value={formData.nomorTelepon}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="harga" className="block text-sm text-gray-600">
                harga
              </label>
              <input
                type="text"
                id="harga"
                name="harga"
                value={formData.harga}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="status" className="block text-sm text-gray-600">
                status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none bg-white"
                required
              >
                <option value="aktif">Aktif</option>
                <option value="nonaktif">Nonaktif</option>
              </select>
            </div>

            <div className="space-y-2">
              <label htmlFor="tanggalMasuk" className="block text-sm text-gray-600">
                tanggal masuk
              </label>
              <select
                id="tanggalMasuk"
                name="tanggalMasuk"
                value={formData.tanggalMasuk}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500 appearance-none bg-white"
                required
              >
                <option value="" disabled>
                  Pilih tanggal
                </option>
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <option key={day} value={day}>
                    {day}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="alamat" className="block text-sm text-gray-600">
                alamat
              </label>
              <textarea
                id="alamat"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                rows={4}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors"
            >
              buat
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

