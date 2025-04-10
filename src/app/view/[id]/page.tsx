import PropertyDetail from "@/components/guest/roomType";
import { apiRequest } from "@/lib/api";
import { RoomTypeResponse } from "@/types/room";
import React from "react";
import { notFound } from "next/navigation";

async function page({ params }: { params: Promise<{ id: string }> }) {
    let roomType: RoomTypeResponse | null = null;
    const { id } = await params;
    const url = process.env.NEXT_PUBLIC_API_URL;
    try {
        roomType = await apiRequest<RoomTypeResponse>({
            endpoint: `/roomtype/${id}`,
            method: "GET",
        });
    } catch (error) {
        console.log("error fetching room type", error);
    }

    if (!roomType) {
        notFound();
    }

    return (
        <div>
            <PropertyDetail roomType={roomType} url={url as string}/>
        </div>
    );
}

export default page;
