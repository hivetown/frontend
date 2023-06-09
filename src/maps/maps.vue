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

<!-- <script>
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
</script> -->

<script>
import { onMounted, ref, watch } from 'vue';
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
    let mapInstance = null;

    onMounted(async () => {
      try {
        await updateMap(props.selectedUnit);
      } catch (error) {
        console.error('Error updating map:', error);
      }
    });

    watch(
      () => props.selectedUnit,
      async (newUnit, oldUnit) => {
        try {
          if (newUnit !== oldUnit) {
            await updateMap(newUnit);
          }
        } catch (error) {
          console.error('Error updating map:', error);
        }
      }
    );

    async function updateMap(unit) {
      try {
        if (mapInstance) {
          mapInstance.remove();
        }

        mapboxgl.accessToken =
          'pk.eyJ1IjoiaGl2ZXRvd24iLCJhIjoiY2xpbmI5NmJ1MHF5cjNtcGpsMnZibjdtZSJ9.76vplIvkyBQogSglqzp0Uw';

        mapInstance = new mapboxgl.Map({
          container: mapContainer.value,
          style: 'mapbox://styles/mapbox/streets-v11',
          center: [unit.address.longitude, unit.address.latitude],
          zoom: 8,
        });

        // Add markers, layers, etc. to the map as needed
      } catch (error) {
        console.error('Error updating map:', error);
      }
    }

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
