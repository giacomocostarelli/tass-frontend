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
                icon: 'account_circle',
                url: '/profile',
            }
        ]
    }
];
