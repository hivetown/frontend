<template>
  <Toast />
  <ConfirmPopup group="deleteProducerProduct">
    <template #message="slotProps">
      <div class="flex p-4">
        <i :class="slotProps.message.icon" style="font-size: 1.5rem"></i>
        <p class="pl-2">{{ slotProps.message.message }}</p>
      </div>
    </template>
  </ConfirmPopup>

  <PrimeButton
    icon="pi pi-trash"
    severity="danger"
    aria-label="Eliminar produto"
    @click="confirmDeleteProduct"
  />
</template>

<script lang="ts">
import { Product } from '@/types';
import { deleteProducerProduct } from '@/api';
import PrimeButton from 'primevue/button';
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
import { PropType } from 'vue';
import { AxiosError } from 'axios';
export default {
  components: {
    PrimeButton,
    Toast,
    ConfirmPopup,
  },
  props: {
    producerProduct: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup(props) {
    const confirm = useConfirm();
    const toast = useToast();

    const confirmDeleteProduct = (event: any) => {
      console.log(event.currentTarget);
      confirm.require({
        target: event.currentTarget,
        group: 'deleteProducerProduct',
        message: `Tem a certeza que quer eliminar o produto "${
          props.producerProduct.productSpec!.name
        }"?`,
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        acceptLabel: 'Sim, eliminar',
        rejectLabel: 'Não',
        accept: async () => {
          try {
            // TODO typings are a bit weird
            const producerId = props.producerProduct
              .producer as unknown as number;

            const productId = props.producerProduct.id;
            await deleteProducerProduct(producerId, productId);

            toast.add({
              severity: 'success',
              summary: 'Produto eliminado',
              detail: 'O produto foi eliminado com sucesso',
              life: 3000,
            });
          } catch (error) {
            if (error instanceof AxiosError) {
              if (error.response?.status === 404) {
                toast.add({
                  severity: 'warn',
                  summary: 'Erro ao eliminar produto',
                  detail: 'O produto já não existe',
                  life: 3000,
                });

                return;
              }
            }

            // Catch all
            toast.add({
              severity: 'error',
              summary: 'Erro ao eliminar produto',
              detail: 'Ocorreu um erro ao eliminar o produto',
              life: 3000,
            });
          }
        },
      });
    };

    return {
      confirmDeleteProduct,
    };
  },
};
</script>
