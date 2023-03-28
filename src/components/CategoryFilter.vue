<!-- <template>

    <b-form-input class="mt-3 mb-1 light-search" type="search" placeholder="Pesquisar categorias" />

    <div style="max-height: 25vh; overflow-y: auto;" class="mb-5">
        <b-navbar toggleable class=" ">
        <b-navbar-nav class="w-100">
          <b-navbar-item v-for="(category, index) in categories" :key="index" style="border-bottom: 1px solid #f3f3f3; " class="py-2">
            <div class="d-flex justify-content-between cat-txt" @click="category.showSubCategories = !category.showSubCategories">
              <span class="">{{ category.name }}</span>
              <i class="bi bi-chevron-down grey-txt"></i>
            </div>
            <b-collapse id="navbar-toggle-collapse" is-nav v-model="category.showSubCategories">
              <b-navbar-nav class="ml-auto p-3">
                <b-nav-item v-for="(subCategory, index) in category.subCategories" :key="index"> -->
                  <!-- <router-link :to="subCategory.link">{{ subCategory.name }}</router-link> -->
                  <!-- <a>{{ subCategory.name }}</a>
                </b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar-item>
        </b-navbar-nav>
      </b-navbar>
    </div>

</template> -->

<template>
  <b-form-input class="mt-3 mb-1 light-search" type="search" placeholder="Pesquisar categorias" />
  <div style="max-height: 25vh; overflow-y: auto;" class="mb-5">
    <b-navbar toggleable class=" ">
      <b-navbar-nav class="w-100">
        <b-navbar-item v-for="(category, index) in filteredCategories" :key="index" style="border-bottom: 1px solid #f3f3f3; "
          class="py-2">
          <!-- <div class="d-flex justify-content-between cat-txt"
            @click="category.showSubCategories = !category.showSubCategories">
            <span class="">{{ category.name }}</span>
            <i class="bi bi-chevron-down grey-txt"></i>
          </div> -->
          <div class="d-flex justify-content-between cat-txt" @click="category.showSubCategories = !category.showSubCategories; fetchSubCategories(category.id)">
            <!-- <span>{{ category.id }}</span> -->
            <span>{{ category.name }}</span>
            <i :class="{ 'bi bi-chevron-down': !category.showSubCategories, 'bi bi-chevron-up': category.showSubCategories }" @click="category.showSubCategories = !category.showSubCategories; fetchSubCategories(category.id)" />
          </div>
       
          <b-collapse id="navbar-toggle-collapse" is-nav v-model="category.showSubCategories">
            <b-navbar-nav class="ml-auto p-3">
              
             <!-- TODO arranjar isto de forma a que seja verdadeiramente automático -->
              <b-nav-item v-for="(subCategory, index) in parentSubcategories" :key="index">
                <a>{{ subCategory.name }}</a>
              </b-nav-item>
            </b-navbar-nav>
          </b-collapse>
        </b-navbar-item>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>

<script>
// console.log(JSON.stringify(categories))
import { fetchCategorySubCategories  } from "@/api";
// import { Category } from "@/types";
// import { defineComponent } from "vue";
export default {
  data() {
    return {
      // allCategories: {} as Category[],
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
        // console.log("parent: "+ category.parent)
        // Vê se o parent é null
        if (!category.parent && !filtered.some((c) => c.name === category.name)) {
        // if (!filtered.some((c) => c.name === category.name)) {
          filtered.push(category);
        }
      }
      // return filtered;
      return filtered.sort((a, b) => a.name.localeCompare(b.name));
      // return this.categories.filter((category) => category.parent === 1);
    },

  },
  // TODO Resolver o loading que só funciona quando se clica na seta uma segunda vez
  // TODO filtrar as subcategorias também para evitar repetidos e ordenar alfabeticamente
   methods: {
     async fetchSubCategories(id) {
      var fetchedSubcategories = [];
      // fetchedSubcategories = await fetchCategorySubCategories(id);
      // Vai apenas buscar as subcategorias que não se repetem (isto é mesmo mais eficiente ou continua a ser igual?)
      fetchedSubcategories = (await fetchCategorySubCategories(id)).data.items.filter((subCategory, index, subCategories) => subCategories.findIndex((otherSubCategory) => otherSubCategory.name === subCategory.name) === index);
       this.parentSubcategories = fetchedSubcategories;
      // this.parentSubcategories = fetchedSubcategories.data.items;
      console.log("Subcats:" + JSON.stringify(this.parentSubcategories));
      return this.parentSubcategories;
    },
  },

  async beforeMount() {
    var parentSubcategories = [];
    // TODO mudar isto para depois ser automático, ainda só está para teste
    // const allSubCategoriesId1 = await fetchCategorySubCategories(1);
    // this.allSubCategoriesId1 = allSubCategoriesId1.data.items;
  },
  
};
</script>

<style>
 
  .cat-txt{
    cursor: pointer;
  }

</style>

