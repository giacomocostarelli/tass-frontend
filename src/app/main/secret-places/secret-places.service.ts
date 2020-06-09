import {Injectable} from '@angular/core';
import {Alternative} from '../interfaceDB/alternative';

@Injectable({
  providedIn: 'root'
})
export class SecretPlacesService {
    alternative: Alternative[] = [];
    startingDate: Date = null;

    constructor() { }

    getAlternative(): Alternative[]{
        // console.log('SERVICE: ' + JSON.stringify(this.alternative));
        return this.alternative;
    }

    setAlternative(alt: Alternative[]): void{
        this.alternative.length = 0;
        alt.forEach(a => this.alternative.push(a));
    }

    getStartingDate(): Date{
        return this.startingDate;
    }

    setStartingDate(d: Date): void{
        this.startingDate = d;
    }
}
