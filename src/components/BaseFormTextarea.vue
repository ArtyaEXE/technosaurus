<!-- eslint-disable vuejs-accessibility/form-control-has-label -->
<!-- eslint-disable max-len -->
<template>
  <BaseFormField :title="title" :error="error">
    <textarea class="form__input" v-model="dataValue" :placeholder="placeholder"></textarea>
  </BaseFormField>
  </template>
<script>
import formFieldMixin from '@/mixins/formFieldMixin';

export default {
  mixins: [formFieldMixin],
};
</script>
