import {Booking} from './booking';

export interface Guest {
    id?: number;
    email?: string;
    name?: string;
    username?: string;
    pwd?: string;
    booking?: Booking;
    token?: string;
    imageUrl?: string;
}
