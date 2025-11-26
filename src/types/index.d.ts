export interface LatLng {
  lat: number;
  lng: number;
}

export interface DistanceRequestBody {
  origin: LatLng;
  destination: LatLng;
}