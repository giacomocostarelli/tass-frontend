import {Room} from './room';

export interface Alternative {
    roomsHotels?: {DaysInRoom: number; Room: Room }[];
    days?: number;
}
