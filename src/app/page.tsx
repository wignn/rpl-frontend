import { apiRequest } from '@/lib/api';
import { RoomTypeResponse } from '@/types/room'
import React from 'react'
import Home from './Home';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

async function page() {
    let roomtype:RoomTypeResponse[] = []
    let user:boolean = false; 
    const url = process.env.NEXT_PUBLIC_API_URL;
    const session = await getServerSession(authOptions);
    try{
        roomtype = await apiRequest<RoomTypeResponse[]>({
            endpoint: "/roomtype",
            method: "GET",
        })

        if (session) {
            user = true;
        }
    
    }catch (e){ 
        console.log("Error fetching data:", e);
    }
    console.log("user", url)
  return(
  <div>
    <Home user={user} roomtype={roomtype} url={url as string}/>
  </div>
  )
}

export default page