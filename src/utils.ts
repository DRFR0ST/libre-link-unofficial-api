import { RawGlucoseReading, LibreUser, GlucoseReading, MeasurementColor, LibreConnection } from "./types";

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
 * @description Parse a glucose item.
 * @param item The raw glucose item coming from the server to parse.
 * @param connection The connection object to use for parsing. Used for calculating isHigh and isLow.
 * @returns The parsed glucose item.
 */
export const parseGlucoseItem = (item: RawGlucoseReading, connection: LibreConnection): GlucoseReading => {
    const isHigh = connection.targetHigh < item.Value;
    const isLow = connection.targetLow > item.Value;

    return {
        timestamp: new Date(item.Timestamp),
        value: item.Value,
        measurementColor: item.MeasurementColor as MeasurementColor,
        isHigh,
        isLow,
    };
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