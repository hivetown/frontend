<!-- TODO: Dummy because i'm missing the products list page -->
<template>
  <h1>DUMMY PAGE!</h1>

  <div class="p-3">
    <ManageProduct
      :default-product-spec="DEMOdefaultProductSpec"
      :default-production-unit="DEMOdefaultProductionUnit"
      :default-price="400"
      :default-stock="100"
      :default-production-date="new Date()"
      method="create"
      :producer-product-id="54721"
    />
  </div>

  <!-- <div class="p-3">
    <DeleteProduct :producer-product="producerProduct" />
  </div> -->
</template>

<script lang="ts">
import ManageProduct from '@/components/producer/products/ManageProduct.vue';
import { ProductSpecification, ProductionUnit } from '@/types';
import { fetchAllProductionUnits, fetchAllProducts } from '@/api';
import { onMounted, ref } from 'vue';
export default {
  components: {
    ManageProduct,
  },
  setup() {
    onMounted(() => {
      // TODO DEMO, remove this
      //   Click the showProductFinderOverlayButton button
      //   setTimeout(() => {
      //     document.getElementById('showProductFinderOverlayButton')!.click();
      //   }, 1000);
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
      DEMOdefaultProductionUnit,
      DEMOdefaultProductSpec,
    };
  },
};
</script>
