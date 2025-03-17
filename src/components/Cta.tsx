import { Button } from "@/components/ui/button"

export default function Cta() {
  return (
    <section className="py-16 md:py-24 bg-green-600 text-white">
    <div className="container mx-auto max-w-7xl px-4 md:px-6">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Siap Untuk Pindah ke GreenKost?
          </h2>
          <p className="mx-auto max-w-[700px] text-white/90 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Jangan lewatkan kesempatan untuk tinggal di hunian nyaman dengan fasilitas lengkap dan lokasi strategis
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Button className="bg-white text-green-800 hover:bg-gray-100">Pesan Sekarang</Button>
          <Button className="bg-white text-green-800 hover:bg-gray-100">
            Jadwalkan Kunjungan
          </Button>
        </div>
      </div>
    </div>
  </section> 
  )
}

