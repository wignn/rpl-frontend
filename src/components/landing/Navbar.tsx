"use client"

import type { UserDetailResponse } from "@/types/user"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { useState } from "react"
import { Menu, X } from "lucide-react"

interface HeaderProps {
  tipeKamarHref: string
  user: UserDetailResponse | undefined
}

const Header = ({ tipeKamarHref, user }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    const res = await signOut({ redirect: false, callbackUrl: "/" })
    if (res?.url) {
      window.location.href = res.url
    }
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="py-4 px-4 md:px-8 border-b border-gray-300 shadow-md relative">
      <div className="flex justify-between items-center md:justify-center md:gap-6">
        {/* Mobile menu button */}
        <button
          className="md:hidden text-gray-800"
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {!isMenuOpen && <Menu size={24} />}
        </button>

        {/* Logo or brand name could go here */}
        <div className="md:hidden">{/* Mobile placeholder for center alignment */}</div>

        {/* Desktop navigation */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/about" className="font-medium text-gray-800 hover:text-green-700">
            Tentang Kami
          </Link>
          <Link href={tipeKamarHref} className="font-medium text-gray-800 hover:text-green-700">
            Tipe Kamar
          </Link>
          <Link
            href="https://wa.me/6285215810688"
            target="_blank"
            className="font-medium text-gray-800 hover:text-green-700"
          >
            Pesan
          </Link>
          {user?.role === "ADMIN" && (
            <Link href="/admin" className="font-medium text-gray-800 hover:text-green-700">
              Manage Data
            </Link>
          )}

          {user ? (
            <button
              onClick={handleSignOut}
              className="bg-white border cursor-pointer border-gray-300 text-gray-700 px-5 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="bg-white border border-green-600 text-green-600 px-5 py-1.5 rounded-md text-sm font-medium hover:bg-green-50"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile navigation overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-50 bg-white md:hidden">
            {/* Close button positioned at the top right */}
            <button className="absolute top-4 right-4 text-gray-800" onClick={toggleMenu} aria-label="Close menu">
              <X size={24} />
            </button>

            <div className="flex flex-col items-center pt-16 pb-8 px-4 space-y-6">
              <Link
                href="/about"
                className="font-medium text-gray-800 hover:text-green-700 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Tentang Kami
              </Link>
              <Link
                href={tipeKamarHref}
                className="font-medium text-gray-800 hover:text-green-700 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Tipe Kamar
              </Link>
              <Link
                href="https://wa.me/6285215810688"
                target="_blank"
                className="font-medium text-gray-800 hover:text-green-700 text-lg"
                onClick={() => setIsMenuOpen(false)}
              >
                Pesan
              </Link>
              {user?.role === "ADMIN" && (
                <Link
                  href="/admin"
                  className="font-medium text-gray-800 hover:text-green-700 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Manage Data
                </Link>
              )}

              {user ? (
                <button
                  onClick={() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}
                  className="bg-white border cursor-pointer border-gray-300 text-gray-700 px-5 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50 w-full max-w-xs"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className="bg-white border border-green-600 text-green-600 px-5 py-1.5 rounded-md text-sm font-medium hover:bg-green-50 w-full max-w-xs text-center"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}

export default Header