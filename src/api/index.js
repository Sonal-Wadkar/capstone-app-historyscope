//all api calls

import axios from 'axios';

//const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary';
export const getPlacesData = async (type, sw,ne) => {
    try {
        //request
        const { data: { data }} = await axios.get('https://travel-advisor.p.rapidapi.com/${type}list-in-boundary', {
            params: {
              bl_latitude: sw.lat,
              tr_latitude: ne.lat,
              bl_longitude: sw.lng,
              tr_longitude: ne.lng,
            },
            headers: {
              'x-rapidapi-key': '7d4e281259mshf28ccef2a620176p163dffjsne5160f9a6bfd',
              'x-rapidapi-host': 'travel-advisor.p.rapidapi.com'
            }
          });
        return data;
    } catch (error) {
        console.log(error);
    }
}