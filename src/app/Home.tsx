import { RoomTypeResponse } from "@/types/room"
import Image from "next/image"
import Link from "next/link"

interface Props {
  roomtype: RoomTypeResponse[];
  user: boolean;
  url: string;
}

export default async function Home({roomtype, user, url}:Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b  from-green-50 to-green-200">
      <header className="sticky top-0 z-10 p-4 bg-white shadow-sm">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <Link href="/" className="font-medium text-green-800">
              Tentang Kami
            </Link>
            <Link href="/" className="font-medium text-gray-600">
              Tipe Kamar
            </Link>
            <Link href="/" className="font-medium text-gray-600 hidden sm:block">
              Fasilitas Umum
            </Link>
            <Link href="/" className="font-medium text-gray-600 hidden sm:block">
              Kontak
            </Link>
          </div>
            <div>
            {!user ? (
              <Link
              href="/login"
              className="bg-white border border-green-600 text-green-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-green-50"
              >
              Login
              </Link>
            ) : (
              <Link
              href="/logout"
              className="bg-white border border-red-600 text-red-600 px-4 py-1 rounded-full text-sm font-medium hover:bg-red-50"
              >
              Logout
              </Link>
            )}
            </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <section className="mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Nama Kost</h1>
          <p className="text-gray-600 text-sm mb-4">
            Jl. Sumatera no.10, Bulan Bintang 2, RT/RW 10/05, Desa Kostarijaya
          </p>
{/* 
          <div className="relative w-full h-48 sm:h-64 md:h-80 rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=800" alt="Nama Kost" fill className="object-cover" priority />
          </div> */}
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tipe Kamar</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roomtype.map((type) => (
              <RoomTypeCard key={type.id_roomtype} room={type} url={url}/>
            ))}
          </div>

        </section>

        {/* Contact Section */}
        <section className="mb-10">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Ada pertanyaan? Tanyakan!</h2>
            <p className="text-gray-600 mb-4">
              Kami selalu siap membantu Anda dengan pertanyaan seputar kost kami. Silakan hubungi kami melalui form di
              bawah ini.
            </p>

            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  rows={4}
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

              <div className="flex-none">
                <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
                  Kirim Pesan
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">© 2023 Nama Kost. Hak Cipta Dilindungi.</p>
            <div className="flex space-x-4">
              <Link href="/" className="text-gray-600 hover:text-green-600">
                Syarat & Ketentuan
              </Link>
              <Link href="/" className="text-gray-600 hover:text-green-600">
                Kebijakan Privasi
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


function RoomTypeCard({ room, url }: { room: RoomTypeResponse ; url: string }) {
  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="relative h-[28rem] sm:h-[32rem] md:h-[36rem]">
        <Image
          src={`${url}/${room.image}` || ""}
          alt={`Tipe ${room.room_type} `}
          fill
          className="object-cover"
        />
        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded-md font-medium z-10">
          Tipe {room.room_type}
        </div>
      </div>
      <div className="p-4 flex justify-between items-center">
        <span className="text-gray-700">Rp {room.price.toLocaleString('id-ID')}</span>
        <button className="flex items-center justify-center w-8 h-8 bg-black text-white rounded-full">
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
  );
}
