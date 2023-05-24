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
                v-for="(
                  subCategory, indexSubcategory
                ) in category.subCategories"
                :key="indexSubcategory"
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

<style>
/* Ver se é suposto estar aqui ou no App.vue */
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
