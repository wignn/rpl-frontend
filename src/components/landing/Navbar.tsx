import React from "react";
import Link from "next/link";
import { UserDetailResponse } from "@/types/user";

interface Props {
    user?: UserDetailResponse;
}

function Navbar({user}:Props) {
  return (
    <>
      <header className="py-4 px-8 border-b border-gray-300 shadow-md">
        <div className="flex justify-center items-center gap-6">
          <Link
            href="/about"
            className="font-medium text-gray-800 hover:text-green-700"
          >
            Tentang Kami
          </Link>
          <Link
            href="#kamar"
            className="font-medium text-gray-800 hover:text-green-700"
          >
            Tipe Kamar
          </Link>
          <Link
            href={"https://wa.me/6285215810688"}
            target="_blank"
            className="font-medium text-gray-800 hover:text-green-700"
          >
            Pesan
          </Link>
          {user ? (
            <Link
              href="/logout"
              className="bg-white border border-gray-300 text-gray-700 px-5 py-1.5 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Logout
            </Link>
          ) : (
            <Link
              href="/login"
              className="bg-white border border-green-600 text-green-600 px-5 py-1.5 rounded-md text-sm font-medium hover:bg-green-50"
            >
              Login
            </Link>
          )}
        </div>
      </header>
    </>
  );
}

export default Navbar;
