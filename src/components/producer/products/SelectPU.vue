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
              filter
              v-model="selectedPU"
              :options="optsPUs"
              input-id="productionUnit"
              data-key="id"
              option-label="name"
              force-selection
              placeholder="Altere a Unidade de Produção"
            >
              <template #value="slotProps">
                <div v-if="slotProps.value" class="flex align-items-center">
                  <div>{{ slotProps.value.name }}</div>
                </div>
                <span v-else>
                  {{ slotProps.placeholder }}
                </span>
              </template>
              <template #option="slotProps">
                <div class="flex align-items-center">
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
import { fetchProducerProductionUnits, updateProducerProduct } from '@/api';
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
      type: String as PropType<'update'>,
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
      !props.producerProductId ||
      !props.defaultProductSpec.id ||
      !props.defaultProductionUnit.id
    ) {
      throw new Error('Neste caso, defaultProductionUnit deve ser fornecido');
    }
    const methodName = 'Associar a Uni. de Produção';

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
      setFilterOpts();
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
        await fetchProducerProductionUnits(producerId, selectedPU.value.code)
      ).data;
    };

    // Set Filter Opts
    const setFilterOpts = async () => {
      productionUnit.items.value = (
        await fetchProducerProductionUnits(producerId)
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
    const manageProduct = handleSubmit(async () => {
      // Disable submitting
      submitting.value = true;

      // Submit
      try {
        let product = null as ProducerProduct | null;
        product = (
          await updateProducerProduct(producerId, props.producerProductId, {
            currentPrice: props.defaultPrice,
            productionDate: props.defaultProductionDate,
            stock: props.defaultStock,
            productionUnitId: parseInt(selectedPU.value.code),
          })
        ).data;
        emit('productManaged', product);

        toast.add({
          severity: 'success',
          summary: 'Produto atualizado com sucesso',
          detail: `O produto foi atualizado com sucesso, clique <a href="/producer/${producerId}/products/${product.id}">aqui</a> para ver o produto."`,
          life: 10000,
        });

        // Reset form
        resetForm();
        productionUnit.searchQuery.value = '';
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Ocorreu um erro ao atualizar o produto, selecionou corretamente uma unidade de produção?<br/>${
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
