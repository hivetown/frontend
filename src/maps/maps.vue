<template>
  <div>
    <div ref="mapContainer" style="height: 400px"></div>
    <p v-if="userType === 'CONSUMER'" class="distance-text">
      A <span class="distance-value">{{ distance }}</span> km de si
    </p>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch, computed } from 'vue';
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
    const userType = store.state.user?.user.type;
    const userId = store.state.user?.user.id;
    const distance = ref('');
    onMounted(async () => {
      try {
        console.log('props.selectedUnit', props.selectedUnit);
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
          marker = new mapboxgl.Marker({ color: 'red' })
            .setLngLat([unit.address.longitude, unit.address.latitude])
            .addTo(mapInstance);

          if (userType === 'CONSUMER') {
            console.log('userId', userId);
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

            const earthRadius = 6371; // in kilometers
            const lat1 = locationData.latitude;
            const lon1 = locationData.longitude;
            const lat2 = unit.address.latitude;
            const lon2 = unit.address.longitude;

            const dLat = ((lat2 - lat1) * Math.PI) / 180;
            const dLon = ((lon2 - lon1) * Math.PI) / 180;
            const a =
              Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            const distanceValue = earthRadius * c;

            distance.value = distanceValue.toFixed(2);
          }
        });
      } catch (error) {
        console.error('Error updating map:', error);
      }
    }

    return {
      mapContainer,
      userType,
      distance,
    };
  },
};
</script>

<style scoped>
@import 'mapbox-gl/dist/mapbox-gl.css';
#map {
  height: 400px;
}

.distance-text {
  font-size: 18px;
  font-weight: bold;
}

.distance-value {
  color: rgb(0, 47, 255);
}
</style>
