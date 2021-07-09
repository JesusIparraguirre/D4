import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  // {
  //   title: 'Inicio',
  //   link: '/pages/home',
  //   // home: true,
  // },
  // {
  //   title: 'Preguntas frecuentes',
  //   link: '/pages/frequent-questions',
  // },
  // {
  //   title: 'Mesa de servicio',
  //   url: 'https://localhost:44327/swagger/index.html',
  // },
  // {
  //   title: 'perfil hidden',
  //   link: '/pages/profile',
  //   hidden: true,
  // },
];

export const USER_MENU: NbMenuItem[] = [
  {
    title: 'Profile',
    data: {
      id: 'profile',
    },
  }, {
    title: 'Log out',
    data: {
      id: 'logout',
    },
  },
];

export const VISTA_MENU: NbMenuItem[] = [
  {
    title: '',
    home: true,
    // link: '/pages/home/grid',
    icon: 'grid-outline',
    data: {
      id: 'apps-grid',
    },
  }, {
    title: '',
    // link: '/pages/home/list',
    icon: 'list-outline',
    data: {
      id: 'apps-list',
    },
  },
];
