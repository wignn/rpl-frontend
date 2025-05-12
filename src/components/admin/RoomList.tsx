"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Edit, Trash, Home, Check, X } from "lucide-react";
import RoomModal from "./RoomModal";
import RoomListSkeleton from "@/components/sekleton/roomList";
import type { RoomDetailResponse, RoomTypeResponse } from "@/types/room";
import { apiRequest } from "@/lib/api";
import ConfirmDialog from "../alert/confirmDialog";
import AlertMessage from "../alert/alertMessage";

interface Props {
  accessToken: string;
  roomtypes: RoomTypeResponse[];
}

enum ROOMSTATUS {
  AVAILABLE = "AVAILABLE",
  NOTAVAILABLE = "NOTAVAILABLE",
}

export default function RoomListContent({ accessToken, roomtypes }: Props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<
    RoomDetailResponse | undefined
  >(undefined);
  const [rooms, setRooms] = useState<RoomDetailResponse[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleAddClick = () => {
    setSelectedRoom(undefined);
    setIsModalOpen(true);
  };
  const [alert, setAlert] = useState({
    type: "success" as "success" | "error",
    message: "",
    isOpen: false,
  });

  const handleConfirmDelete = useCallback(async () => {
    if (!selectedRoom) return;

    try {
      await apiRequest({
        endpoint: `/room/${selectedRoom.id_room}`,
        method: "DELETE",
      });

      setAlert({
        type: "success",
        message: "Tipe kamar berhasil dihapus",
        isOpen: true,
      });

      fetchRooms();
    } catch (error) {
      console.error("Error deleting room type:", error);
      setAlert({
        type: "error",
        message: "Gagal menghapus tipe kamar. Silakan coba lagi.",
        isOpen: true,
      });
    } finally {
      setIsConfirmDialogOpen(false);
      setSelectedRoom(undefined);
    }
  }, [selectedRoom]);

  const fetchRooms = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiRequest<RoomDetailResponse[]>({
        endpoint: "/room",
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setRooms(response);
    } catch (error) {
      console.error("Error fetching rooms:", error);
      setError("Gagal memuat data kamar. Silakan coba lagi.");
    } finally {
      setIsLoading(false);
    }
  },[accessToken])
  const handleDeleteClick = async (room: RoomDetailResponse) => {
    setIsConfirmDialogOpen(true);
    setSelectedRoom(room);
  };

  useEffect(() => {
    fetchRooms();
  }, [ fetchRooms]);

  const handleEditClick = (room: RoomDetailResponse) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleSuccess = () => {
    console.log("Room added/updated successfully");
    setIsModalOpen(false);
    fetchRooms();
  };


  if (isLoading) {
    return <RoomListSkeleton />;
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-800">Daftar Kamar</h2>
          <button
            onClick={handleAddClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Kamar
          </button>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
          <div className="text-red-500 mb-2">⚠️ {error}</div>
          <button
            onClick={fetchRooms}
            className="mt-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg transition-colors"
          >
            Coba Lagi
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Daftar Kamar</h2>
        <button
          onClick={handleAddClick}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Kamar
        </button>
      </div>

      {rooms.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <Home className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            Belum ada kamar
          </h3>
          <p className="text-gray-500 mb-4">
            Tambahkan kamar baru untuk mulai mengelola properti Anda
          </p>
          <button
            onClick={handleAddClick}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg inline-flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Kamar Pertama
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {rooms.map((room) => (
            <div
              key={room.id_room}
              className={`bg-white rounded-xl shadow-sm overflow-hidden border-l-4 ${
                room.status === ROOMSTATUS.AVAILABLE
                  ? "border-green-500"
                  : "border-red-500"
              }`}
            >
              <div className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <h4 className="text-lg font-medium text-gray-800">
                    Kamar {room.id_room.slice(-4)}
                  </h4>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      room.status === ROOMSTATUS.AVAILABLE
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {room.status === ROOMSTATUS.AVAILABLE ? (
                      <span className="flex items-center">
                        <Check className="w-3 h-3 mr-1" />
                        Tersedia
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <X className="w-3 h-3 mr-1" />
                        Terisi
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2 mb-4">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Tipe:</span>{" "}
                    {room.roomtype?.room_type || "-"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Harga:</span> Rp{" "}
                    {room.roomtype?.price?.toLocaleString("id-ID") || "-"}
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Dibuat:</span>{" "}
                    {new Date(room.created_at).toLocaleDateString("id-ID")}
                  </p>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    onClick={() => handleEditClick(room)}
                    className="p-2 rounded-full hover:bg-gray-100"
                    title="Edit"
                  >
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button
                    onClick={() => handleDeleteClick(room)}
                    className="p-2 rounded-full hover:bg-gray-100"
                    title="Hapus"
                  >
                    <Trash className="w-4 h-4 text-red-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Konfirmasi Hapus"
        message={`Apakah Anda yakin ingin menghapus kamar "${selectedRoom?.id_room}"?`}
        confirmText="Hapus"
        cancelText="Batal"
        confirmButtonClass="bg-red-500 hover:bg-red-600"
        onConfirm={handleConfirmDelete}
        onCancel={() => setIsConfirmDialogOpen(false)}
      />

      <RoomModal
        isOpen={isModalOpen}
        roomTypes={roomtypes}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleSuccess}
        room={selectedRoom}
        accessToken={accessToken}
      />

      <AlertMessage
        type={alert.type}
        message={alert.message}
        isOpen={alert.isOpen}
        onClose={() => setAlert((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
