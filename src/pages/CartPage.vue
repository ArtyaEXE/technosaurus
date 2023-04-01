<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
<main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" href="#" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'cart'}">
            Корзина
          </router-link>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        Количество позиций : {{ products.length }}
      </span>
    </div>
    <BasePreloader v-show="products.length === 0"/>
    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <div class="cart__list">
            <CartItem v-for="item in products" :key="item.productId" :item="item"/>
          </div>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{ PricePretty }} ₽</span>
          </p>

          <router-link v-slot="{navigate}" :to="{name: 'order'}" custom>
            <button @click="navigate" class="cart__button button button--primery" type="submit" v-if="products.length > 0" :disabled="!totalPrice">
            Оформить заказ
          </button>
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import { mapGetters } from 'vuex';
import BasePreloader from '@/components/BasePreloader.vue';
import { defineComponent } from 'vue';
import numberFormat from '../helpers/numberFormat';
import CartItem from '../components/CartItem.vue';

export default defineComponent({
  components: { CartItem, BasePreloader },
  computed: {
    PricePretty() {
      return numberFormat(this.totalPrice);
    },
    ...mapGetters({ products: 'cartDetailProducts', totalPrice: 'cartTotalPrice', totalProducts: 'totalProducts' }),
  },
});
</script>
