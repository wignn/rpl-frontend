"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, Home, Info, Phone, MapPin, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const navigationItems = [
  { name: "Beranda", href: "#beranda", icon: Home },
  { name: "Tentang", href: "#tentang", icon: Info },
  { name: "Fasilitas", href: "#fasilitas", icon: MapPin },
  { name: "Kontak", href: "#kontak", icon: Phone },
  { name: "Booking", href: "#booking", icon: Calendar },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState("beranda")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [mobileMenuOpen])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-all duration-200",
        scrolled ? "bg-white shadow-sm" : "bg-white",
      )}
    >
      <div className="px-4 mx-auto flex h-14 sm:h-16 items-center justify-between">

        <div className="flex items-center gap-2 z-10">
          <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-md bg-green-200 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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

        <nav className="hidden md:flex items-center gap-6">
          {navigationItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors"
              onClick={() => setActiveItem(item.href.replace("#", ""))}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="hidden md:block">
          <Button className="bg-green-600 text-white hover:bg-green-700">Pesan Sekarang</Button>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden p-1 text-gray-700 hover:bg-gray-100 z-10"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          <span className="sr-only">{mobileMenuOpen ? "Close menu" : "Open menu"}</span>
        </Button>

        <div
          className={cn(
            "fixed inset-0 bg-white z-0 transition-transform duration-300 ease-in-out md:hidden",
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full",
          )}
        >
          <div className="flex flex-col h-2/3 pt-16 pb-6 px-4">
            <nav className="flex-1 overflow-y-auto py-8">
              <ul className="space-y-4">
                {navigationItems.map((item) => {
                  const Icon = item.icon
                  const isActive = activeItem === item.href.replace("#", "")

                  return (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 p-3 rounded-lg transition-colors",
                          isActive ? "bg-green-100 text-green-700" : "text-gray-700 hover:bg-gray-100",
                        )}
                        onClick={() => {
                          setActiveItem(item.href.replace("#", ""))
                          setMobileMenuOpen(false)
                        }}
                      >
                        <Icon className={cn("h-5 w-5", isActive ? "text-green-600" : "text-gray-500")} />
                        <span className="font-medium">{item.name}</span>
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </nav>

          </div>
        </div>
      </div>
    </header>
  )
}

