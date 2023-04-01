import { createRouter, createWebHashHistory } from 'vue-router';
import NotFoundPage from '@/pages/NotFoundPage.vue';
import MainPage from '@/pages/MainPage.vue';
import ProductPage from '@/pages/ProductPage.vue';
import CartPage from '@/pages/CartPage.vue';
import OrderPage from '@/pages/OrderPage.vue';
import OrderInfoPage from '@/pages/OrderInfoPage.vue';
import config from '../../vue.config';

const routes = [
  { name: 'main', component: MainPage, path: '/main' },
  { name: 'product', component: ProductPage, path: '/product/:id' },
  { name: 'notFound', component: NotFoundPage, path: '/:pathMatch(.*)*' },
  { name: 'cart', component: CartPage, path: '/cart' },
  { name: 'order', component: OrderPage, path: '/order' },
  { name: 'orderInfo', component: OrderInfoPage, path: '/order/:id' },
];

const router = createRouter({
  history: createWebHashHistory(config.pablicPath),
  routes,
});

export default router;
