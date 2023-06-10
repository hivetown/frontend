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
import { useStore } from '@/store';
import { fetchConsumerLocation } from '@/api/consumerLocation';

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
    let marker = null;

    const store = useStore();
    const userType = store.state.user.user.type;
    const userId = store.state.user.user.id;
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
        mapInstance.on('load', async () => {
          console.log('Map style loaded');
          marker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([unit.address.longitude, unit.address.latitude])
            .addTo(mapInstance);

          if (userType === 'CONSUMER') {
            const consumerLocation = await fetchConsumerLocation(userId);
            console.log(
              'consumerLocation',
              consumerLocation.data.items[0].latitude
            );
            const locationData = consumerLocation.data.items[0];
            new mapboxgl.Marker({ color: 'blue' })
              .setLngLat([locationData.longitude, locationData.latitude])
              .addTo(mapInstance);

            const lineCoordinates = [
              [locationData.longitude, locationData.latitude],
              [unit.address.longitude, unit.address.latitude],
            ];
            mapInstance.addLayer({
              id: 'dashed-line',
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  geometry: {
                    type: 'LineString',
                    coordinates: lineCoordinates,
                  },
                },
              },
              paint: {
                'line-color': 'blue',
                'line-width': 2,
                'line-dasharray': [2, 2],
              },
            });
          }
        });
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
