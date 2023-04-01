<!-- eslint-disable max-len -->
<template>
<main class="content container">
  <div class="content__top content__top--catalog">
    <h1 class="content__title">
      Каталог
    </h1>
    <span class="content__info">
      {{ countProducts }} товара
    </span>
  </div>

  <div class="content__catalog">
    <ProductFilter v-model:price-from="filterPriceFrom" v-model:price-to="filterPriceTo" v-model:category-id="filterCategoryId" v-model:colors-id="filterColorId"/>
    <section class="catalog">

      <BasePreloader v-if="productsLoading" />
      <div v-else-if="productsLoadingFailed">Произошла ошибка, повторите попытку позже <button @click.prevent="loadProducts">Попробовать еще раз :)</button></div>

<ProductList v-else :products="products"/>

<BasePagination v-model="page" :count="countProducts" :per-page="productsPerPage"/>

    </section>
  </div>
</main>
</template>
<script>

import axios from 'axios';
import ProductList from '../components/ProductList.vue';
import BasePagination from '../components/BasePagination.vue';
import ProductFilter from '../components/ProductFilter.vue';
import BasePreloader from '../components/BasePreloader.vue';
import { API_BASE_URL } from '../config';

export default {
  components: {
    ProductList, BasePagination, ProductFilter, BasePreloader,
  },
  data() {
    return {
      filterPriceFrom: 0,
      filterPriceTo: 0,
      filterCategoryId: 0,
      filterColorId: 0,
      page: 1,
      productsPerPage: 12,
      productsData: null,
      productsLoading: false,
      productsLoadingFailed: false,
    };
  },
  computed: {
    // eslint-disable-next-line vue/no-dupe-keys
    products() {
      return this.productsData
        ? this.productsData.items.map((product) => ({
          ...product,
          image: product.image.file.url,
        }))
        : [];
    },
    countProducts() {
      return this.productsData ? this.productsData.pagination.total : 0;
    },
  },
  methods: {
    loadProducts() {
      this.productsLoading = true;
      this.productsLoadingFailed = false;
      clearTimeout(this.loadProductsTimer);
      this.loadProductsTimer = setTimeout(() => {
        // eslint-disable-next-line prefer-template
        axios.get(API_BASE_URL + '/api/products', {
          params: {
            page: this.page,
            limit: this.productsPerPage,
            categoryId: this.filterCategoryId,
            minPrice: this.filterPriceFrom,
            maxPrice: this.filterPriceTo,
            colorId: this.filterColorId,
          },
        })
        // eslint-disable-next-line no-return-assign
          .then((response) => this.productsData = response.data)
          // eslint-disable-next-line no-return-assign
          .catch(() => this.productsLoadingFailed = true)
          // eslint-disable-next-line no-return-assign
          .then(() => this.productsLoading = false);
      }, 1000);
    },
  },
  watch: {
    page() {
      this.loadProducts();
    },
    filterPriceFrom() {
      this.loadProducts();
    },
    filterPriceTo() {
      this.loadProducts();
    },
    filterCategoryId() {
      this.loadProducts();
    },
    filterColorId() {
      this.loadProducts();
    },
  },
  created() {
    this.loadProducts();
  },
};
</script>
