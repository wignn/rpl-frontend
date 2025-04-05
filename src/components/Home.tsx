import Image from "next/image";
import Link from "next/link";

interface Props {
  roomTypes: {
    id: number;
    type: string;
    price: string;
    description: string;
    features: string[];
    availability: number;
  }[];
}

export default function RoomTypes({ roomTypes }: Props) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-200">
      <nav className="flex justify-center gap-4 items-center p-4 bg-white/80">
        <div className="flex space-x-6">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Tentang Kami
          </Link>
          <Link
            href="/room-types"
            className="text-gray-700 hover:text-gray-900 font-bold"
          >
            Tipe Kamar
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            Fasilitas
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            Pesan
          </Link>
          <Link href="#" className="text-gray-700 hover:text-gray-900">
            Testimonials
          </Link>
        </div>
        <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
          Logout
        </button>
      </nav>
    <div className="flex justify-center items-center py-8">
      <div className="inline-flex flex-col justify-start items-center gap-9 text-center">
        <div className="w-[531px] text-black text-6xl font-medium font-['Space_Grotesk']">
        Nama Kost
        </div>
        <div className="w-[989px] text-black text-xl font-normal font-['Space_Grotesk'] leading-7">
        Jl Surotokunto No.25, Dusun Bendasari 2, RT/RW 12/05, Desa Kondangjaya
        </div>
        <img
        alt="Room Image"
        className="self-stretch h-96 rounded-[10px] border border-black"
        src="image.png"
        />
      </div>
    </div>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Tipe Kamar</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 items-center justify-center flex gap-8 mb-12">
          {roomTypes.map((room) => (
            <div
              key={room.id}
              className="w-[600px] p-12 bg-zinc-100 rounded-[45px] shadow-[0px_5px_0px_0px_rgba(25,26,35,1.00)] outline  outline-offset-[-1px] outline-zinc-900 inline-flex justify-between items-center overflow-hidden"
            >
              <div className="inline-flex flex-col justify-center items-start gap-24">
                <div className="flex flex-col justify-start items-start">
                  <div className="px-1.5 bg-lime-300 rounded-md flex flex-col justify-start items-start gap-2.5">
                    <div className="text-black text-3xl font-medium">Tipe</div>
                  </div>
                  <div className="px-1.5 bg-lime-300 rounded-md flex flex-col justify-start items-start gap-2.5">
                    <div className="text-black text-3xl font-medium">
                      {room.type}
                    </div>
                  </div>
                </div>
                <div className="inline-flex justify-start items-center gap-3.5">
                  <div className="w-10 h-10 bg-zinc-900 rounded-full" />
                  <div className="w-5 h-0 origin-top-left rotate-[-30deg] bg-zinc-900 border-[3px] border-lime-300" />
                  <div className="text-black text-xl font-normal leading-7">
                    Learn more
                  </div>
                </div>
              </div>
              <div className="w-52 h-44 relative" />
              <div className="w-64 h-48 bg-stone-300 rounded-2xl" />
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
