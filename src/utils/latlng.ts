export function parseLatLng(value: string) {
  if (!value || value === "0.0000,0.0000") {
    return { lat: 0, lng: 0 };
  }

  const [lat, lng] = value.split(",").map(Number);
  return { lat, lng };
}
