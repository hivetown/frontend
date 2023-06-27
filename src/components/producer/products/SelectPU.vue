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

      <!--{{ defaultProductionUnit }}-->

      <p>
        Produto associado a:
        {{ defaultProductionUnit.name.split('-')[1].trim() }}
      </p>

      <!-- TODO: Ver o que este emit faz -->
      <div class="flex justify-content-center mt-4">
        <VeeForm
          @submit="($e) => createProduct($e as Event)"
          class="flex flex-column gap-3"
        >
          <!-- Dropdown -->
          <div class="flex flex-column gap-2">
            <label for="price">Mudança de Unidade de Produção:</label>
            <Dropdown
              v-model="productionUnit.searchQuery.value"
              :options="optsPUs"
              input-id="productionUnit"
              filter
              option-label="name"
              placeholder="Altere a Unidade de Produção"
			  @item-select="productionUnit.changed"
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
  fetchProducerProductionUnits,
  createProducerProduct,
  updateProducerProduct,
  updateProductProductionUnit,
} from '@/api';
import { ComputedRef, PropType, computed, onBeforeMount, ref, Ref } from 'vue';
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
    return {};
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
      default: 'update',
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
      //if (props.defaultProductionUnit) {
      //  productionUnit.searchQuery.value = props.defaultProductionUnit.name;
      //}
      searchProductionUnits();
    });

    let selectedPU: Ref<any> = ref(null);
    let optsPUs: Ref<{ name: string; code: string }[]> = ref([]);

    // Production unit
    const isProductionUnitValid: ComputedRef<boolean> = computed(() => {
      return productionUnit.searchQuery.value.length >= 3;
    });

    // Search the products
    const searchProductionUnits = async () => {
      productionUnit.items.value = (
        await fetchProducerProductionUnits(producerId, )
      ).data;

      const lengthWanted = productionUnit.items.value.items.length;
      for (let i = 0; i < lengthWanted; i++) {
        optsPUs.value.push({
          name: productionUnit.items.value.items[i].name.split('-')[1].trim(),
          code: productionUnit.items.value.items[i].id.toString(),
        });
      }
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

    useField('productionUnit', (value: ProductionUnit) => {
      if (!value || !value.id) {
        return 'A unidade de produção é obrigatória';
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
        console.log('values:', values.productionUnit);
        let product = null as ProducerProduct | null;
        switch (props.method) {
          case 'create':
            product = (
              await updateProducerProduct(producerId, props.producerProductId, {
                currentPrice: props.defaultPrice,
                productionDate: props.defaultProductionDate,
                stock: props.defaultStock,
                productionUnitId: values.productionUnit.id,
              })
            ).data;
            break;
          case 'update':
            product = (
              await updateProducerProduct(producerId, props.producerProductId, {
                currentPrice: props.defaultPrice,
                productionDate: props.defaultProductionDate,
                stock: props.defaultStock,
                productionUnitId: values.productionUnit.id,
              })
            ).data;
            break;
        }

        //emit('productManaged', product);

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
      // Production Unit
      productionUnit,

      //Dropdwon,
      selectedPU,
      optsPUs,
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
