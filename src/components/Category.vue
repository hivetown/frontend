<template>
    <div>
        <b-navbar toggleable class=" ">
            <b-navbar-nav class="w-100">
                <b-navbar-item v-for="(category, index) in filteredCategories" :key="index" 
                    style="border-bottom: 1px solid #f3f3f3;" class="py-2">
                    <div class="d-flex justify-content-between cat-txt" @click.stop="toggleCategory(category)">
                        <span>{{ category.id }}</span>
                        <span>{{ category.name }}</span>
                        <i :class="{
                            'bi bi-chevron-down': !category.showSubCategories,
                            'bi bi-chevron-up': category.showSubCategories
                        }" @click.stop="toggleCategory(category)" />
                    </div>
                    <b-collapse v-model="category.showSubCategories">
						<template v-if="category.showSubCategories">
                        	<Category :categories="category.subCategories" />
						</template>
                    </b-collapse>
                </b-navbar-item>
            </b-navbar-nav>
        </b-navbar>
    </div>
</template>

<script>
import { fetchCategorySubCategories } from "@/api";

export default {
    props: {
        categories: {
            type: Array,
            required: true,
        }
    },
    data() {
        return {
            parentSubcategories: [],
            subCategoriesById: {},
        };
    },
    computed: {
        filteredCategories() {
            return this.categories;
        },
    },
    methods: {
        async fetchSubCategories(id) {
            const subCategories = this.subCategoriesById[id] || (await fetchCategorySubCategories(id)).data.items.slice(0, 3);
            this.subCategoriesById[id] = subCategories;
            const category = this.categories.find(c => c.id === id);
            if (category) {
                category.subCategories = subCategories;
            }
        },
        async toggleCategory(category) {
			const nextState = !category.showSubCategories;
			if (nextState && !category.subCategories) {
				await this.fetchSubCategories(category.id);
            }
			category.showSubCategories = nextState
        },
    },
};
</script>
