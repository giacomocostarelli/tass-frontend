import {Item} from './item';
import {Sojourn} from './sojourn';


export interface Booking {
    id?: number;
    sojourns?: Sojourn[];
    rentedItems?: Item[];
    totalPrice?: number;
}
