

export class RoomTypeCreateRequest {
    room_type: string;
    price: number;
}

export class RoomTypeUpdateRequest {
    room_type?: string;
    price?: number;
}

export class RoomTypeResponse extends RoomTypeCreateRequest {
    id_roomtype: string;
    created_at: Date;
    updated_at: Date;
}