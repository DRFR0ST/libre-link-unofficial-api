import { expect, test, beforeEach, describe } from "bun:test";
import { LibreLinkClient } from '../src';
import { mapObjectPropertiesToTypes } from "./utils";

describe('Libre Link Up API Integrity', () => {
  const client: LibreLinkClient = new LibreLinkClient();

  // Wait for a couple of seconds between tests to avoid 429 too many requests errors.
  beforeEach(() => new Promise((resolve) => setTimeout(resolve, 5000)));

  test('should be created', () => {
    expect(client).toBeTruthy();
  });

  test('should successfully login', async () => {
    await client.login();

    const sampleDevice = client.me?.devices[Object.keys(client.me?.devices)[0]];
    const processedMe = { ...client.me!, devices: { "a1b2c3d4-e5f6-1789-9abc-def012345678": sampleDevice } }

    expect(processedMe).toBeTruthy();
    expect(mapObjectPropertiesToTypes(processedMe!)).toMatchSnapshot();
  });

  test('should successfully fetch connections', async () => {
    const { data } = await client.fetchConnections();

    expect(data).toBeTruthy();
    expect(mapObjectPropertiesToTypes(data!)).toMatchSnapshot();
  });

  test('should successfully read data', async () => {
    const glucoseReading = await client.read();

    expect(glucoseReading).toBeTruthy();
    expect(typeof glucoseReading.value).toBe("number");
    expect(glucoseReading.timestamp instanceof Date).toBe(true);
    expect(mapObjectPropertiesToTypes(glucoseReading._raw)).toMatchSnapshot();
  });

  test('should successfully read logbook', async () => {
    const glucoseReadings = await client.logbook();

    expect(glucoseReadings).toBeTruthy();
    if(glucoseReadings.length > 0) {
      expect(glucoseReadings[0]).toBeTruthy();
      expect(typeof glucoseReadings[0].value).toBe("number");
      expect(glucoseReadings[0].timestamp instanceof Date).toBe(true);
    }
  });

  // TODO: Fix the test.
  // test('should initialize with a patientId', async () => {
  //   const customClient = new LibreLinkClient({ patientId: "7f51ab27-c7c8-11ed-bcc3-0242ac110002" });

  //   await customClient.login();

  //   expect(customClient.me).toBeTruthy();
  // });

  // test('should throw error with an invalid patientId', async () => {
  //   const customClient = new LibreLinkClient({ patientId: "invalid-patient-id" });

  //   try {
  //     await customClient.login();
  //   } catch(err) {
  //     expect(err).toBeTruthy();
  //     expect(err.message).toMatch(/(Patient ID not found in connections. (invalid-patient-id))/i);
  //   }
  // });
});