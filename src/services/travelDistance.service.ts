import { LocationTracking } from "../models/LocationTracking";
import mapboxService from "./mapbox.service";
import { parseLatLng } from "../utils/latlng";

class TravelDistanceService {
    async calculateSequentialDistances(date: string) {
        const rows = await LocationTracking.findAll({
            where: { task_date: date },
            order: [["user_id", "ASC"], ["id", "ASC"]],
        });

        let results: any[] = [];

        // Group rows per user
        const userGroups: Record<number, any[]> = {};

        rows.forEach((row:any) => {
            if (!userGroups[row.user_id]) userGroups[row.user_id] = [];
            userGroups[row.user_id].push(row);
        });

        // For each user, do the checkin → next checkout mapping
        for (const userId in userGroups) {
            const userRows = userGroups[userId];

            for (let i = 0; i < userRows.length; i++) {
            const current = userRows[i];
            const next = userRows[(i + 1) % userRows.length];  // wrap to first

            const origin = parseLatLng(current.checkin_lat_lng);
            const destination = parseLatLng(next.checkout_lat_lng);

            // Skip invalid lat/lng
            if (
                origin.lat === 0 ||
                origin.lng === 0 ||
                destination.lat === 0 ||
                destination.lng === 0
            ) {
                continue;
            }

            // Calculate via Mapbox
            const distance = await mapboxService.getDistance(origin, destination);

            // Update row
            await next.update({ total_distance: distance.kms, estimated_time: distance.eta });

            results.push({
                id: next.id,
                user_id: current.user_id,
                from: origin,
                to: destination,
                distance: distance.kms,
                estimate: distance.eta,
            });
            }
        }

        return results;
    }

}

export default new TravelDistanceService();
