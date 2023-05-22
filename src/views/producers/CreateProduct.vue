<!-- TODO: Dummy because i'm missing the products list page -->
<template>
  <h1>DUMMY PAGE!</h1>

  <PrimeButton
    id="showProductFinderOverlayButton"
    label="Create Product"
    icon="pi pi-plus"
    @click="toggleOverlay"
  />

  <OverlayPanel ref="showProductFinderOverlay">
    <CreateProduct />
  </OverlayPanel>
</template>

<script lang="ts">
import CreateProduct from '@/components/producer/products/CreateProduct.vue';
import PrimeButton from 'primevue/button';
import OverlayPanel from 'primevue/overlaypanel';
import { onMounted, ref } from 'vue';
export default {
  components: {
    CreateProduct,
    PrimeButton,
    OverlayPanel,
  },
  setup() {
    const showProductFinderOverlay = ref();

    const toggleOverlay = (event: any) => {
      showProductFinderOverlay.value.toggle(event);
    };

    onMounted(() => {
      // TODO remove this
      //   Click the showProductFinderOverlayButton button
      setTimeout(() => {
        document.getElementById('showProductFinderOverlayButton')!.click();
      }, 50);
    });

    return {
      showProductFinderOverlay,
      toggleOverlay,
    };
  },
};
</script>
