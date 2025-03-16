import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import { nearbyPlacesData } from "@/data/mock-data"

export default function Lokasi() {
  return (
    <section id="lokasi" className="py-16 md:py-24 bg-green-50/50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="bg-green-100 text-lg px-3 py-1 text-green-800 hover:bg-green-100">Lokasi</Badge>
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
                <Button className="bg-green-100 text-green-800 hover:bg-green-200">Lihat di Google Maps</Button>
              </div>
            </div>
            <div className="overflow-hidden rounded-lg border border-green-100">
              <Image
                src="/about.jpg?height=400&width=600"
                alt="Peta Lokasi"
                width={600}
                height={400}
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

