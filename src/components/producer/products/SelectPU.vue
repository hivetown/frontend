<template>
  <Toast>
    <template #message="slotProps">
      <div class="p-toast-message-text">
        <span class="p-toast-summary">{{ slotProps.message.summary }}</span>
        <div class="p-toast-detail" v-html="slotProps.message.detail" />
      </div>
    </template>
  </Toast>

  <OverlayPanel ref="manageProductOverlay">
    <div v-if="isOverlayOpen" class="p-3">
      <h4>{{ methodName }}</h4>

      {{ productionUnit }}

      <!-- TODO: Ver o que este emit faz -->
      <div class="flex justify-content-center mt-4">
        <VeeForm
          @submit="($e) => createProduct($e as Event)"
          class="flex flex-column gap-3"
        >
          <!-- Dropdown -->
          <div class="flex flex-column gap-2">
            <label for="price">Unidade de Produção Associada</label>
            <Dropdown
              v-model="selectedCountry"
              :options="countries"
              filter
              option-label="name"
              placeholder="Select a Country"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <img
                    :alt="slotProps.value.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.value.code.toLowerCase()}`"
                    style="width: 18px"
                  />
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
                  <img
                    :alt="slotProps.option.label"
                    src="https://primefaces.org/cdn/primevue/images/flag/flag_placeholder.png"
                    :class="`mr-2 flag flag-${slotProps.option.code.toLowerCase()}`"
                    style="width: 18px"
                  />
                  <div>{{ slotProps.option.name }}</div>
                </div>
              </template>
            </Dropdown>
          </div>

          <!-- Submit -->
          <PrimeButton
            type="submit"
            :label="`${methodName}`"
            :loading="submitting"
          />
        </VeeForm>
      </div>
    </div>
  </OverlayPanel>

  <PrimeButton
    :icon="`pi pi-${methodName === 'Criar' ? 'plus' : 'truck'}`"
    outlined
    @click="toggleOverlay"
  />
</template>

<script lang="ts">
import {
  fetchAllProducts,
  fetchProducerProductionUnits,
  createProducerProduct,
  updateProducerProduct,
} from '@/api';
import { ComputedRef, PropType, computed, onBeforeMount, ref } from 'vue';
import {
  BaseItems,
  ProducerProduct,
  ProductSpec,
  ProductionUnit,
} from '@/types';
import OverlayPanel from 'primevue/overlaypanel';
import PrimeButton from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import { Form as VeeForm, useField, useForm } from 'vee-validate';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useStore } from '@/store';

export default {
  data() {
    return {
      selectedCountry: ref(),
      countries: ref([
        { name: 'Australia', code: 'AU' },
        { name: 'Brazil', code: 'BR' },
        { name: 'China', code: 'CN' },
        { name: 'Egypt', code: 'EG' },
        { name: 'France', code: 'FR' },
        { name: 'Germany', code: 'DE' },
        { name: 'India', code: 'IN' },
        { name: 'Japan', code: 'JP' },
        { name: 'Spain', code: 'ES' },
        { name: 'United States', code: 'US' },
      ]),
    };
  },

  methods: {
    fetchPUS() {},
  },

  name: 'SelectPU',
  components: {
    PrimeButton,
    VeeForm,
    Toast,
    OverlayPanel,
    Dropdown,
  },
  props: {
    defaultProductionUnit: {
      type: Object as PropType<ProductionUnit>,
      required: false,
      default: null,
    },
    defaultProductSpec: {
      type: Object as PropType<ProductSpec>,
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
    productManaged: (product: ProducerProduct) => true,
  },
  setup(props, { emit }) {
    const store = useStore();
    const producerId = store.state.user!.user.id;

    if (
      props.method === 'update' &&
      (!props.producerProductId ||
        !props.defaultProductSpec.id ||
        !props.defaultProductionUnit.id)
    ) {
      throw new Error(
        'Quando o método é "update", producerProductId, defaultProductSpec, e defaultProductionUnit devem ser fornecidos'
      );
    }
    const methodName =
      props.method === 'create' ? 'Criar' : 'Associar a Uni. de Produção';

    // Overlay
    const manageProductOverlay = ref();
    const isOverlayOpen = computed(() => manageProductOverlay.value.visible);
    const toggleOverlay = (event: MouseEvent) => {
      manageProductOverlay.value.toggle(event);
    };
    const closeOverlay = () => {
      manageProductOverlay.value.hide();
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
        productSpec: props.defaultProductSpec || ({} as ProductSpec),
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
        await fetchAllProducts({ search: productSpec.searchQuery.value })
      ).data;
    };

    // Apply the selected product to the form
    const productSpecChanged = (event: { value: ProductSpec }) => {
      setFieldValue('productSpec', event.value);
    };
    // Reset productspec when search query changes
    const productSpecReset = () => {
      if (formValues.productSpec)
        setFieldValue('productSpec', {} as ProductSpec);
    };

    const productSpec = {
      searchQuery: ref(''),
      items: ref({} as BaseItems<ProductSpec>),
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
        await fetchProducerProductionUnits(producerId)
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

    useField('productSpec', (value: ProductSpec) => {
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
        let product = null as ProducerProduct | null;
        switch (props.method) {
          case 'create':
            product = (
              await createProducerProduct(producerId, {
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
              await updateProducerProduct(producerId, props.producerProductId, {
                currentPrice: values.price!,
                productionDate: values.productionDate!,
                stock: values.stock!,
                productionUnitId: values.productionUnit.id,
              })
            ).data;
            break;
        }

        emit('productManaged', product);

        const methodNameSummary =
          props.method === 'create' ? 'criado' : 'atualizado';
        toast.add({
          severity: 'success',
          summary: `Produto ${methodNameSummary} com sucesso`,
          detail: `O produto foi ${methodNameSummary} com sucesso, clique <a href="/producer/${producerId}/products/${product.id}">aqui</a> para ver o produto."`,
          life: 10000,
        });

        // Reset form
        resetForm();
        console.log(JSON.parse(JSON.stringify(formValues.productSpec)));
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

      // Close overlay
      setTimeout(closeOverlay, 100);
    });

    return {
      // Misc
      methodName,
      //   Overlay
      toggleOverlay,
      manageProductOverlay,
      isOverlayOpen,
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

<style scoped>
.p-button-outlined {
  color: #f1b24a !important;
  border-radius: 50%;
}

.card-text .p-button-outlined {
  color: #5a5a5a !important;
}
</style>
