<template>
  <OverlayPanel ref="manageProductOverlay">
    <div class="p-3">
      <Toast>
        <template #message="slotProps">
          <div class="p-toast-message-text">
            <span class="p-toast-summary">{{ slotProps.message.summary }}</span>
            <div class="p-toast-detail" v-html="slotProps.message.detail" />
          </div>
        </template>
      </Toast>
      <h4>Colocar produto num transporte</h4>

      <div class="flex justify-content-center mt-4">
        <VeeForm @submit="allocateProduct" class="flex flex-column gap-3">
          <!-- Carrier -->
          <div class="flex flex-column gap-2">
            <label for="carrier">Veículo</label>
            <AutoComplete
              v-model="carrier.searchQuery.value"
              :input-class="{ 'p-invalid': formErrors.carrier }"
              input-id="carrier"
              aria-describedby="carrierError"
              :min-length="3"
              data-key="id"
              option-label="name"
              :suggestions="carrier.items.value.items"
              @complete="carrier.search"
              @item-select="carrier.changed"
              @change="carrier.reset"
              force-selection
              empty-search-message="Nenhum veículo encontrado"
            >
              <template #option="slotProps">
                <div class="flex align-options-center">
                  <div class="flex align-options-center">
                    <img
                      :src="slotProps.option.images[0].url"
                      :alt="slotProps.option.images[0].alt"
                      class="mr-2"
                      style="width: 75px; height: 75px"
                    />

                    <div>
                      <div class="font-bold">{{ slotProps.option.name }}</div>
                      <div class="text-sm">
                        {{ slotProps.option.description }}
                      </div>
                    </div>
                  </div>
                </div>
              </template>
              <template #empty
                >Nenhum veículo encontrado para "{{
                  carrier.searchQuery.value
                }}"</template
              >
            </AutoComplete>
            <small>Escreva pelo menos 3 letras para iniciar a pesquisa</small>
            <small
              v-if="formErrors.carrier"
              class="p-error"
              id="carrierError"
              >{{ formErrors.carrier }}</small
            >
          </div>

          <!-- Production date -->
          <div class="flex flex-column gap-2">
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
          </div>

          <!-- Stock -->
          <div class="flex flex-column gap-2">
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
          </div>

          <!-- Price -->
          <div class="flex flex-column gap-2">
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
          </div>

          <!-- Submit -->
          <PrimeButton
            type="submit"
            :label="`${methodName} produto`"
            :loading="submitting"
          />
        </VeeForm>
      </div>
    </div>
  </OverlayPanel>

  <PrimeButton
    :icon="`pi pi-${methodName === 'Criar' ? 'plus' : 'pencil'}`"
    outlined
    @click="toggleOverlay"
  />
</template>

<script lang="ts">
import {
  fetchAllProducts,
  fetchAllProductionUnits,
  createProducerProduct,
  updateProducerProduct,
} from '@/api';
import {
  ComputedRef,
  PropType,
  computed,
  onBeforeMount,
  onMounted,
  ref,
} from 'vue';
import {
  BaseItems,
  Product,
  ProductSpecification,
  ProductionUnit,
} from '@/types';
import OverlayPanel from 'primevue/overlaypanel';
import AutoComplete from 'primevue/autocomplete';
import PrimeButton from 'primevue/button';
import { Form as VeeForm, useField, useForm } from 'vee-validate';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export default {
  name: 'ManageProduct',
  components: {
    AutoComplete,
    PrimeButton,
    VeeForm,
    Calendar,
    InputNumber,
    Toast,
    OverlayPanel,
  },
  props: {
    defaultProductionUnit: {
      type: Object as PropType<ProductionUnit>,
      required: false,
      default: null,
    },
    defaultProductSpec: {
      type: Object as PropType<ProductSpecification>,
      required: false,
      default: null,
    },
    defaultProductionDate: {
      type: Date as PropType<Date>,
      required: false,
      default: null,
    },
    defaultStock: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
    defaultPrice: {
      type: Number as PropType<number>,
      required: false,
      default: 0,
    },
    method: {
      type: String as PropType<'create' | 'update'>,
      required: true,
      default: 'create',
    },
    producerProductId: {
      type: Number as PropType<number>,
      required: false,
      default: null,
    },
  },
  emits: {
    // eslint-disable-next-line no-unused-vars
    productManaged: (product: Product) => true,
  },
  setup(props, { emit }) {
    // TODO USE STORE AUTHENTICATED USER
    const PRODUCER_ID = 1;

    if (
      props.method === 'update' &&
      (!props.producerProductId ||
        !props.defaultProductSpec.id ||
        !props.defaultProductionUnit.id)
    ) {
      throw new Error(
        'When method is "update", producerProductId, defaultProductSpec, and defaultProductionUnit must be provided'
      );
    }
    const methodName = props.method === 'create' ? 'Criar' : 'Atualizar';

    // Overlay
    const manageProductOverlay = ref();
    const toggleOverlay = (event: MouseEvent) => {
      console.log(manageProductOverlay.value);
      manageProductOverlay.value.toggle(event);
    };

    onMounted(() => {
      console.log(manageProductOverlay.value);
    });

    // Form
    const {
      handleSubmit,
      resetForm,
      setFieldValue,
      errors: formErrors,
      values: formValues,
    } = useForm({
      initialValues: {
        productSpec: props.defaultProductSpec || ({} as ProductSpecification),
        productionUnit: props.defaultProductionUnit || ({} as ProductionUnit),
        productionDate: props.defaultProductionDate || null,
        stock: props.defaultStock || null,
        price: props.defaultPrice || null,
      },
    });

    // Apply default values
    onBeforeMount(() => {
      if (props.defaultProductSpec) {
        productSpec.searchQuery.value = props.defaultProductSpec.name;
      }

      if (props.defaultProductionUnit) {
        productionUnit.searchQuery.value = props.defaultProductionUnit.name;
      }
    });

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
      disabled: props.method === 'update',
    };

    // Production unit
    const isProductionUnitValid: ComputedRef<boolean> = computed(() => {
      return productionUnit.searchQuery.value.length >= 3;
    });

    // Search the products
    const searchProductionUnits = async () => {
      productionUnit.items.value = (
        await fetchAllProductionUnits(
          PRODUCER_ID,
          productionUnit.searchQuery.value
        )
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
    const manageProduct = handleSubmit(async (values) => {
      // Disable submitting
      submitting.value = true;

      // Submit
      try {
        let product = null as Product | null;
        switch (props.method) {
          case 'create':
            product = (
              await createProducerProduct(PRODUCER_ID, {
                currentPrice: values.price!,
                productionDate: values.productionDate!,
                productionUnitId: values.productionUnit.id,
                productSpecId: values.productSpec.id,
                stock: values.stock!,
              })
            ).data;
            break;
          case 'update':
            product = (
              await updateProducerProduct(
                PRODUCER_ID,
                props.producerProductId,
                {
                  currentPrice: values.price!,
                  productionDate: values.productionDate!,
                  stock: values.stock!,
                  productionUnitId: values.productionUnit.id,
                }
              )
            ).data;
            break;
        }

        emit('productManaged', product);

        const methodNameSummary =
          props.method === 'create' ? 'criado' : 'atualizado';
        toast.add({
          severity: 'success',
          summary: `Produto ${methodNameSummary} com sucesso`,
          detail: `O produto foi ${methodNameSummary} com sucesso, clique <a href="/producer/${PRODUCER_ID}/products/${product.id}">aqui</a> para ver o produto."`,
          life: 10000,
        });

        // Reset form
        resetForm();
        productSpec.searchQuery.value = '';
        productionUnit.searchQuery.value = '';
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Ocorreu um erro ao criar o produto, por favor tente novamente.<br/>${
            (error as Error).message
          }`,
          life: 10000,
        });
      }

      // Enable submitting
      submitting.value = false;
    });

    return {
      // Misc
      methodName,
      //   Overlay
      toggleOverlay,
      manageProductOverlay,
      // Form
      formErrors,
      createProduct: manageProduct,
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
