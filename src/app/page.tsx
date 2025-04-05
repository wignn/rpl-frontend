import RoomTypes from "@/components/Home";
import { roomTypes } from "@/data/mock-data";

export default function Home() {
  return (
  <div>
    <RoomTypes roomTypes={roomTypes}/>
  </div>
  );
}
