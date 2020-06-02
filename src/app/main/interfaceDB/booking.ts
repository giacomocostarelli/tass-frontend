import {Item} from './item';
import {Sojourn} from './sojourn';

//AGGIUNGERE CAMPO CHE SIA IL RISULTATO DELLA CONCATENAZIONE DI TUTTE LE DESTINAZIONI DELLE PRENOTAZIONE
// E.G. "Cagliari - Modena - Mircolandia".

export interface Booking {
    id?: number;
    sojourns?: Sojourn[];
    rentedItems?: Item[];
    totalPrice?: number;
}
