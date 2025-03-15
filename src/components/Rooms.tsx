import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { roomsData } from "@/data/mock-data"

export default function Rooms() {
    return (
        <section id="kamar" className="py-16 md:py-24 bg-green-50/50">
          <div className="justify-center mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Pilihan Kamar</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Tipe Kamar Kami</h2>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Pilih kamar yang sesuai dengan kebutuhan dan budget Anda
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              {roomsData.map((room, i) => (
                <Card key={i} className={`border-green-100 ${room.popular ? "ring-2 ring-green-500 ring-offset-2" : ""}`}>
                  {room.popular && (
                    <div className="absolute -top-3 right-4">
                      <Badge className="bg-green-500 text-white hover:bg-green-600">Terpopuler</Badge>
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle>{room.title}</CardTitle>
                    <div className="mt-2 text-2xl font-bold text-green-700">
                      {room.price}
                      <span className="text-sm font-normal text-gray-500">/bulan</span>
                    </div>
                    <CardDescription className="mt-2">{room.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {room.features.map((feature, j) => (
                        <li key={j} className="flex items-center text-sm">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="mr-2 h-4 w-4 text-green-500"
                          >
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button className="w-full mt-6 bg-green-100 text-green-800 hover:bg-green-200">Lihat Detail</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )
}

