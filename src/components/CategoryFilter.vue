<template>
  <b-form-input
    class="mt-3 mb-1 light-search"
    type="search"
    placeholder="Pesquisar categorias"
  />

  <div>
    <b-navbar toggleable class=" " style="">
      <b-navbar-nav class="w-100">
        <b-navbar-item
          v-for="(category, index) in categories"
          :key="index"
          style="border-bottom: 1px solid #f3f3f3"
          class="py-2"
        >
          <div
            class="d-flex justify-content-between cat-txt"
            @click="category.showSubCategories = !category.showSubCategories"
          >
            <span class="">{{ category.name }}</span>
            <i class="bi bi-chevron-down grey-txt"></i>
          </div>
          <b-collapse
            id="navbar-toggle-collapse"
            is-nav
            v-model="category.showSubCategories"
          >
            <b-navbar-nav class="ml-auto p-3">
              <b-nav-item
                v-for="(subCategory, index) in category.subCategories"
                :key="index"
              >
                <!-- <router-link :to="subCategory.link">{{ subCategory.name }}</router-link> -->
                <a>{{ subCategory.name }}</a>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      categories: [
        {
          name: 'Categoria 1',
          subCategories: [
            { name: 'Subcategoria 1', link: '/subcategoria1' },
            { name: 'Subcategoria 2', link: '/subcategoria2' },
          ],
          showSubCategories: false,
        },
        {
          name: 'Categoria 2',
          subCategories: [
            { name: 'Subcategoria 3', link: '/subcategoria3' },
            { name: 'Subcategoria 4', link: '/subcategoria4' },
          ],
          showSubCategories: false,
        },
        {
          name: 'Categoria 3',
          subCategories: [
            { name: 'Subcategoria 5', link: '/subcategoria5' },
            { name: 'Subcategoria 6', link: '/subcategoria6' },
          ],
          showSubCategories: false,
        },
        {
          name: 'Categoria 4',
          subCategories: [
            { name: 'Subcategoria 7', link: '/subcategoria7' },
            { name: 'Subcategoria 8', link: '/subcategoria8' },
          ],
          showSubCategories: false,
        },
        {
          name: 'Categoria 5',
          subCategories: [
            { name: 'Subcategoria 9', link: '/subcategoria9' },
            { name: 'Subcategoria 10', link: '/subcategoria10' },
          ],
          showSubCategories: false,
        },
      ],
    };
  },
};
</script>

<style>
.cat-txt {
  cursor: pointer;
}
</style>
