import Home from './containers/Home';
import Tool from './containers/Tool';
import ToolAES from './containers/ToolAES';
import ToolDSA from './containers/ToolDSA';
import ToolECC from './containers/ToolECC';
import ToolGCM from './containers/ToolGCM';
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
    component: ToolECC
  },
  {
    path: '/dsa',
    name: 'DSA',
    component: ToolDSA
  },
  {
    path: '/gcm',
    name: 'GCM',
    component: ToolGCM
  },
  {
    path: '/aes',
    name: 'AES',
    component: ToolAES
  }
];
