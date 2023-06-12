<template>
  <div style="max-height: 25vh; overflow-y: auto" class="mb-5">
    <Category :categories="filteredCategories"></Category>
  </div>
</template>

<script setup lang="ts">
import Category from '@/components/Category.vue';
import { Category as CategoryType } from '@/types';
import { fetchCategorySubCategories } from '@/api';
import { PropType } from 'vue';
</script>

<script lang="ts">
export default {
  data() {
    return {
      subCategoriesById: {} as CategoryType[],
    };
  },
  props: {
    categories: {
      type: Array as PropType<CategoryType[]>,
      required: true,
    },
  },
  computed: {
    filteredCategories() {
      const filtered = [] as CategoryType[];
      for (const category of this.categories) {
        if (
          !category.parent &&
          !filtered.some((c) => c.name === category.name)
        ) {
          filtered.push(category);
        }
      }
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  methods: {
    async fetchSubCategories(id: number) {
      const subCategories =
        this.subCategoriesById[id] || (await fetchCategorySubCategories(id));
      this.subCategoriesById[id] = subCategories;
      const category = this.categories.find((c) => c.id === id);
      if (category) {
        category.subCategories = this.subCategoriesById[id];
      }
    },
  },
};
</script>
