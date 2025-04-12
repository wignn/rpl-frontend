"use client";
import { UserDetailResponse } from "@/types/user";
import Link from "next/link";
import { signOut } from "next-auth/react";
interface HeaderProps {
  tipeKamarHref: string;
  user: UserDetailResponse | undefined;
}

const Header = ({ tipeKamarHref, user }: HeaderProps) => {
  const handleSignOut = async () => {
    const res = await signOut({ redirect: false, callbackUrl: "/" });
    if (res?.url) {
      window.location.href = res.url;
    }
  };
  return (
    <header className="py-4 px-8 border-b border-gray-300 shadow-md">
      <div className="flex justify-center items-center gap-6">
        <Link
          href="/about"
          className="font-medium text-gray-800 hover:text-green-700"
        >
          Tentang Kami
        </Link>
        <Link
          href={tipeKamarHref}
          className="font-medium text-gray-800 hover:text-green-700"
        >
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
          <Link
            href="/admin"
            className="font-medium text-gray-800 hover:text-green-700"
          >
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
    </header>
  );
};

export default Header;
