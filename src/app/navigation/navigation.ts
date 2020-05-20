import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'user_datail',
        title: 'USER PAGE',
        type: 'group',
        children: [
            {
                id: 'profile',
                title: 'Il mio profilo',
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
        ]
    }
];
