import {Hotel} from './hotel';

export interface Room {
    id?: number;
    numPlaces?: number;
    pricePerNight?: number;
    hotel?: Hotel;
}
