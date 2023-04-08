<template>
  <b-form-input class=" mt-3 mb-3 light-search" type="search" placeholder="Pesquisar categorias" />

  <div style="max-height: 25vh; overflow-y: auto;" class="mb-5">
    <Category :categories="filteredCategories"></Category>
  </div>
</template>

<script setup lang="ts">
import Category from "@/components/Category.vue";
import { fetchCategorySubCategories } from "@/api";
</script>

<script lang="ts">
export default {
  data() {
    return {
      subCategoriesById: {},
    };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  computed: {
    filteredCategories() {
      const filtered = [];
      for (const category of this.categories) {
        if (!category.parent && !filtered.some((c) => c.name === category.name)) {
          filtered.push(category);
        }
      }
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
    },
  },
  methods: {
    async fetchSubCategories(id) {
      const subCategories = this.subCategoriesById[id] || await fetchCategorySubCategories(id);
      this.subCategoriesById[id] = subCategories.data.items.slice(0, 3);
      const category = this.categories.find(c => c.id === id);
      if (category) {
        category.subCategories = this.subCategoriesById[id];
      }
    },
  },
};
</script>

<style>
  /* Scrollbar //////////////////////////////////////////// */

  /* Google chrome */
  ::-webkit-scrollbar {
    width: 0.8em; /* Largura da barra */
    background-color: #f3f3f3; 
  }
  ::-webkit-scrollbar-thumb {
    background-color: #d3d3d3; /* Cor do thumb da barra */
    border-radius: 20px; 
    border: none; 
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color: #b1b1b1;
  }

  /* Firefox */
  ::-moz-scrollbar {
    width: 8px; /* Largura da barra */
    background-color: #f3f3f3; 
  }
  ::-moz-scrollbar-thumb {
    background-color: #d3d3d3; /* Cor do thumb da barra */
    border-radius: 20px; 
    border: none;
  }
  ::-moz-scrollbar-thumb:hover {
    background-color: #b1b1b1;
  }
  /* ////////////////////////////////////////////////////// */  
</style>
