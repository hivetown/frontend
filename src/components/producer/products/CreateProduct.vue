<template>
  <div class="p-3">
    <Toast>
      <template #message="slotProps">
        <div class="p-toast-message-text">
          <span class="p-toast-summary">{{ slotProps.message.summary }}</span>
          <div class="p-toast-detail" v-html="slotProps.message.detail" />
        </div>
      </template>
    </Toast>
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
          empty-search-message="Nenhum produto encontrado"
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
          empty-search-message="Nenhuma unidade de produção encontrada"
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
        <Calendar
          v-model="formValues.productionDate"
          :input-class="{ 'p-invalid': formErrors.productionDate }"
          input-id="productionDate"
          aria-describedby="productionDateError"
          :max-date="new Date()"
          show-icon
          date-format="dd/mm/yy"
        ></Calendar>
        <small
          v-if="formErrors.productionDate"
          class="p-error"
          id="productionDateError"
          >{{ formErrors.productionDate }}</small
        >

        <!-- Stock -->
        <label for="stock">Stock</label>
        <InputNumber
          v-model="formValues.stock"
          :input-class="{ 'p-invalid': formErrors.stock }"
          input-id="stock"
          aria-describedby="stockError"
          :min="1"
          :max="999999999"
        ></InputNumber>
        <small v-if="formErrors.stock" class="p-error" id="stockError">{{
          formErrors.stock
        }}</small>

        <!-- Price -->
        <label for="price">Preço</label>
        <InputNumber
          v-model="formValues.price"
          :input-class="{ 'p-invalid': formErrors.price }"
          input-id="price"
          aria-describedby="priceError"
          mode="currency"
          currency="EUR"
          locale="pt-PT"
          :min="0"
          :max="999999999"
        ></InputNumber>
        <small v-if="formErrors.price" class="p-error" id="priceError">
          {{ formErrors.price }}
        </small>

        <!-- Submit -->
        <PrimeButton
          type="submit"
          label="Criar produto"
          :loading="submitting"
        />
      </VeeForm>
    </div>
  </div>
</template>

<script lang="ts">
import {
  fetchAllProducts,
  fetchAllProductionUnits,
  createProducerProduct,
} from '@/api';
import { ComputedRef, computed, ref } from 'vue';
import { BaseItems, ProductSpecification, ProductionUnit } from '@/types';
import AutoComplete from 'primevue/autocomplete';
import PrimeButton from 'primevue/button';
import { Form as VeeForm, useField, useForm } from 'vee-validate';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export default {
  name: 'CreateProduct',
  components: {
    AutoComplete,
    PrimeButton,
    VeeForm,
    Calendar,
    InputNumber,
    Toast,
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
        productSpec: {} as ProductSpecification,
        productionUnit: {} as ProductionUnit,
        productionDate: null as Date | null,
        stock: 0,
        price: 0,
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

    useField('productionDate', (value: Date) => {
      if (!value) {
        return 'A data de produção é obrigatória';
      }

      if (value.getTime() > Date.now()) {
        return 'A data de produção deve ser no passado';
      }

      return true;
    });

    useField('stock', (value: number) => {
      if (!value && value !== 0) {
        return 'O stock é obrigatória';
      }

      if (value < 1) {
        return 'O stock deve ser maior que 0';
      }

      return true;
    });

    useField('price', (value: number) => {
      if (!value && value !== 0) {
        return 'O preço é obrigatório';
      }

      if (value < 0) {
        return 'O preço deve ser maior ou igual a 0';
      }

      return true;
    });

    const toast = useToast();
    const submitting = ref(false);
    const createProduct = handleSubmit(async (values) => {
      if (values) {
        // Disable submitting
        submitting.value = true;

        // Submit
        try {
          // TODO insert producer id
          const product = await createProducerProduct(1, {
            currentPrice: values.price,
            productionDate: values.productionDate!,
            productionUnitId: values.productionUnit.id,
            productSpecId: values.productSpec.id,
            stock: values.stock,
          });

          toast.add({
            severity: 'success',
            summary: 'Produto criado',
            detail: `O produto foi criado com sucesso, clique <a href="/producer/${1}/products/${
              product.data.id
            }">aqui</a> para ver o seu novo produto."`,
          });

          // Reset form
          resetForm();
          productSpec.searchQuery.value = '';
          productionUnit.searchQuery.value = '';
        } catch (error) {
          // TODO handle error
          toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Ocorreu um erro ao criar o produto, por favor tente novamente.<br/>${
              (error as Error).message
            }`,
          });
        }

        // Enable submitting
        submitting.value = false;
      }
    });

    return {
      // Form
      formErrors,
      createProduct,
      formValues,
      submitting,
      // Product Spec
      productSpec,
      // Production Unit
      productionUnit,
    };
  },
};
</script>
