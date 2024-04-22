
const LIBRE_LINK_API_URL = process?.env?.LIBRE_LINK_API_URL ?? "https://api-us.libreview.io";
const LIBRE_LINK_EMAIL = process?.env?.LIBRE_LINK_EMAIL;
const LIBRE_LINK_PASSWORD = process?.env?.LIBRE_LINK_PASSWORD;
const LIBRE_LINK_UP_VERSION = process?.env?.LIBRE_LINK_UP_VERSION ?? "4.7.0";
const VERBOSE = process?.env?.VERBOSE === "true";

/**
 * @description Configuration for the Libre Link Up API client.
 */
export const config = Object.freeze({
    apiUrl: LIBRE_LINK_API_URL,
    credentials: {
        email: LIBRE_LINK_EMAIL,
        password: LIBRE_LINK_PASSWORD
    },
    lluVersion: LIBRE_LINK_UP_VERSION,
    verbose: VERBOSE
});