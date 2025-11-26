import axios from "axios";

class MapboxService {
  async getDistance(
    origin: { lat: number; lng: number },
    destination: { lat: number; lng: number }
  ): Promise<{kms: number, eta: string}> {
    const token = process.env.MAPBOX_ACCESS_TOKEN;

    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?access_token=${token}`;

    const res = await axios.get(url);
    const meters = res.data.routes[0].distance;
    const seconds = res.data.routes[0].duration;
    return {kms: parseFloat((meters / 1000).toFixed(2)), eta: this.formatHourMinuteSeconds(seconds)};
  }

  formatHourMinuteSeconds(totalSeconds: number) {
    const hh = Math.floor(totalSeconds / 3600),
    mm = Math.floor((totalSeconds % 3600) / 60),
    ss = Math.floor(totalSeconds % 60);

    const hours = hh.toString().padStart(2, '0'),
    minutes = mm.toString().padStart(2, '0'),
    seconds = ss.toString().padStart(2, '0');

    return `${hours}:${minutes}:${seconds}`;
  }
}

export default new MapboxService();
