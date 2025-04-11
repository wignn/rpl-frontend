import Contact from '@/components/about'
import Link from 'next/link'
import Lokasi from '@/components/lokasi'
import { apiRequest } from '@/lib/api';
import { authOptions } from '@/lib/auth';
import { UserDetailResponse } from '@/types/user';
import { getServerSession } from 'next-auth';
import React from 'react'



async function page() {
  let user:UserDetailResponse | undefined = undefined;
  const session = await getServerSession(authOptions);
  try{
    if(session?.id_user){
    user = await apiRequest<UserDetailResponse>({
      endpoint: `/users/${session?.id_user}`,
      method:"GET",
      headers:{
        Authorization: `Bearer ${session?.backendTokens.accessToken}`,
      },
    })
  }
  }catch(e){
    console.log("Error fetching data:", e);
  }
  
  return (
    <div className='bg-gradient-to-b from-green-100 via-green-200 to-green-400'>
     <header className="py-4 px-8 border-b border-gray-300 shadow-md">
        <div className="flex justify-center items-center gap-6">
          <Link
            href="/about"
            className="font-medium text-gray-800 hover:text-green-700"
          >
            Tentang Kami
          </Link>
          <Link
            href="/"
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
        <Lokasi />
        <Contact/>
    </div>
  )
}

export default page