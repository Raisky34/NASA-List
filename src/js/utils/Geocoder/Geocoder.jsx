import axios from 'axios/index'

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const DEFAULT_LAT = 0;
const DEFAULT_LNG = 0;

export default {
  addressToCoordinates: (addressString, onSuccess) => {
    return axios({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${addressString}&key=${GOOGLE_API_KEY}`,
      method: "GET",
    }).then((resp) => {
      return resp.data.results[0].geometry.location;
    }).catch(() => {
      return {
        lat: DEFAULT_LAT,
        lng: DEFAULT_LNG,
      };
    });
  }
}
