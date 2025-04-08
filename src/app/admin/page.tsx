import AdminDashboard from "@/components/admin/AdminDashboard";
import { apiRequest } from "@/lib/api";
import { authOptions } from "@/lib/auth";
import { FacilityDetailResponse } from "@/types/facility";
import { RoomTypeResponse } from "@/types/room";
import { UserDetailResponse } from "@/types/user";
import { getServerSession } from "next-auth";

export const dynamic = "force-dynamic";

export default async function Home() {
  let user: UserDetailResponse | undefined;
  let accessToken: string = ""
  let facilities :FacilityDetailResponse[] = []
  let roomtype: RoomTypeResponse[] = []

  try {
    const session = await getServerSession(authOptions);

    if (session) {
    accessToken = session?.backendTokens.accessToken || ""
      const [users, facilitiy, roomtypes] = await Promise.all([
        apiRequest<UserDetailResponse>({
          endpoint: `/users/${session.id_user}`,
          method: "GET",
          headers:{
            Authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
        }),
        apiRequest<FacilityDetailResponse[]>({
          endpoint: "/facility",
          method: "GET",
          headers:{
            Authorization: `Bearer ${session.backendTokens.accessToken}`,
          },
        }),
        
        apiRequest<RoomTypeResponse[]>({
            endpoint: "/roomtype",
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })

      ]);
      user = users;
      facilities = facilitiy
      roomtype = roomtypes
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }

  return <AdminDashboard roomtype={roomtype} facilities={facilities} accessToken={accessToken} user={user as UserDetailResponse}/>;
}
