import Link from "next/link"
import { Instagram, Facebook, Twitter } from "lucide-react"
import { navigationItems, contactData, businessHours } from "@/data/mock-data"

export default function Footer() {
  return (
    <footer className="border-t bg-white py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-md bg-green-200 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-green-700"
                >
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-green-800">GreenKost</span>
            </div>
            <p className="text-sm text-gray-500">
              Hunian kost modern dengan fasilitas lengkap, lokasi strategis, dan lingkungan yang nyaman untuk mahasiswa
              dan profesional muda.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-500 hover:text-green-700">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-700">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-500 hover:text-green-700">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Navigasi</h3>
            <nav className="flex flex-col space-y-2">
              {navigationItems.map((item) => (
                <Link
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm text-gray-600 hover:text-green-700 transition-colors"
                >
                  {item}
                </Link>
              ))}
            </nav>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Kontak</h3>
            <div className="space-y-2">
              {contactData.map((item, i) => (
                <p key={i} className="flex items-start text-sm text-gray-600">
                  <item.icon className="mr-2 h-4 w-4 text-green-600" />
                  {item.content}
                </p>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">Jam Operasional</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {businessHours.map((hours, i) => (
                <p key={i}>{hours}</p>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500">
          <p>© 2023 GreenKost. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}

