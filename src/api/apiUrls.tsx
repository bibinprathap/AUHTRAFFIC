const baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5300'
const roadsBaseUrl = `https://roads.googleapis.com`
const mapsBaseUrl = `https://maps.googleapis.com`
const key = `AIzaSyCqt7wBbO1QHM051rvUWHKozaDi8Zcq4PQ`

export const API = {
  getData: baseUrl + '/queryData',
  mapSpeed: roadsBaseUrl + '/v1/speedLimits',
  mapDistance: (destinations, origins) =>
    `https://cors-anywhere.herokuapp.com/${mapsBaseUrl}/maps/api/distancematrix/json?destinations=${destinations}&origins=${origins}&units=imperial&key=${key}&mode=driving&units=metric&departure_time=now&traffic_model=best_guess`,
}
