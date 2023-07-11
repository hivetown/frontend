<template>
  <OverlayPanel ref="manageOrderItemCarrierOverlay">
    <div class="p-3">
      <Toast>
        <template #message="slotProps">
          <div class="p-toast-message-text">
            <span class="p-toast-summary">{{ slotProps.message.summary }}</span>
            <div class="p-toast-detail" v-html="slotProps.message.detail" />
          </div>
        </template>
      </Toast>
      <h4>Colocar produto encomendado num transporte</h4>

      <div class="flex justify-content-center mt-4">
        <VeeForm
          @submit="($e) => manageOrderItem($e as Event)"
          class="flex flex-column gap-3"
        >
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

          <!-- Submit -->
          <PrimeButton
            type="submit"
            :label="`Alocar encomenda`"
            :loading="submitting"
          />
        </VeeForm>
      </div>
    </div>
  </OverlayPanel>

  <PrimeButton :icon="`pi pi-truck`" outlined @click="toggleOverlay" />
</template>

<script lang="ts">
import {
  associateOrderItemShipment,
  fetchAllProductionUnitCarriers,
} from '@/api';
import { ComputedRef, PropType, computed, onBeforeMount, ref } from 'vue';
import { BaseItems, Carrier, OrderItem, Shipment } from '@/types';
import OverlayPanel from 'primevue/overlaypanel';
import AutoComplete from 'primevue/autocomplete';
import PrimeButton from 'primevue/button';
import { Form as VeeForm, useField, useForm } from 'vee-validate';
import Toast from 'primevue/toast';
import { useToast } from 'primevue/usetoast';

export default {
  name: 'ManageOrderItemCarrier',
  components: {
    AutoComplete,
    PrimeButton,
    VeeForm,
    Toast,
    OverlayPanel,
  },
  props: {
    defaultCarrier: {
      type: Object as PropType<Carrier>,
      required: false,
      default: null,
    },
    method: {
      type: String as PropType<'create' | 'update'>,
      required: true,
      default: 'create',
    },
    orderItem: {
      type: Object as PropType<OrderItem>,
      required: false,
      default: null,
    },
  },
  emits: {
    // eslint-disable-next-line no-unused-vars
    orderItemAssigned: (shipment: Shipment) => true,
  },
  setup(props, { emit }) {
    // TODO USE STORE AUTHENTICATED USER
    const PRODUCER_ID = 1;

    if (props.method === 'update' && !props.defaultCarrier) {
      throw new Error(
        'When method is "update", producerProductId, defaultProductSpec, and defaultProductionUnit must be provided'
      );
    }

    // Overlay
    const manageOrderItemCarrierOverlay = ref();
    const isOverlayOpen = computed(
      () => manageOrderItemCarrierOverlay.value.visible
    );
    const toggleOverlay = (event: MouseEvent) => {
      manageOrderItemCarrierOverlay.value.toggle(event);
    };
    const closeOverlay = () => {
      manageOrderItemCarrierOverlay.value.hide();
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
        carrier: props.defaultCarrier || ({} as Carrier),
      },
    });

    // Apply default values
    onBeforeMount(() => {
      if (props.defaultCarrier) {
        carrier.searchQuery.value = props.defaultCarrier.licensePlate;
      }
    });

    // Carrier
    const isCarrierQueryValid: ComputedRef<boolean> = computed(() => {
      return carrier.searchQuery.value.length >= 3;
    });

    // Search the carriers
    const searchCarriers = async () => {
      carrier.items.value = (
        await fetchAllProductionUnitCarriers(
          props.orderItem.producerProduct.producer!.user.id,
          props.orderItem.producerProduct.productionUnit!.id
          //   carrier.searchQuery.value
        )
      ).data;
    };

    // Apply the selected carrier to the form
    const carrierChanged = (event: { value: Carrier }) => {
      setFieldValue('carrier', event.value);
    };
    // Reset carrier when search query changes
    const carrierReset = () => {
      if (formValues.carrier) setFieldValue('carrier', {} as Carrier);
    };

    const carrier = {
      searchQuery: ref(''),
      items: ref({} as BaseItems<Carrier>),
      search: searchCarriers,
      changed: carrierChanged,
      reset: carrierReset,
      isQueryValid: isCarrierQueryValid,
    };

    useField('carrier', (value: Carrier) => {
      if (!value || !value.id) {
        return 'O veículo é obrigatório';
      }

      return true;
    });

    const toast = useToast();
    const submitting = ref(false);
    const manageOrderItem = handleSubmit(async (values) => {
      // Disable submitting
      submitting.value = true;

      // Submit
      try {
        let shipment = null as Shipment | null;
        switch (props.method) {
          case 'create':
          case 'update':
            shipment = (
              await associateOrderItemShipment(
                PRODUCER_ID,
                props.orderItem.producerProduct.productionUnit!.id,
                values.carrier.id,
                props.orderItem.shipment.id
              )
            ).data;
            break;
        }

        emit('orderItemAssigned', shipment);

        toast.add({
          severity: 'success',
          summary: 'Produto encomendado associado a um veículo com sucesso',
          detail: `O produto encomendado foi associado ao veículo <b>${values.carrier.licensePlate}</b> com sucesso.`,
          life: 10000,
        });

        // Reset form
        resetForm();
        carrier.searchQuery.value = '';
      } catch (error) {
        toast.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Ocorreu um erro ao associar o produto encomendado, por favor tente novamente.<br/>${
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
      //   Overlay
      toggleOverlay,
      manageOrderItemCarrierOverlay,
      isOverlayOpen,
      // Form
      formErrors,
      manageOrderItem,
      formValues,
      submitting,
      // Carrier
      carrier,
    };
  },
};
</script>
