<!-- TODO: Dummy because i'm missing the products list page -->
<template>
  <h1>DUMMY PAGE!</h1>

  <div class="p-3">
    <ManageOrderItemCarrier method="create" :order-item="orderItem" />
  </div>
</template>

<script lang="ts">
import ManageOrderItemCarrier from '@/components/producer/orders/ManageOrderItemCarrier.vue';
import { OrderItem, ProductSpec, ProductionUnit } from '@/types';
import { fetchProducerProductionUnits, fetchAllProducts } from '@/api';
import { onMounted, ref } from 'vue';
export default {
  components: {
    ManageOrderItemCarrier,
  },
  setup() {
    onMounted(() => {
      // TODO DEMO, remove this
      //   Click the showProductFinderOverlayButton button
      //   setTimeout(() => {
      //     document.getElementById('showProductFinderOverlayButton')!.click();
      //   }, 1000);
    });

    // TODO: DEMO OF USING DEFAULT ORDER ITEM
    const DEMOdefaultOrderItem = ref({} as OrderItem);

    fetchAllOrdersProducer(1).then((res) => {
      DEMOdefaultOrderItem.value = res.data.items[0];
    });

    fetchAllProducts().then((res) => {
      DEMOdefaultProductSpec.value = res.data.items[0];
    });

    return {
      DEMOdefaultProductionUnit: DEMOdefaultOrderItem,
      DEMOdefaultProductSpec,
    };
  },
};
</script>
