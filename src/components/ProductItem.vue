<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/label-has-for -->
<template>
  <li class="catalog__item">
            <router-link class="catalog__pic" href="#" :to="{name: 'product', params: {id: product.id}}">
              <img :src="product.image" :alt="product.title">
            </router-link>

            <h3 class="catalog__title">
              <a href="#">
                {{ product.title }}
              </a>
            </h3>

            <span class="catalog__price">
              {{ PricePretty }} ₽
            </span>

            <ul class="colors colors--black">
              <li class="colors__item" v-for="productColor in product.colors" :key="productColor.id">
                <label class="colors__label">
                  <input class="colors__radio sr-only" type="radio" :value="productColor.id" v-model="color">
                  <span class="colors__value" :style="{ backgroundColor: productColor.code }">
                  </span>
                </label>
              </li>
            </ul>
          </li>
</template>
<script>
import goToPage from '../helpers/goToPage';
import numberFormat from '../helpers/numberFormat';

export default {
  data() {
    return {
      color: '#73B6EA',
    };
  },
  computed: {
    PricePretty() {
      return numberFormat(this.product.price);
    },
  },
  methods: {
    goToPage,
  },
  props: ['product'],
};
</script>
