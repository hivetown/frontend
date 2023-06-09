<!-- <template>
  <MapboxMap
    style="height: 400px"
    access-token="pk.eyJ1IjoiaGl2ZXRvd24iLCJhIjoiY2xpbmI5NmJ1MHF5cjNtcGpsMnZibjdtZSJ9.76vplIvkyBQogSglqzp0Uw"
    map-style="mapbox://styles/mapbox/streets-v11"
    :center="getMapCenter()"
    :zoom="14"
  />
</template> -->

<template>
  <div>
    <div ref="mapContainer" style="height: 400px"></div>
  </div>
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
<!-- <script lang="ts">
import { onMounted, PropType } from 'vue';
import { fetchMapForUnit } from './maps';
import mapboxgl from 'mapbox-gl';
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
          props.selectedUnit.address.latitude, // Pass the latitude value of the selected unit
          props.selectedUnit.address.longitude // Pass the longitude value of the selected unit
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
  methods: {
    getMapCenter() {
      return [
        this.selectedUnit.address.longitude,
        this.selectedUnit.address.latitude,
      ];
    },
  },
};
</script> -->
<script>
import { onMounted, ref } from 'vue';
import { fetchMapForUnit } from './maps';
import mapboxgl from 'mapbox-gl';

export default {
  props: {
    selectedUnit: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const mapContainer = ref(null);

    onMounted(async () => {
      try {
        const mapData = await fetchMapForUnit(
          props.selectedUnit.address.latitude,
          props.selectedUnit.address.longitude
        );
        // Process and use the map data as needed
        console.log(mapData);
        console.log(props.selectedUnit.address.latitude);
        console.log(props.selectedUnit.address.longitude);
        // console log props.selectedUnit.address.longitude type 
        console.log(typeof props.selectedUnit.address.longitude);
        mapboxgl.accessToken =
          'pk.eyJ1IjoiaGl2ZXRvd24iLCJhIjoiY2xpbmI5NmJ1MHF5cjNtcGpsMnZibjdtZSJ9.76vplIvkyBQogSglqzp0Uw';
        new mapboxgl.Map({
          container: mapContainer.value,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [
            props.selectedUnit.address.longitude,
            props.selectedUnit.address.latitude,
          ],

          zoom: 1,
        });
        // Add markers, layers, etc. to the map as needed
      } catch (error) {
        console.log('selectedUnit', props.selectedUnit);
        console.error('Error fetching map data:', error);
      }
    });

    return {
      mapContainer,
    };
  },
};
</script>
<style scoped>
@import 'mapbox-gl/dist/mapbox-gl.css';
#map {
  height: 400px;
}
</style>
