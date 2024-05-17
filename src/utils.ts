import { TREND_MAP } from "./constants";
import { RawGlucoseReading, LibreUser, GlucoseReading, MeasurementColor, LibreConnection, Trend } from "./types";

/**
 * Parse a Libre User object.
 * @param user The user object to parse.
 * @returns The parsed user object.
 */
export const parseUser = (user: Record<string, any>): LibreUser => ({
    ...(user as LibreUser),
    created: parseUnixTimestamp(user.created as unknown as number),
    lastLogin: parseUnixTimestamp(user.lastLogin as unknown as number),
    dateOfBirth: parseUnixTimestamp(user.dateOfBirth as unknown as number),
});

/**
 * @description Parse unix timestamps to Date objects.
 * @param timestamp The unix timestamp to parse.
 * @returns The parsed date.
 */
export const parseUnixTimestamp = (timestamp: number) => new Date(timestamp * 1000);

/**
 * @description Parse a glucose reading.
 * @param rawReading The raw glucose reading coming from the server to parse.
 * @param connection The connection object to use for parsing. Used for calculating isHigh and isLow.
 * @returns The parsed glucose reading.
 */
export const parseGlucoseReading = (rawReading: RawGlucoseReading, connection: LibreConnection): GlucoseReading => {
    // ! Calculates the isHigh and isLow properties based on the targetHigh and targetLow values. The two values coming from Libre Link Up seems to be incorrect.
    const isHigh = connection?.targetHigh < rawReading.Value;
    const isLow = connection?.targetLow > rawReading.Value;
   
    const parsedReading = Object.freeze({
        timestamp: new Date(rawReading.Timestamp),
        value: rawReading.Value,
        measurementColor: rawReading.MeasurementColor as MeasurementColor,
        isHigh,
        isLow,
        trend: getTrend(rawReading.TrendArrow)
    });

    return parsedReading;
}

/**
 * @description Sort by timestamp.
 * @param a The first item to compare.
 * @param b The second item to compare.
 * @returns The comparison result.
 * 
 * @example 
 * .sort(sortByTimestamp)
 */
export const sortByTimestamp = (a: GlucoseReading, b: GlucoseReading) => a.timestamp.getTime() - b.timestamp.getTime();

/**
 * @description Get the trend of a set of glucose readings.
 * @param trend The current trend.
 * @param defaultTrend The default trend to use if trend is undefined.
 */
const getTrend = (trend: number | undefined, defaultTrend: Trend = Trend.Flat) => TREND_MAP[trend!] ?? defaultTrend;