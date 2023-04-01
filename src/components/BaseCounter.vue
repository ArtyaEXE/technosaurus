<!-- eslint-disable -->
<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<template>
<div class="form__counter">
  <button type="button" aria-label="Убрать один товар" @click="decrement">
    <svg width="12" height="12" fill="currentColor">
      <use xlink:href="#icon-minus"></use>
    </svg>
  </button>

  <input type="text" v-model.number="amount">

  <button type="button" aria-label="Добавить один товар" @click="increment">
    <svg width="12" height="12" fill="currentColor">
      <use xlink:href="#icon-plus"></use>
    </svg>
  </button>
</div>
</template>
<script>
export default {
  props: {
    productAmount: {
      type: Number,
    },
  },
  data() {
    return {
      amount: 1,
    };
  },
  methods: {
    increment() {
      this.amount += 1;
      this.$emit('product-amount-update', { action: 'increment' });
    },
    decrement() {
      this.amount -= 1;
      this.$emit('product-amount-update', { action: 'decrement' });
    },
  },
};
</script>
