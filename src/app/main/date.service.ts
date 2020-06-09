import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class DateService {

    public getFinalDate(value: any): string {
        const date = this.parse(value);
        return date.getDate() + '/' + (1 + date.getMonth()) + '/' + date.getFullYear();
    }

    private parse(value: any): Date | null {
        if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
            const str = value.split('/');
            const year = Number(str[2]);
            const month = Number(str[1]) - 1;
            const date = Number(str[0]);
            return new Date(year, month, date);
        }
        const timestamp = typeof value === 'number' ? value : Date.parse(value);
        return isNaN(timestamp) ? null : new Date(timestamp);
    }
}
