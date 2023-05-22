<template>
  <div class="p-3">
    <h4>Criar um produto</h4>

    <div class="card flex justify-content-center">
      <VeeForm @submit="createProduct" class="flex flex-column gap-2">
        <!-- Product Spec -->
        <label for="productSpec">Nome do produto</label>
        <AutoComplete
          v-model="productSpec.searchQuery.value"
          :input-class="{ 'p-invalid': formErrors.productSpec }"
          input-id="productSpec"
          aria-describedby="productSpecError"
          :min-length="3"
          data-key="id"
          option-label="name"
          :suggestions="productSpec.items.value.items"
          @complete="productSpec.search"
          @item-select="productSpec.changed"
          @change="productSpec.reset"
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
        <small
          v-if="formErrors.productSpec"
          class="p-error"
          id="productSpecError"
          >{{ formErrors.productSpec }}</small
        >

        <!-- Production Unit -->
        <label for="productionUnit">Nome da unidade de produção</label>
        <AutoComplete
          v-model="productionUnit.searchQuery.value"
          :input-class="{ 'p-invalid': formErrors.productionUnit }"
          input-id="productionUnit"
          aria-describedby="productionUnitError"
          :min-length="3"
          data-key="id"
          option-label="name"
          :suggestions="productionUnit.items.value.items"
          @complete="productionUnit.search"
          @item-select="productionUnit.changed"
          @change="productionUnit.reset"
          force-selection
        >
          <template #option="slotProps">
            <div class="flex align-options-center">
              <div>
                <div>{{ slotProps.option.name }}</div>
                <div class="text-sm">
                  {{ slotProps.option.address.parish }},
                  {{ slotProps.option.address.county }},
                  {{ slotProps.option.address.city }}
                </div>
              </div>
            </div>
          </template>
        </AutoComplete>
        <small
          v-if="formErrors.productionUnit"
          class="p-error"
          id="productionUnitError"
          >{{ formErrors.productionUnit }}</small
        >

		<!-- Production date -->
		<label for="productionDate">Data de produção</label>
		<InputMask
		  v-model="formValues.value.productionDate"
		  :input-class="{ 'p-invalid': formErrors.productionDate }"
		  input-id="productionDate"
		  aria-describedby="productionDateError"
		  mask="99/99/9999"
		  slot="content"
		  :placeholder="productionDatePlaceholder"
		></InputMask>
		<small
		  v-if="formErrors.productionDate"
		  class="p-error"
		  id="productionDateError"
		  >{{ formErrors.productionDate }}</small
		>

		<!-- Stock -->
		<label for="quantity">Quantidade</label>
		<InputNumber
		  v-model="formValues.value.quantity"
		  :input-class="{ 'p-invalid': formErrors.quantity }"
		  input-id="quantity"
		  aria-describedby="quantityError"
		  slot="content"
		  :placeholder="quantityPlaceholder"
		  :min="1"
		  :max="999999999"
		></InputNumber>
		<small
		  v-if="formErrors.quantity"
		  class="p-error"
		  id="quantityError"
		  >{{ formErrors.quantity }}</small
		>

		<!-- Price -->
		<label for="price">Preço</label>
		<InputNumber
		  v-model="formValues.value.price"
		  :input-class="{ 'p-invalid': formErrors.price }"
		  input-id="price"
		  aria-describedby="priceError"
		  slot="content"
		  :placeholder="pricePlaceholder"
		  :min="0"
		  :max="999999999"
		></InputNumber>
		<small
		  v-if="formErrors.price"
		  class="p-error"
		  id="priceError"
		  >

		<PrimeButton type="submit" label="Criar produto" />
      </VeeForm>
    </div>
  </div>
</template>

<script lang="ts">
import { fetchAllProducts, fetchAllProductionUnits } from '@/api';
import { ComputedRef, computed, ref } from 'vue';
import { BaseItems, ProductSpecification, ProductionUnit } from '@/types';
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
    // Product Spec
    const isProductSpecsQueryValid: ComputedRef<boolean> = computed(() => {
      return productSpec.searchQuery.value.length >= 3;
    });

    // Search the products
    const searchProductSpecs = async () => {
      productSpec.items.value = (
        await fetchAllProducts(productSpec.searchQuery.value)
      ).data;
    };

    // Apply the selected product to the form
    const productSpecChanged = (event: { value: ProductSpecification }) => {
      setFieldValue('productSpec', event.value);
    };
    // Reset productspec when search query changes
    const productSpecReset = () => {
      if (formValues.productSpec)
        setFieldValue('productSpec', {} as ProductSpecification);
    };

    const productSpec = {
      searchQuery: ref(''),
      items: ref({} as BaseItems<ProductSpecification>),
      search: searchProductSpecs,
      changed: productSpecChanged,
      reset: productSpecReset,
      isQueryValid: isProductSpecsQueryValid,
    };

    // Production unit
    const isProductionUnitValid: ComputedRef<boolean> = computed(() => {
      return productionUnit.searchQuery.value.length >= 3;
    });

    // Search the products
    const searchProductionUnits = async () => {
      // TODO insert producer id
      productionUnit.items.value = (
        await fetchAllProductionUnits(2, productionUnit.searchQuery.value)
      ).data;
    };

    // Apply the selected product to the form
    const productionUnitChanged = (event: { value: ProductionUnit }) => {
      setFieldValue('productionUnit', event.value);
    };
    // Reset productionUnit when search query changes
    const productionUnitReset = () => {
      if (formValues.productionUnit)
        setFieldValue('productionUnit', {} as ProductionUnit);
    };

    const productionUnit = {
      searchQuery: ref(''),
      items: ref({} as BaseItems<ProductionUnit>),
      search: searchProductionUnits,
      changed: productionUnitChanged,
      reset: productionUnitReset,
      isQueryValid: isProductionUnitValid,
    };

    // Form
    const {
      handleSubmit,
      resetForm,
      setFieldValue,
      errors: formErrors,
      values: formValues,
    } = useForm({
      initialValues: {
        value: {
          productSpec: {} as ProductSpecification,
          productionUnit: {} as ProductionUnit,
        },
      },
    });

    useField('productSpec', (value: ProductSpecification) => {
      if (!value || !value.id) {
        return 'A especificação do produto é obrigatória';
      }

      return true;
    });

    useField('productionUnit', (value: ProductionUnit) => {
      if (!value || !value.id) {
        return 'A unidade de produção é obrigatória';
      }

      return true;
    });

    const createProduct = handleSubmit((values) => {
      console.log('form submitter', values);
      if (values.value) {
        resetForm();
        productSpec.searchQuery.value = '';
      }
    });

    return {
      // Form
      formErrors,
      createProduct,
      // Product Spec
      productSpec,
      // Production Unit
      productionUnit,
    };
  },
};
</script>
