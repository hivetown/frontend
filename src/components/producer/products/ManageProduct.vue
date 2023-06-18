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
      <h4>{{ methodName }} produto</h4>

      <div class="flex justify-content-center mt-4">
        <VeeForm
          @submit="($e) => createProduct($e as Event)"
          class="flex flex-column gap-3"
        >
          <!-- Product Spec -->
          <div class="flex flex-column gap-2">
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
              :disabled="productSpec.disabled"
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
                    <div class="text-sm">
                      {{ slotProps.option.description }}
                    </div>
                  </div>
                </div>
              </template>
              <template #empty
                >Nenhum produto encontrado para "{{
                  productSpec.searchQuery.value
                }}"</template
              >
            </AutoComplete>
            <small id="productSpecHelp"
              >Escreva pelo menos 3 letras para iniciar a pesquisa</small
            >
            <small
              v-if="formErrors.productSpec"
              class="p-error"
              id="productSpecError"
              >{{ formErrors.productSpec }}</small
            >
          </div>

          <!-- Production Unit -->
          <div class="flex flex-column gap-2">
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
              <template #empty
                >Nenhuma unidade de produção encontrada para "{{
                  productionUnit.searchQuery.value
                }}"</template
              >
            </AutoComplete>
            <small>Escreva pelo menos 3 letras para iniciar a pesquisa</small>
            <small
              v-if="formErrors.productionUnit"
              class="p-error"
              id="productionUnitError"
              >{{ formErrors.productionUnit }}</small
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
import AutoComplete from 'primevue/autocomplete';
import PrimeButton from 'primevue/button';
import { Form as VeeForm, useField, useForm } from 'vee-validate';
import Calendar from 'primevue/calendar';
import InputNumber from 'primevue/inputnumber';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';
import { useStore } from '@/store';

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
    const methodName = props.method === 'create' ? 'Criar' : 'Atualizar';

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
        await fetchProducerProductionUnits(
          producerId,
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
