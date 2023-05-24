<template>
  <div class="mt-3 mb-3 d-flex align-items-center spec-category-text">
    <h5 class="p-3">Características</h5>
  </div>
  <div>
    <b-spinner v-if="loading" variant="primary" label="Spinning"></b-spinner>
    <div v-else>
      <!-- {{ productsFields }} -->
      <!-- Para cada produto -->
      <div
        v-for="(productFields, index) in productsFields"
        class="mb-3 parent"
        style="border-bottom: 1px solid #eeeeee"
        :key="index"
      >
        <div class="d-flex" style="gap: 12vh">
          <!-- Para cada categoria -->
          <div
            v-for="(categoriesFields, idxCategories) in productFields"
            :key="idxCategories"
          >
            <b>Category {{ categoriesFields.category.name }}</b>

            <!-- Para cada field da categoria -->
            <div
              v-for="(field, idxField) in categoriesFields.fieldValues"
              :key="idxField"
            >
              <!-- Para cada valor do field da categoria -->
              {{ field.field.name }}: {{ field.value }}
            </div>
          </div>

          <!-- {{ index }}
          {{ field[1] }} -->
          <!-- <div v-for="(fs, fsIndex) in field[1]">
            <p>{{ index }} {{ field }}</p>
          </div> -->
        </div>
      </div>
      <!-- <div
        v-for="(field, findex) in fieldsTotais"
        :key="findex"
        class="mb-3 parent"
        style="border-bottom: 1px solid #eeeeee"
      >
        <div>
          <div class="d-flex" style="gap: 12vh">
            <div
              v-for="(fs, fsIndex) in field[1]"
              :key="fsIndex"
              class="mb-4 d-flex gap-4"
            >
              <div v-if="Number(fsIndex) === 0">
                <div
                  v-for="(f, index) in fs"
                  style="background-color: ; width: 25vh"
                  :key="index"
                >
                  <span style="font-weight: bold">{{ f.field.name }}:</span>
                </div>
              </div>
              <div class="" style="background-color: ; width: 25vh">
                <div v-for="f in fs" :key="f.field.id" class="d-flex">
                  <div style="background-color: ; min-width: 25vh">
                    {{ f.value }}
                    {{ f.field.unit }}
                  </div>
                  <div v-if="field[0].length < 2">
                    <div
                      style="
                        background-color: ;
                        width: 25vh;
                        display: flex;
                        justify-content: center;
                      "
                    >
                      <span>-</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { ProductSpecFieldWithCategory } from '@types';
import { PropType, defineComponent } from 'vue';
// import { ProductSpecField } from '@/interfaces';

export default defineComponent({
  name: 'ProductSpec',
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
});
</script>
