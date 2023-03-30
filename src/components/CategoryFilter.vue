<template>
  <b-form-input class="mt-3 mb-1 light-search" type="search" placeholder="Pesquisar categorias" />
  <div style="max-height: 25vh; overflow-y: auto;" class="mb-5">
    <b-navbar toggleable class=" ">
      <b-navbar-nav class="w-100">
        <b-navbar-item v-for="(category, index) in filteredCategories" :key="index" style="border-bottom: 1px solid #f3f3f3; "
          class="py-2">
      
          <div class="d-flex justify-content-between cat-txt" 
              @click="category.showSubCategories = !category.showSubCategories; 
              fetchSubCategories(category.id)">
              <span>{{ category.id }}</span>
              <span>{{ category.name }}</span>
              <i :class="{ 'bi bi-chevron-down': !category.showSubCategories, 
                          'bi bi-chevron-up': category.showSubCategories }" 
                  @click="category.showSubCategories = !category.showSubCategories; 
                  fetchSubCategories(category.id)"/>
          </div>
       
          <b-collapse id="navbar-toggle-collapse" is-nav v-model="category.showSubCategories">
            <!-- <p>a</p> -->
            
            <b-navbar-nav class="ml-auto p-3">
             <!-- TODO resolver o problema de que quando clico na seta a lista muda sempre para o mais atual -->
              <b-nav-item v-for="(subCategory, index) in parentSubcategories" :key="index">
                <div style="background-color: ;" class="d-flex justify-content-between cat-txt">
                <!-- <span>{{ subCategory.id }}</span> -->
                  {{ subCategory.id }}
                  <a>{{ subCategory.name }}</a>
                  <!-- <i :class="{ 'bi bi-chevron-down': !category.showSubCategories, 'bi bi-chevron-up': category.showSubCategories }" @click="category.showSubCategories = !category.showSubCategories; fetchSubCategories(category.id)" /> -->
                </div> 
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
      categoriesById: {},
      parentSubcategories: [],
      
    };
  },
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
   computed: {
    // TODO alterar para serem filtradas em backend e não aqui
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
    //   fetchSubCategories(id) {
    //     //  console.log("logAntes: " + JSON.stringify(this.parentSubcategories));
    //     //  console.log("sub: " + JSON.stringify(this.categoriesById));
    //     this.parentSubcategories = this.categoriesById[id];
    //     // console.log("log: "+ JSON.stringify(this.parentSubcategories));
    //     return this.parentSubcategories;
    // },
     fetchSubCategories(id) {
      this.parentSubcategories = this.subCategoriesById[id].slice(0,3) || [];
      return this.parentSubcategories;
    },
  },

  async beforeMount() {
    var parentSubcategories = [];
    // DICIONÁRIO DE CATEGORIAS
    // const categoriesById = {};
    // this.categories.forEach((category) => {
    //   categoriesById[category.id] = category;
    // });
    // console.log("categoriesById: " + JSON.stringify(categoriesById));

     // DICIONÁRIO DE SUBCATEGORIAS POR ID DE CATEGORIA
    const subCategoriesById = {};
    for (const category of this.categories) {
        subCategoriesById[category.id] = null;
       try {
        const subCategories = await fetchCategorySubCategories(category.id);
        subCategoriesById[category.id] = subCategories.data.items;
       }
        catch (error) {
          // console.log(error);
        }
    }
    //  this.categoriesById = categoriesById;
    this.subCategoriesById = subCategoriesById;

    console.log("subCategoriesById: " + JSON.stringify(subCategoriesById));
  },
  
};
</script>

<style>
 
  .cat-txt{
    cursor: pointer;
  }

</style>

