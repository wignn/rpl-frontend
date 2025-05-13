"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { apiRequest } from "@/lib/api";
import type { RoomDetailResponse } from "@/types/room";
import type { TenantCreateRequest, TenantWithRentAndRoom } from "@/types/tenat";

enum ROOMSTATUS {
  AVAILABLE = "AVAILABLE",
  NOTAVAILABLE = "NOTAVAILABLE",
}

interface TenantModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRefresh: () => void;
  showAlert: (type: "success" | "error", message: string) => void;
  tenant?: TenantWithRentAndRoom;
  accessToken?: string;
}

export default function TenantModal({
  isOpen,
  onClose,
  showAlert,
  onRefresh,
  tenant,
  accessToken,
}: TenantModalProps) {
  const [rooms, setRooms] = useState<RoomDetailResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isUpdateMode = !!tenant;

  const [formData, setFormData] = useState({
    nama: "",
    nomorTelepon: "",
    status: "SINGLE",
    alamat: "",
    room: "",
    harga: "",
    tanggalMasuk: "",
    noKtp: "",
  });

  useEffect(() => {
    if (tenant) {
      setFormData({
        nama: tenant.full_name || "",
        nomorTelepon: tenant.no_telp || "",
        status: tenant.status || "SINGLE",
        alamat: tenant.address || "",
        room: tenant.room?.id_room || "",
        harga: "",
        tanggalMasuk: tenant.rent?.rent_date
          ? new Date(tenant.rent.rent_date).toISOString().split("T")[0]
          : "",
        noKtp: tenant.no_ktp || "",
      });
    } else {
      resetForm();
    }
  }, [tenant, isOpen]);

  useEffect(() => {
    if (isOpen) {
      const fetchData = async () => {
        try {
          const response = await apiRequest<RoomDetailResponse[]>({
            endpoint: "/room",
            method: "GET",
          });
          if (response) {
            setRooms(response);
          } else {
            console.error("Error fetching data:", response);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }
  }, [isOpen]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "room") {
      const selectedRoom = rooms.find((r) => r.id_room === value);
      setFormData((prev) => ({
        ...prev,
        room: value,
        harga: selectedRoom ? selectedRoom.roomtype.price.toString() : "",
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const requestData = {
        full_name: formData.nama,
        no_telp: formData.nomorTelepon,
        address: formData.alamat,
        id_room: formData.room,
        rent_in: new Date(formData.tanggalMasuk),
        status: formData.status,
        no_ktp: formData.noKtp,
      };

      let res;

      if (isUpdateMode && tenant?.id_tenant) {
        res = await apiRequest<TenantCreateRequest>({
          endpoint: `/tenant/${tenant.id_tenant}`,
          method: "PUT",
          body: requestData,
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
        });

      } else {
        res = await apiRequest<TenantCreateRequest>({
          endpoint: "/tenant",
          method: "POST",
          body: requestData,
          headers: accessToken
            ? { Authorization: `Bearer ${accessToken}` }
            : undefined,
        });
      }

      if (res) {
        showAlert("success", "Data penghuni berhasil disimpan");
        onRefresh();
        onClose();
      } else {
        showAlert("error", "Gagal menyimpan data penghuni. Silakan coba lagi.");
      }
    } catch (error) {
      showAlert("error", "Gagal menyimpan data penghuni. Silakan coba lagi.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      nama: "",
      nomorTelepon: "",
      status: "SINGLE",
      alamat: "",
      room: "",
      harga: "",
      tanggalMasuk: "",
      noKtp: "",
    });
  };

  if (!isOpen) return null;

  const availableRooms = isUpdateMode
    ? [
        ...rooms.filter(
          (r) =>
            r.status === ROOMSTATUS.AVAILABLE || r.id_room === formData.room
        ),
      ]
    : rooms.filter((r) => r.status === ROOMSTATUS.AVAILABLE);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center z-10">
          <h2 className="text-xl font-semibold text-gray-800">
            {isUpdateMode ? "Edit Penghuni" : "Tambah Penghuni Baru"}
          </h2>
          <button
            title="Close"
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nama */}
              <div className="space-y-2">
                <label
                  htmlFor="nama"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama
                </label>
                <input
                  type="text"
                  id="nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Room */}
              <div className="space-y-2">
                <label
                  htmlFor="room"
                  className="block text-sm font-medium text-gray-700"
                >
                  Pilih Kamar
                </label>
                <select
                  id="room"
                  name="room"
                  value={formData.room}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="" disabled>
                    Pilih kamar tersedia
                  </option>
                  {availableRooms.map((r, i) => (
                    <option key={r.id_room} value={r.id_room}>
                      {i + 1}. {r.roomtype.room_type} - {`Kamar ${r.id_room}`} -
                      Rp{r.roomtype.price.toLocaleString()}
                    </option>
                  ))}
                </select>
              </div>

              {/* Nomor Telepon */}
              <div className="space-y-2">
                <label
                  htmlFor="nomorTelepon"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nomor Telepon
                </label>
                <input
                  type="tel"
                  id="nomorTelepon"
                  name="nomorTelepon"
                  value={formData.nomorTelepon}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Harga */}
              <div className="space-y-2">
                <label
                  htmlFor="harga"
                  className="block text-sm font-medium text-gray-700"
                >
                  Harga
                </label>
                <input
                  type="text"
                  id="harga"
                  name="harga"
                  value={formData.harga}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-gray-50"
                  readOnly
                />
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label
                  htmlFor="status"
                  className="block text-sm font-medium text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                >
                  <option value="MARRIED">Married</option>
                  <option value="SINGLE">Single</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="noKtp"
                  className="block text-sm font-medium text-gray-700"
                >
                  No KTP
                </label>
                <input
                  type="text"
                  id="noKtp"
                  name="noKtp"
                  value={formData.noKtp}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Alamat */}
              <div className="space-y-2 md:col-span-1">
                <label
                  htmlFor="alamat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alamat
                </label>
                <textarea
                  id="alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  rows={4}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
              </div>

              {/* Tanggal Masuk */}
              <div className="space-y-2">
                <label
                  htmlFor="tanggalMasuk"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tanggal Masuk
                </label>
                <input
                  type="date"
                  id="tanggalMasuk"
                  name="tanggalMasuk"
                  value={formData.tanggalMasuk}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
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
                {isSubmitting
                  ? "Menyimpan..."
                  : isUpdateMode
                  ? "Perbarui"
                  : "Simpan"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
