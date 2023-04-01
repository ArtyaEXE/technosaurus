<!-- eslint-disable max-len -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
  <li class="cart__item product">
              <div class="product__pic">
                <img :src="item.product.image" width="120" height="120" alt="item.product.title">
              </div>
              <h3 class="product__title">
                {{ item.product.title }}
              </h3>
              <span class="product__code">
                Артикул: {{ item.product.id }}
              </span>

              <div class="product__counter form__counter">
                <button type="button" aria-label="Убрать один товар" @click="decrementCartItem">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-minus"></use>
                  </svg>
                </button>

                <input type="text" v-model.number="amount" name="count">

                <button type="button" aria-label="Добавить один товар" @click="incrementCartItem">
                  <svg width="10" height="10" fill="currentColor">
                    <use xlink:href="#icon-plus"></use>
                  </svg>
                </button>
              </div>

              <b class="product__price">
                {{ totalPricePretty }} ₽
              </b>

              <button class="product__del button-del" type="button" aria-label="Удалить товар из корзины" @click.prevent="deleteCart(item.productId)">
                <svg width="20" height="20" fill="currentColor">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </button>
            </li>
</template>
<script>
import { mapActions, mapMutations } from 'vuex';
import numberFormat from '../helpers/numberFormat';

export default {
  data() {
    return {
      cartProductsData: null,
      productLoading: false,
      productLoadingFailed: false,
      productDeleted: true,
      productDeletedSending: false,
    };
  },
  props: ['item'],
  computed: {
    totalPricePretty() {
      return numberFormat(this.item.amount * this.item.product.price);
    },
    amount: {
      get() {
        return this.item.amount;
      },
      set(value) {
        this.$store.dispatch('updateCartProductAmount', { productId: this.item.productId, amount: value });
      },
    },
  },
  methods: {
    ...mapMutations({ deleteProduct: 'deleteCartProduct' }),
    ...mapActions(['deleteProductFromCart']),
    deleteCart() {
      this.productDeleted = false;
      this.productDeletedSending = true;
      this.deleteProductFromCart({ productId: this.item.productId })
        .then(() => {
          this.productDeleted = true;
          this.productDeletedSending = false;
        });
    },
    incrementCartItem() {
      this.amount += 1;
    },
    // eslint-disable-next-line consistent-return
    decrementCartItem() {
      if (this.amount > 0) {
        this.amount -= 1;
      } else {
        return this.amount;
      }
    },
  },
};
</script>
