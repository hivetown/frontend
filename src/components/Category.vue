<template>
  <div>
    <b-navbar toggleable>
      <b-navbar-nav class="w-100">
        <b-navbar-item
          v-for="(category, index) in categories"
          :key="index"
          class="py-2"
          :class="{ 'parent-cat': depth === 0, 'child-cat': depth > 0 }"
        >
          <div class="d-flex gap-3 w-100">
            <div class="d-flex gap-2 justify-content-center align-items-center">
              <i
                :class="{
                  'bi bi-chevron-down': !category.showSubCategories,
                  'bi bi-chevron-up': category.showSubCategories,
                }"
                @click.stop="toggleCategory(category)"
                style="font-size: 1.2em"
              />
            </div>

            <div class="d-flex gap-2 justify-content-center align-items-center">
              <input type="checkbox" />
              <span
                @click.stop="toggleCategory(category)"
                style="cursor: pointer"
              >
                {{ category.name }}
              </span>
              <!-- TODO - fazer com que apareça a quantidade de produtos das categorias -->
              <span class="grey-txt" style="font-size: 0.9em">(0)</span>
            </div>
          </div>

          <b-collapse v-model="category.showSubCategories">
            <template v-if="category.showSubCategories">
              <Category
                :categories="category.subCategories"
                :depth="depth + 1"
              />
            </template>
          </b-collapse>
        </b-navbar-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<!-- TODO - ver se pode ser retirado -->
<style>
.parent-cat {
  /* background-color: blue; */
}

/* TEM o problema de ficar sem espaço */
.child-cat {
  /* background-color: #f3f3f3; */
  padding: 0.5em;
}

.child-cat span {
  /* color:#5A5A5A; */
}
</style>

<script lang="ts">
import { Category } from '@/types';
import { fetchAllCategories } from '@/api';
import { PropType, defineComponent } from 'vue';

export default defineComponent({
  props: {
    categories: {
      type: Object as PropType<Category[]>,
      required: true,
    },
    depth: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      parentSubcategories: [] as Category[],
      subCategoriesById: [] as Category[],
    };
  },
  methods: {
    async fetchSubCategories(id: number) {
      const subCategories =
        this.subCategoriesById[id] ||
        (await fetchAllCategories({ parentId: id }));
      this.subCategoriesById[id] = subCategories;
      const category = this.categories.find((c) => c.id === id);
      if (category) {
        category.subCategories = this.subCategoriesById[id];
      }
    },
    async toggleCategory(category: Category) {
      const nextState = !category.showSubCategories;
      if (nextState && !category.subCategories) {
        await this.fetchSubCategories(category.id);
      }
      category.showSubCategories = nextState;
    },
  },
});
</script>
