<!-- TODO: Dummy because i'm missing the products list page -->
<template>
  <h1>DUMMY PAGE!</h1>

  <!-- <PrimeButton
    id="showProductFinderOverlayButton"
    label="Create Product"
    icon="pi pi-plus"
    @click="toggleOverlay"
  />

  <OverlayPanel ref="showProductFinderOverlay">
    <ManageProduct
      :default-product-spec="DEMOdefaultProductSpec"
      :default-production-unit="DEMOdefaultProductionUnit"
      :default-price="400"
      :default-stock="100"
      :default-production-date="new Date()"
      method="update"
      :producer-product-id="54721"
    />
  </OverlayPanel> -->

  <div class="p-3">
    <DeleteProduct />
  </div>
</template>

<script lang="ts">
import ManageProduct from '@/components/producer/products/ManageProduct.vue';
import DeleteProduct from '@/components/producer/products/DeleteProduct.vue';
import { ProductSpecification, ProductionUnit } from '@/types';
import { fetchAllProductionUnits, fetchAllProducts } from '@/api';
import PrimeButton from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import { onMounted, ref } from 'vue';
export default {
  components: {
    ManageProduct,
    PrimeButton,
    OverlayPanel,
    DeleteProduct,
  },
  setup() {
    const showProductFinderOverlay = ref();

    const toggleOverlay = (event: any) => {
      showProductFinderOverlay.value.toggle(event);
    };

    onMounted(() => {
      // TODO DEMO, remove this
      //   Click the showProductFinderOverlayButton button
      setTimeout(() => {
        document.getElementById('showProductFinderOverlayButton')!.click();
      }, 1000);
    });

    // TODO: DEMO OF USING DEFAULT PRODUCTION UNIT
    const DEMOdefaultProductionUnit = ref({} as ProductionUnit);
    const DEMOdefaultProductSpec = ref({} as ProductSpecification);

    fetchAllProductionUnits(1).then((res) => {
      DEMOdefaultProductionUnit.value = res.data.items[0];
    });

    fetchAllProducts().then((res) => {
      DEMOdefaultProductSpec.value = res.data.items[0];
    });

    return {
      showProductFinderOverlay,
      toggleOverlay,
      DEMOdefaultProductionUnit,
      DEMOdefaultProductSpec,
    };
  },
};
</script>
