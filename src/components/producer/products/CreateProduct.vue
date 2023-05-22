<template>
  <div class="p-3">
    <h4>Escolha o produto que pretende adicionar</h4>

    <div class="card flex justify-content-center">
      <VeeForm @submit="createProduct" class="flex flex-column gap-2">
        <!-- Product Spec -->
        <label for="productSpecAC">Nome do Produto</label>
        <AutoComplete
          v-model="searchQuery"
          :input-class="{ 'p-invalid': productSpecError }"
          input-id="productSpecAC"
          aria-describedby="productSpecACError"
          :min-length="3"
          data-key="id"
          option-label="name"
          :suggestions="products.items"
          @complete="search"
          @item-select="productSpecChanged"
          @change="productSpecReset"
          force-selection
        >
          <template #option="slotProps">
            <div class="flex align-options-center">
              <img
                :src="slotProps.option.images[0].url"
                :alt="slotProps.option.images[0].alt"
                class="mr-2"
                style="width: 75px; height: 75px"
              />

              <div>
                <div class="font-bold">{{ slotProps.option.name }}</div>
                <div class="text-sm">{{ slotProps.option.description }}</div>
              </div>
            </div>
          </template>
        </AutoComplete>
        <small class="p-error" id="ac-error">{{
          productSpecError || '&nbsp;'
        }}</small>

        {{ form.productSpec }}
        <PrimeButton type="submit" label="Criar produto" />
      </VeeForm>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchAllProducts } from '@/api';
import { computed, ref } from 'vue';
import { BaseItems, ProductSpecification } from '@/types';
import AutoComplete from 'primevue/autocomplete';
import PrimeButton from 'primevue/button';
import { Form as VeeForm, useField, useForm } from 'vee-validate';

export default {
  name: 'CreateProduct',
  components: {
    AutoComplete,
    PrimeButton,
    VeeForm,
  },
  setup() {
    const form = ref({
      productSpec: {} as ProductSpecification,
    });

    const searchQuery = ref('');
    const products = ref({} as BaseItems<ProductSpecification>);

    const isQueryValid = computed(() => {
      return searchQuery.value && searchQuery.value.length >= 3;
    });

    const search = async () => {
      products.value = (await fetchAllProducts(searchQuery.value)).data;
    };

    // Apply the selected product to the form
    const productSpecChanged = (event: { value: ProductSpecification }) => {
      form.value.productSpec = event.value;
    };
    // Reset productspec when search query changes
    const productSpecReset = () => {
      if (form.value.productSpec)
        form.value.productSpec = {} as ProductSpecification;
    };

    // Form
    const { handleSubmit, resetForm } = useForm({
      initialValues: {
        value: {
          productSpec: {} as ProductSpecification,
        },
      },
    });
    const { errorMessage: productSpecError } = useField(
      'productSpec',
      (value: any) => {
        console.log(value);
        if (!value) {
          return 'Value is required';
        }

        if (value.length < 3) {
          return 'Value amust be at least 3 characters';
        }

        return true;
      }
    );

    const createProduct = handleSubmit((values) => {
      if (values.value && values.value.length > 0) {
        console.log('form submitter');
        resetForm();
      }
    });

    return {
      form,
      productSpecError,
      productSpecChanged,
      productSpecReset,
      createProduct,
      search,
      searchQuery,
      isQueryValid,
      products,
    };
  },
};
</script>
