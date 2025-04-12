import Contact from '@/components/about'
import Lokasi from '@/components/lokasi'
import { apiRequest } from '@/lib/api';
import { authOptions } from '@/lib/auth';
import { UserDetailResponse } from '@/types/user';
import { getServerSession } from 'next-auth';
import React from 'react'
import Navbar from '@/components/landing/Navbar';



async function page() {
  let user:UserDetailResponse | undefined = undefined;
  const session = await getServerSession(authOptions);
  let accessToken: string = session?.backendTokens.accessToken as string;
  try{
    if(session?.id_user){
      accessToken = session?.backendTokens.accessToken as string;
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
      <Navbar user={user} tipeKamarHref='/'  />
        <Lokasi />
        <Contact accessToken={accessToken}/>
    </div>
  )
}

export default page