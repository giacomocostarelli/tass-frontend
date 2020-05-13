import {City} from './city';

export interface Hotel {
    id?: number;
    name?: string;
    address?: string;
    cellNumber?: string;
    stars?: number;
    city?: City;
}
