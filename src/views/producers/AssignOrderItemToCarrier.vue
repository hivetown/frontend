<!-- TODO: Dummy because i'm missing the products list page -->
<template>
  <h1>DUMMY PAGE!</h1>

  <div class="p-3">
    <ManageOrderItemCarrier
      method="create"
      v-if="DEMOdefaultOrderItem?.producerProduct && DEMOdefaultOrder?.id"
      :order-item="DEMOdefaultOrderItem"
      :order-id="DEMOdefaultOrder.id"
    />
  </div>
</template>

<script lang="ts">
import ManageOrderItemCarrier from '@/components/producer/orders/ManageOrderItemCarrier.vue';
import { OrderItem, OrderProducer } from '@/types';
import { fetchAllOrdersProducer, fetchAllItemsProducer } from '@/api/orders';
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
    const DEMOdefaultOrder = ref({} as OrderProducer);
    const DEMOdefaultOrderItem = ref({} as OrderItem);

    fetchAllOrdersProducer(1, 1, 24).then((res) => {
      DEMOdefaultOrder.value = res.data.items.find((o) => o.id === 3145)!;

      fetchAllItemsProducer(1, '3145').then((res) => {
        DEMOdefaultOrderItem.value = res.data.items[0];
      });
    });

    return {
      DEMOdefaultOrderItem,
      DEMOdefaultOrder,
    };
  },
};
</script>
