<template>
  <b-navbar-nav class="ml-auto p-3">
    <b-nav-item v-for="(subCategory, index) in subCategories" :key="index">
      <div
        style="background-color: "
        class="d-flex justify-content-between cat-txt"
        @click.stop="toggleSubCategory(subCategory)"
      >
        <span>{{ subCategory.id }}</span>
        <span>{{ subCategory.name }}</span>
        <i
          :class="{
            'bi bi-chevron-down': !subCategory.showSubCategories,
            'bi bi-chevron-up': subCategory.showSubCategories,
          }"
        />
      </div>
      <b-collapse v-model="subCategory.showSubCategories">
        <SubCategory :sub-categories="subCategory.subCategories" />
      </b-collapse>
    </b-nav-item>
  </b-navbar-nav>
</template>

<script lang="ts">
export default {
  props: {
    subCategories: {
      type: Array,
      required: true,
    },
  },
  methods: {
    toggleSubCategory(subCategory) {
      subCategory.showSubCategories = !subCategory.showSubCategories;
    },
  },
};
</script>
