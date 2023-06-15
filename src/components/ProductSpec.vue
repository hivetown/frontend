<template>
  <div class="mt-3 mb-3 d-flex align-items-center spec-category-text">
    <h5 class="p-3">Características</h5>
  </div>
  <div>
    <b-spinner v-if="loading" variant="primary" label="Spinning"></b-spinner>
    <div v-else>
      <!-- Para cada categoria -->
      <div
        v-for="(categories, idxCategories) in productsFields"
        class="mb-3 parent"
        style="border-bottom: 1px solid #eeeeee"
        :key="idxCategories"
      >
        <!-- <div
          class="rounded-pill text-center mt-3 mb-3 prod-category"
          style="width: 15%"
        >
          {{ categories.category.name }}
        </div> -->
        <p class="fw-bold">Categoria: {{ categories.category.name }}</p>
        <!-- Fields -->
        <div class="mb-3 d-flex gap-5">
          <!-- Nome dos fields -->
          <!-- Caso só um dos produtos tenha valores -->
          <div
            style="width: 25%"
            v-if="imprime(categories.products.length, categories.products)"
          >
            <div
              v-for="(productFields, idxProduct) in categories.products"
              :key="idxProduct"
            >
              <div
                v-for="(fieldValue, idxField) in productFields.fieldValues"
                :key="idxField"
              >
                <span>{{ fieldValue.field.name }}:</span>
              </div>
            </div>
          </div>
          <!-- Caso ambos os produtos tenham valores -->
          <div v-else style="width: 25%">
            <div
              v-for="(productFields, idxProduct) in categories.products[0]
                .fieldValues"
              :key="idxProduct"
            >
              <span>{{ productFields.field.name }}:</span>
            </div>
          </div>

          <!-- Dados dos fields -->
          <!-- Para cada categoria -->
          <div
            style="width: 15%"
            v-for="(productFields, idxProduct) in categories.products"
            :key="idxProduct"
          >
            <!-- Se não tiver valores -->
            <div v-if="Object.keys(productFields).length === 0" class="">
              <div v-for="(product, idp) in categories.products" :key="idp">
                <div
                  v-for="(fieldValue, idxField) in product.fieldValues"
                  :key="idxField"
                >
                  <span>-</span>
                </div>
              </div>
            </div>
            <!-- Se tiver valores -->
            <div v-else>
              <div
                v-for="(fieldValue, idxField) in productFields.fieldValues"
                :key="idxField"
              >
                <span class="grey-txt"
                  >{{ fieldValue.value }} {{ fieldValue.field.unit }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ProductSpecFieldWithCategory, ProductSpecField } from '@/types';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  name: 'ProductSpec',
  props: {
    productsFields: {
      type: Object as PropType<Record<number, ProductSpecFieldWithCategory>>,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    imprime(tamanho: number, produto: { fieldValues: ProductSpecField[] }[]) {
      let temParaOs2 = false as boolean;
      for (let i = 0; i < tamanho; i++) {
        if (!temParaOs2) {
          if (Object.keys(produto[i]).length != 0) {
            temParaOs2 = true;
          }
        } else {
          return false;
        }
      }

      return true;
      //   return produto.some((p) => p.fieldValues.length);
    },
  },
});
</script>
