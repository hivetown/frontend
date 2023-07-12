<template>
  <ConfirmPopup group="setCarrierForDelivery">
    <template #message="slotProps">
      <div class="flex p-4">
        <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
        <p class="pl-2">{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmPopup>

  <BButton
    class="botao2"
    variant="outline-primary"
    @click="confirmSetForDelivery"
    :loading="loading"
    >Registar saída</BButton
  >
</template>

<script lang="ts">
import { createOrderItemShipment } from '@/api';
import ConfirmPopup from 'primevue/confirmpopup';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { PropType, ref } from 'vue';
import { AxiosError } from 'axios';
import { Carrier, OrderItem, Shipment, ShipmentStatus } from '@/types';

export default {
  components: {
    ConfirmPopup,
  },
  props: {
    orderId: {
      type: Number,
      required: true,
    },
    orderItem: {
      type: Object as PropType<OrderItem>,
      required: true,
    },
    carrier: {
      type: Object as PropType<Carrier>,
      required: true,
    },
  },
  emits: {
    // eslint-disable-next-line no-unused-vars
    carrierInDelivery: (shipment: Shipment) => true,
  },
  setup(props, { emit }) {
    const confirm = useConfirm();
    const toast = useToast();
    const loading = ref(false);

    const confirmSetForDelivery = (event: any) => {
      confirm.require({
        target: event.currentTarget,
        group: 'setCarrierForDelivery',
        message: `Tem a certeza que quer iniciar a entrega do veículo "${props.carrier.licensePlate}"?`,
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-warning',
        acceptLabel: 'Sim, iniciar',
        rejectLabel: 'Não',
        accept: async () => {
          try {
            loading.value = true;
            const producerId =
              props.orderItem.producerProduct.producer!.user.id;
            const producerProductId = props.orderItem.producerProduct.id;
            // Typings am i right???!!!
            const addressId = props.orderItem.producerProduct.productionUnit!
              .address as unknown as number;

            const shipment = (
              await createOrderItemShipment(
                producerId,
                props.orderId,
                producerProductId,
                ShipmentStatus.Shipped,
                addressId
              )
            ).data;

            emit('carrierInDelivery', shipment);

            toast.add({
              severity: 'success',
              summary: 'Veículo em deslocação',
              detail: `O veículo ${props.carrier.licensePlate} foi registado como em saída para entrega`,
              life: 3000,
            });
          } catch (error) {
            let errorMessage = 'Erro desconhecido';
            if (error instanceof AxiosError) {
              errorMessage = error.response?.data.message || error.message;
            }

            // Catch all
            toast.add({
              severity: 'error',
              summary: 'Erro ao registar saída de veículo',
              detail: `Ocorreu um erro ao registar a saída do veículo para entrega: ${errorMessage}`,
              life: 3000,
            });
          } finally {
            loading.value = false;
          }
        },
      });
    };

    return {
      confirmSetForDelivery,
      loading,
    };
  },
};
</script>

<style scoped>
.p-button-danger {
  color: #5a5a5a !important;
  border: 1px solid #5a5a5a !important;
  border-radius: 50% !important;
  background-color: white !important;
}

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
