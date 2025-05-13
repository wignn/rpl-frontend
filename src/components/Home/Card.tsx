"use client"
import Image from "next/image"
import { RoomTypeResponse } from "@/types/room"
import { useRouter } from "next/navigation"

function RoomTypeCard({ room, url }: { room: RoomTypeResponse; url: string }) {
  const router = useRouter();
  
  const handleClick = (id: string) => {
    router.push(`/view/${id}`)
  }
    return (
      <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100 p-3">
        <div className="relative h-48 bg-gray-200 rounded-lg">
          <div className="absolute top-2 left-2 bg-green-300 text-green-800 px-2 py-0.5 rounded-md font-medium text-sm z-10">
            Tipe {room.room_type}
          </div>
          <Image
            src={`${url}/${room.image}` || "/placeholder.svg?height=200&width=300"}
            alt={`Tipe ${room.room_type}`}
            fill
            className="object-cover rounded-lg"
          />
          <div className="absolute bottom-2 right-2">
            <button onClick={() => handleClick(room.id_roomtype)} title="x" className="cursor-pointer flex items-center justify-center bg-black text-white rounded-full w-8 h-8">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
  

  export default RoomTypeCard