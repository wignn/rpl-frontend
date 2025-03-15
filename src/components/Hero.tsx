import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

export default function Hero() {
  return (
    <section id="beranda" className="relative py-20 md:py-28 overflow-hidden">
    <div className="absolute inset-0 bg-green-50/50 -z-10" />
    <div className="container mx-auto max-w-7xl px-4 md:px-6">
      <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
        <div className="flex flex-col gap-4">
          <Badge className="w-fit bg-green-100 text-green-800 hover:bg-green-100">Hunian Nyaman & Strategis</Badge>
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
            Temukan Kenyamanan Hunian di GreenKost
          </h1>
          <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Hunian kost modern dengan fasilitas lengkap, lokasi strategis, dan lingkungan yang nyaman untuk mahasiswa
            dan profesional muda.
          </p>
          <div className="flex flex-col gap-2 min-[400px]:flex-row">
            <Button className="bg-green-600 text-white hover:bg-green-700">Pesan Sekarang</Button>
            <Button variant="outline" className="border-green-200 text-green-800 hover:bg-green-50">
              Lihat Kamar <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="mx-auto lg:ml-auto">
          <Image
            src="/placeholder.svg?height=550&width=550"
            alt="Kost Modern"
            width={550}
            height={550}
            className="rounded-lg object-cover shadow-xl"
          />
        </div>
      </div>
    </div>
  </section>
  )
}

