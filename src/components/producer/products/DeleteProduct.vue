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
import PrimeButton from 'primevue/button';
import ConfirmPopup from 'primevue/confirmpopup';
import Toast from 'primevue/toast';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';
export default {
  components: {
    PrimeButton,
    Toast,
    ConfirmPopup,
  },
  setup() {
    const confirm = useConfirm();
    const toast = useToast();

    const confirmDeleteProduct = (event: any) => {
      confirm.require({
        target: event.currentTarget,
        message: 'Tem a certeza que quer eliminar este produto?',
        icon: 'pi pi-info-circle',
        acceptClass: 'p-button-danger',
        accept: () => {
          toast.add({
            severity: 'success',
            summary: 'Produto eliminado',
            detail: 'O produto foi eliminado com sucesso',
            life: 3000,
          });
        },
        reject: () => {
          toast.add({
            severity: 'info',
            summary: 'Produto não eliminado',
            detail: 'O produto não foi eliminado',
            life: 3000,
          });
        },
      });
    };

    return {
      confirmDeleteProduct,
    };
  },
};
</script>
