import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { featuresData } from "@/data/mock-data"

export default function Fitur() {
  return (
    <section id="fasilitas" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <Badge className="bg-green-100 text-green-800 text-lg px-3 py-1 hover:bg-green-100">Fasilitas Lengkap</Badge>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Fasilitas Unggulan Kami</h2>
            <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Nikmati berbagai fasilitas modern yang akan membuat pengalaman tinggal Anda lebih nyaman dan menyenangkan.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
          {featuresData.map((feature, i) => (
            <Card key={i} className="border-green-100 bg-white">
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center mb-2">
                  <feature.icon className="h-6 w-6 text-green-700" />
                </div>
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

