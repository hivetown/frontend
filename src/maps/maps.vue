<template>
  <MapboxMap
    style="height: 400px"
    access-token="pk.eyJ1IjoiaGl2ZXRvd24iLCJhIjoiY2xpbmI5NmJ1MHF5cjNtcGpsMnZibjdtZSJ9.76vplIvkyBQogSglqzp0Uw"
    map-style="mapbox://styles/mapbox/streets-v11"
    :center="mapCenter"
    :zoom="1"
  />
</template>

<!-- <script setup lang="ts">
import { ref } from 'vue';

// Using 'any' type for MapboxMap
let MapboxMap: any = null;
import('@studiometa/vue-mapbox-gl').then((module) => {
  MapboxMap = module.MapboxMap;
});

const mapCenter = ref([0, 0]);

onMounted(async () => {
  mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: mapCenter.value,
    zoom: 1,
  });

  try {
    const mapData = await fetchMapData();
    // Process and use the map data as needed
    console.log(mapData);
  } catch (error) {
    console.error('Error fetching map data:', error);
  }
});

async function fetchMapData() {
  try {
    const response = await axios.get('/api/map-data');
    return response.data; // Assuming the map data is returned in the response's data property
  } catch (error) {
    throw new Error('Error fetching map data');
  }
}

function onMounted(arg0: () => Promise<void>) {
throw new Error('Function not implemented.');
}
</script>

<style scoped>
#map {
  height: 400px;
}
</style> -->

<script lang="ts">
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
</script>

<style scoped>
#map {
  height: 400px;
}
</style>
