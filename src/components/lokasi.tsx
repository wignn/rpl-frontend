"use client"


import { MapPin } from "lucide-react"
import dynamic from 'next/dynamic';

const MapLeaflet = dynamic(() => import('@/components/MapLeaflet'), { ssr: false });

export const nearbyPlacesData = [
    { name: "Universitas Indonesia", distance: "500 meter (5 menit jalan kaki)" },
    { name: "Halte Transjakarta", distance: "300 meter (3 menit jalan kaki)" },
    { name: "Mall Depok Town Square", distance: "1 km (5 menit dengan transportasi)" },
    { name: "Rumah Sakit UI", distance: "800 meter (8 menit jalan kaki)" },
    { name: "Minimarket", distance: "50 meter (1 menit jalan kaki)" },
  ]
  

export default function Lokasi() {
  return (
    <section id="lokasi" className="py-16 md:py-24 ">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Lokasi Strategis</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Berada di lokasi strategis dengan akses mudah ke berbagai fasilitas penting
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl mt-12">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Dekat dengan:</h3>
              <ul className="space-y-3">
                {nearbyPlacesData.map((place, i) => (
                  <li key={i} className="flex items-start">
                    <MapPin className="mr-2 h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <span className="font-medium">{place.name}</span>
                      <p className="text-sm text-gray-500">{place.distance}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="pt-4">
                <button className="bg-green-100 text-green-800 hover:bg-green-200">Lihat di Google Maps</button>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-green-100">
                <MapLeaflet lat={-6.322189261099615} lng={107.33368275548138} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
