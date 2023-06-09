<template>
  <MapboxMap
    style="height: 400px"
    access-token="pk.eyJ1IjoiaGl2ZXRvd24iLCJhIjoiY2xpbmI5NmJ1MHF5cjNtcGpsMnZibjdtZSJ9.76vplIvkyBQogSglqzp0Uw"
    map-style="mapbox://styles/mapbox/streets-v11"
    :center="mapCenter"
    :zoom="14"
  />
</template>

<!-- <script lang="ts">
import { ref, onMounted } from 'vue';
import { MapboxMap } from '@studiometa/vue-mapbox-gl';
import axios from 'axios';
import { fetchMapForUnit } from './maps';

export default {
  // Component options...
  setup() {
    const mapCenter = ref([0, 0]);

    onMounted(async () => {
      try {
        const mapData = await fetchMapForUnit(
          mapCenter.value[1], // Pass the latitude value
          mapCenter.value[0] // Pass the longitude value
        );
        // Process and use the map data as needed
        console.log(mapData);
      } catch (error) {
        console.error('Error fetching map data:', error);
      }
    });

    return {
      mapCenter,
    };
  },
};
</script> -->
<script lang="ts">
import { onMounted, PropType } from 'vue';
import { fetchMapForUnit } from './maps';

export default {
  props: {
    selectedUnit: {
      type: Object as PropType<any>,
      required: true,
    },
  },
  setup(props) {
    onMounted(async () => {
      try {
        const mapData = await fetchMapForUnit(
          props.selectedUnit.latitude, // Pass the latitude value of the selected unit
          props.selectedUnit.longitude // Pass the longitude value of the selected unit
        );
        // Process and use the map data as needed
        console.log(mapData);
      } catch (error) {
        console.log('selectedUnit', props.selectedUnit);
        console.error('Error fetching map data:', error);
      }
    });

    return {};
  },
};
</script>
<style scoped>
#map {
  height: 400px;
}
</style>
