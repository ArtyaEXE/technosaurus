<template>
<div class="cart__order">
  <h3>{{ item.product.title }}</h3>
  <b>{{ totalPricePretty }} ₽</b>
  <b>Количество: {{ item.amount }}</b>
  <br>
  <span>Артикул: {{ item.product.id }}</span>
</div>
</template>
<script>
import numberFormat from '@/helpers/numberFormat';

export default {
  props: ['item'],
  computed: {
    totalPricePretty() {
      return numberFormat(this.item.amount * this.item.product.price);
    },
  },
};
</script>
