import Home from './containers/Home';
import Tool from './containers/Tool';
import AES from './tools/aes/Index';
import ECC from './tools/ecc/Index';
import NotFound from './containers/NotFound';

export const mainRoutes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/tools/:name',
    exact: false,
    component: Tool
  },
  {
    path: '',
    exact: false,
    component: NotFound
  }
];

export const toolRoutes = [
  {
    path: '/ecc',
    name: 'ECC',
    component: ECC
  },
  {
    path: '/aes',
    name: 'AES',
    component: AES
  },
  {
    path: '',
    exact: false,
    component: NotFound
  }
];
