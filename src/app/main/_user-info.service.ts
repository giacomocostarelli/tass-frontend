import {Injectable} from '@angular/core';
import {Guest} from './interfaceDB/guest';

@Injectable({providedIn: 'root'})
export class UserInfoService {

    getImage(): string{
        const user = JSON.parse(localStorage.getItem('user')) as Guest;
        return user.imageUrl || '../../../assets/images/profile/default-user.png';
    }

    getName(): string {
        const user = JSON.parse(localStorage.getItem('user')) as Guest;
        return user.name;
    }
}