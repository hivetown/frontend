<template>
  <div class="mt-3 mb-3 d-flex align-items-center spec-category-text">
    <h5 class="p-3">Características</h5>
  </div>
  <div>
    <b-spinner v-if="loading" variant="primary" label="Spinning"></b-spinner>
    <div v-else class="d-flex">
      <!-- Para cada produto -->

      <div
        v-for="(productFields, index) in productsFields"
        class="mb-3 parent"
        style="border-bottom: 1px solid #eeeeee"
        :key="index"
      >
        <div>
          <div
            class="mb-3"
            v-for="(categoriesFields, idxCategories) in productFields"
            :key="idxCategories"
          >
            <div class="rounded-pill text-center mt-3 mb-3 w-25 prod-category">
              {{ categoriesFields.category.name }}
            </div>

            <div
              v-for="(field, idxField) in categoriesFields.fieldValues"
              :key="idxField"
            >
              {{ field.field.name }}: {{ field.value }} {{ field.field.unit }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { beforeMain } from '@popperjs/core';
import { Category, ProductSpecFieldWithCategory } from '@types';
import { PropType, defineComponent } from 'vue';
// import { ProductSpecField } from '@/interfaces';

export default defineComponent({
  name: 'ProductSpec',
  data() {
    return {
      // TODO - ver o tipo disto
      categoriasExistentes: [],
      dadosProd1: [] as Record<number, ProductSpecFieldWithCategory>[],
      dadosProd2: [] as Record<number, ProductSpecFieldWithCategory>[],
    };
  },
  props: {
    productsFields: {
      type: [] as PropType<Record<number, ProductSpecFieldWithCategory>[]>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  async beforeMount() {
    // Para cada producto
    for (let idx = 0; idx < this.productsFields.length; idx++) {
      if (idx + 1 === 1) {
        this.dadosProd1.push(this.productsFields[idx]);
      } else {
        this.dadosProd2.push(this.productsFields[idx]);
      }
    }
  },
});
</script>
