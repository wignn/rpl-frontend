"use client";
import { UserDetailResponse } from "@/types/user";
import { Bell, ChevronDown, LogOut, Search } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";

interface HeaderProps {
  showUserDropdown: boolean;
  setShowUserDropdown: (show: boolean) => void;
  user: UserDetailResponse;
}

export default function Header({
  user,
  showUserDropdown,
  setShowUserDropdown,
}: HeaderProps) {
  console.log(user);
  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
      redirect: true,
    });
  };

  return (
    <header className="bg-white shadow-sm z-10 sticky top-0">
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center rounded-lg bg-gray-100 px-3 py-2 w-full md:w-64 ml-12 md:ml-0">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Cari..."
            className="ml-2 bg-transparent border-none focus:outline-none w-full"
          />
        </div>

        <div className="flex items-center space-x-4">
          <button
            title="notif"
            className="relative p-2 rounded-full hover:bg-gray-100"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          <div className="relative">
            <button
              onClick={() => setShowUserDropdown(!showUserDropdown)}
              className="flex items-center space-x-2 focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white">
                A
              </div>
              <span className="text-gray-700 hidden md:inline">
                {user.role}
              </span>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>

            {showUserDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                <Link
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Profil
                </Link>
                <Link
                  href="#"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Pengaturan
                </Link>
                <div className="border-t my-1"></div>

                <Link
                  href="#"
                  className="flex items-center px-4 py-2 text-red-600 hover:bg-gray-100"
                >
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full"
                  >
                    <LogOut className="w-4 h-4 mr-2" />

                    <span>Keluar</span>
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
