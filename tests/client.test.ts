import { expect, test, beforeEach, describe } from "bun:test";
import { LibreLinkClient } from '../src';
import { mapObjectPropertiesToTypes } from "./utils";

describe('LibreLinkClient', () => {
  const client: LibreLinkClient = new LibreLinkClient();

  // Wait for a couple of seconds between tests to avoid 429 too many requests errors.
  beforeEach(() => new Promise((resolve) => setTimeout(resolve, 5000)));

  test('should be created', () => {
    expect(client).toBeTruthy();
  });

  test('should successfully login', async () => {
    await client.login();

    expect(client.me).toBeTruthy();
    expect(mapObjectPropertiesToTypes(client.me)).toMatchSnapshot();
  });

  test('should successfully fetch connections', async () => {
    const { data } = await client.fetchConnections();

    expect(data).toBeTruthy();
    expect(mapObjectPropertiesToTypes(data!)).toMatchSnapshot();
  });

  test('should successfully read data', async () => {
    const data = await client.read();

    expect(data).toBeTruthy();
    expect(mapObjectPropertiesToTypes(data!)).toMatchSnapshot();
  });

  test('should initialize with a patientId', async () => {
    const customClient = new LibreLinkClient({ patientId: "7f51ab27-c7c8-11ed-bcc3-0242ac110002" });

    await customClient.login();

    expect(customClient.me).toBeTruthy();
  });

  test('should throw error with an invalid patientId', async () => {
    const customClient = new LibreLinkClient({ patientId: "invalid-patient-id" });

    try {
      await customClient.login();
    } catch(err) {
      expect(err).toBeTruthy();
      expect(err.message).toMatch(/(Patient ID not found in connections. (invalid-patient-id))/i);
    }
  });
});