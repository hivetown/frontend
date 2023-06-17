import axios from 'axios';
export async function fetchMapForUnit(latitude: number, longitude: number) {
    try {
        const proximity = `${longitude},${latitude}`;
        const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/peets.json?proximity=${proximity}&access_token=pk.eyJ1IjoiaGl2ZXRvd24iLCJhIjoiY2xpbmFndGdhMHFwdDNmcGpxcWN4cTRjaSJ9.rulJyCsFGx-uU5H8nsPYnQ`;

        const response = await axios.get(url);
        return response.data; // Assuming the map data is returned in the response's data property
    } catch (error) {
        throw new Error('Error fetching map data');
    }
}
