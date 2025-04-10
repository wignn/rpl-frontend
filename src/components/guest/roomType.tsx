"use client";

import Image from "next/image";
import { Building2, Phone } from "lucide-react";
import type { RoomTypeResponse } from "@/types/room";
import Link from "next/link";

interface Props {
  roomType: RoomTypeResponse;
  url: string;
}

export default function PropertyDetail({ roomType, url }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-green-100 to-green-300">
      <header className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <nav className="flex items-center space-x-6">
            <Link
              href="#"
              className="text-black font-medium hover:text-green-600"
            >
              Tentang Kami
            </Link>
            <Link
              href="/"
              className="text-black font-medium hover:text-green-600"
            >
              Tipe Kamar
            </Link>
            <Link
              target="_blank"
              href={"https://wa.me/6285215810688"}
              className="text-black font-medium hover:text-green-600"
            >
              Pesan
            </Link>
          </nav>
          <button className="px-4 py-2 rounded-lg border border-zinc-900 text-black font-medium hover:bg-zinc-100">
            Logout
          </button>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Main Image */}
          <div className="md:col-span-2">
            <div className="relative w-full aspect-[4/3] bg-gray-300 rounded-lg overflow-hidden">
              <div className="w-full h-full flex items-center justify-center">
                <Image
                  src={`${url}/${roomType.image}`}
                  alt="Kost Tipe B"
                  className="object-contain max-w-full max-h-full"
                  width={800}
                  height={600}
                  priority
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-zinc-800">
              kost {roomType.room_type}
            </h1>
            <p className="text-sm text-zinc-600">
              Jl. Surotokunto, Dsn. Bendasari 2 RT 12 RW 05 No 25,
              Desa Kondangjaya
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            {/* Amenities */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              {roomType.facility.map((facility, index) => (
                <div
                  key={index}
                  className="flex items-center w-16 bg-white rounded-lg p-4 shadow-sm"
                >
                  <span className="text-sm font-medium text-zinc-700">
                    {facility.facility_name}
                  </span>
                </div>
              ))}
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
              <h2 className="text-lg font-bold text-zinc-800 mb-3">
                Deskripsi kost
              </h2>
              <p className="text-sm text-zinc-700 leading-relaxed">
                Kost tipe b terdapat kamar dengan pintu untuk privasi penyewa
                serta terdapat ruang makan sendiri. Untuk harga single dan
                pasutri itu sama yaitu 900.000
              </p>
            </div>
          </div>

          {/* Pricing Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-xl font-bold text-zinc-800 mb-6">Rp 900.000</h3>

            <div className="space-y-2 mb-6">
              <p className="text-sm text-zinc-600">
                token listrik bayar sendiri
              </p>
              <p className="text-sm text-zinc-600">termasuk token air</p>
            </div>

            <Link className="cursor-pointer" href={`https://wa.me/6285215810688`}>
              <button className="w-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 px-4 rounded-lg mb-6">
                Pesan sekarang
              </button>
            </Link>
            <div className="flex justify-between pt-2 border-t border-gray-100">
              <button className="flex items-center text-zinc-700 text-sm">
                <Building2 className="w-4 h-4 mr-2" />
                Property Inquiry
              </button>
              <button className="flex items-center text-zinc-700 text-sm">
                <Phone className="w-4 h-4 mr-2" />
                Contact Host
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
