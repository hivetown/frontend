<template>
  <OverlayPanel ref="manageOrderItemCarrierOverlay">
    <div class="p-3">
      <h4>Colocar produto encomendado num transporte</h4>

      <div class="flex justify-content-center mt-4">
        <Loader v-if="loadingShipment" />
        <VeeForm
          v-else
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
              :min-length="1"
              data-key="id"
              option-label="licensePlate"
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
                      :src="slotProps.option.image.url"
                      :alt="slotProps.option.image.alt"
                      class="mr-2"
                      style="width: 75px; height: 75px"
                    />

                    <div>
                      <div class="font-bold">
                        {{ slotProps.option.licensePlate }}
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
            <small>Escreva pelo menos 1 letra para iniciar a pesquisa</small>
            <small
              v-if="formErrors.carrier"
              class="p-error"
              id="carrierError"
              >{{ formErrors.carrier }}</small
            >
          </div>

          <!-- Submit -->
          <PrimeButton type="submit" label="Associar" :loading="submitting" />
        </VeeForm>
      </div>
    </div>
  </OverlayPanel>

  <PrimeButton
    rounded
    outlined
    severity="info"
    style="color: #5a5a5a; font-size: 0.7em"
    @click="toggleOverlay"
    :loading="submitting"
    >Associar veículo</PrimeButton
  >
</template>

<script lang="ts">
import {
  associateOrderItemShipment,
  fetchAllProductionUnitCarriers,
  fetchOrderItemShipment,
} from '@/api';
import { ComputedRef, PropType, computed, ref } from 'vue';
import {
  BaseItems,
  Carrier,
  OrderItem,
  Shipment,
  SpecificOrder,
} from '@/types';
import OverlayPanel from 'primevue/overlaypanel';
import AutoComplete from 'primevue/autocomplete';
import PrimeButton from 'primevue/button';
import { Form as VeeForm, useField, useForm } from 'vee-validate';
import { useToast } from 'primevue/usetoast';
import Loader from '@/components/Loader.vue';
import { AxiosError } from 'axios';

export default {
  name: 'ManageOrderItemCarrier',
  components: {
    AutoComplete,
    PrimeButton,
    VeeForm,
    OverlayPanel,
    Loader,
  },
  props: {
    order: {
      type: Object as PropType<SpecificOrder>,
      required: true,
    },
    orderItem: {
      type: Object as PropType<OrderItem>,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line no-unused-vars
    orderItemCarrierAssigned: (shipment: Shipment) => true,
  },
  setup(props, { emit }) {
    // Overlay
    const manageOrderItemCarrierOverlay = ref();
    const isOverlayOpen = computed(
      () => manageOrderItemCarrierOverlay.value.visible
    );
    const toggleOverlay = async (event: MouseEvent) => {
      // Set default values
      try {
        loadingShipment.value = true;
        manageOrderItemCarrierOverlay.value.toggle(event);

        orderItemShipment.value = (
          await fetchOrderItemShipment(
            props.orderItem.producerProduct.producer!.user.id,
            props.order.id,
            props.orderItem.producerProduct.id
          )
        ).data;

        if (orderItemShipment.value?.carrier) {
          carrierChanged({ value: orderItemShipment.value?.carrier });
          carrier.searchQuery.value =
            orderItemShipment.value?.carrier.licensePlate;
        }
      } finally {
        loadingShipment.value = false;
      }
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
        carrier: {} as Carrier,
      },
    });

    const orderItemShipment = ref<Shipment | null>(null);
    const loadingShipment = ref(true);

    // Carrier
    const isCarrierQueryValid: ComputedRef<boolean> = computed(() => {
      return carrier.searchQuery.value.length >= 3;
    });

    // Search the carriers
    const searchCarriers = async () => {
      carrier.items.value = (
        await fetchAllProductionUnitCarriers(
          props.orderItem.producerProduct.producer!.user.id,
          props.orderItem.producerProduct.productionUnit!.id,
          { status: 'Available', search: carrier.searchQuery.value }
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
      let preventClose = false;

      // Submit
      try {
        const shipment = (
          await associateOrderItemShipment(
            props.orderItem.producerProduct.producer!.user.id,
            props.orderItem.producerProduct.productionUnit!.id,
            values.carrier.id,
            orderItemShipment.value!.id
          )
        ).data;

        // Timeout so we can finalize the component before it being destroyed... 300 should be fine :)
        setTimeout(() => emit('orderItemCarrierAssigned', shipment), 300);

        toast.add({
          severity: 'success',
          summary: 'Produto encomendado associado a um veículo com sucesso',
          detail: `O produto <b>${
            props.orderItem.producerProduct.productSpec!.name
          }</b> encomendado foi associado ao veículo <b>${
            values.carrier.licensePlate
          }</b> com sucesso.`,
          life: 10000,
        });

        // Reset form
        resetForm();
        carrier.searchQuery.value = '';
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
          toast.add({
            severity: 'error',
            summary: 'Veículo indisponível',
            detail: `O veículo <b>${values.carrier.licensePlate}</b> não está disponível para transportar o produto encomendado.<br/>`,
            life: 10000,
          });

          preventClose = true;
        } else {
          toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Ocorreu um erro ao associar o produto encomendado, por favor tente novamente.<br/>${
              (error as Error).message
            }`,
            life: 10000,
          });
        }

        preventClose = true;
      }

      // Enable submitting
      submitting.value = false;

      // Close overlay
      if (preventClose) return;
      setTimeout(closeOverlay, 100);
    });

    return {
      // Default shipment
      loadingShipment,
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

<style scoped>
.botao2 {
  padding: 0.6em;
  border-radius: 0.8em;
  border: 2px solid #f3f3f3;
}
.botao2:hover {
  background-color: #f3f3f3 !important;
  border: 2px solid #f3f3f3 !important;
}

@media (max-width: 768px) {
  .botao2 {
    font-size: 0.7em;
  }
}
</style>
