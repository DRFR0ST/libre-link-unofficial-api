import { LibreUser } from "./types";

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