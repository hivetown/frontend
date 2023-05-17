<template>
  <div>
    <ul>
      <li v-for="category in getTopLevelCategories()" :key="category.id">
        {{ category.id }} -
        {{ category.name }}
        <button @click="fetchSubCategories(category)">ver +</button>
        <div
          v-if="category.subCategories"
          v-html="category.subCategoriesHtml"
        ></div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { fetchCategorySubCategories } from '@/api';
</script>

<script lang="ts">
export default {
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    async fetchSubCategories(category) {
      console.log('category: ' + JSON.stringify(category));
      const subCategoriesResponse = await fetchCategorySubCategories(
        category.id
      );
      const subCategories = subCategoriesResponse.data.items.slice(0, 3);
      category.subCategories = subCategories;
      const subCategoriesHtml = this.printSubCategories(subCategories);
      category.subCategoriesHtml = `<ul>${subCategoriesHtml}</ul>`;
    },

    printSubCategories(subCategories) {
      const subCategoriesHtml = subCategories
        .map((subCategory) => {
          const button = document.createElement('button');
          button.innerText = 'ver +';
          button.addEventListener('click', () => {
            this.fetchSubCategories(subCategory);
          });

          const subCategoryHtml = `
          <li key="${subCategory.id}">
            ${subCategory.id} - ${subCategory.name}
            ${
              subCategory.subCategories
                ? `<ul>${this.printSubCategories(
                    subCategory.subCategories
                  )}</ul>`
                : ''
            }
          </li>
        `;
          const container = document.createElement('div');
          container.innerHTML = subCategoryHtml;
          container.prepend(button);
          return container.innerHTML;
        })
        .join('');
      return subCategoriesHtml;
    },

    getTopLevelCategories() {
      return this.categories.filter((c) => c.parent === null);
    },
  },
};
</script>
