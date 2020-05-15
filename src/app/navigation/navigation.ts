import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'profile',
        title: 'Il mio carrello',
        type: 'item',
        icon: 'shopping_cart',
        url: '/profile',
        badge: {
            title: '25',
            translate: 'NAV.SAMPLE.BADGE',
            bg: '#F44336',
            fg: '#FFFFFF'
        }
    }
];
