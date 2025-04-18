"use client"

import React,{ useState } from "react"
import Sidebar from "./Sidebar"
import Header from "./Header"
import DashboardContent from "./DashboardContent"
import RoomsContent from "./RoomsContent"
import UsersContent from "./UsersContent"
import SettingsContent from "./SettingsContent"
import FinanceDashboard from "@/components/admin/Finance"
import { UserDetailResponse } from "@/types/user"
import RoomListContent from "./RoomList"
import { FacilityDetailResponse } from "@/types/facility"
import { RoomTypeResponse } from "@/types/room"
import Report from "@/components/admin/ReportContent"

interface Props {
  accessToken: string;
  user: UserDetailResponse;
  facilities: FacilityDetailResponse[]
  roomtype: RoomTypeResponse[]

  kamar: number;
  kamarKosong: number;
  kamarTerisi: number;
  pendapatan: number;
  actifity: Activity[];
}

interface Activity {
  id: string;
  message: string;
  timestamp: string;
}


export default function AdminDashboard({accessToken, facilities, roomtype,user, kamar, kamarKosong, kamarTerisi, pendapatan, actifity, }: Props) {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [showUserDropdown, setShowUserDropdown] = useState(false)
  return (
    <div className="flex h-screen bg-gradient-to-b from-green-50 to-green-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} showUserDropdown={showUserDropdown} setShowUserDropdown={setShowUserDropdown} />

        <main className="flex-1 overflow-y-auto p-6">
          {activeTab === "dashboard" && <DashboardContent accessToken={accessToken} kamar={kamar} kamarKosong={kamarKosong} kamarTerisi={kamarTerisi} pendapatan={pendapatan} actifity={actifity}/>}
          {activeTab === "rooms" && <RoomsContent facilities={facilities} accessToken={accessToken}/>}
          {activeTab === "users" && <UsersContent accessToken={accessToken}/>}
          {activeTab === "roomList" && <RoomListContent roomtypes={roomtype} accessToken={accessToken}/>}
          {activeTab === "transactions" && <FinanceDashboard/>}
          {activeTab === "reports" && <Report accessToken={accessToken}/>}
          {activeTab === "settings" && <SettingsContent />}
        </main>
      </div>
    </div>
  )
}

