import { expect, test, beforeEach, describe } from "bun:test";
import { LibreLinkClient } from '../src';
import { mapObjectPropertiesToTypes } from "./utils";

describe('Libre Link Up API Integrity', () => {
  const client: LibreLinkClient = new LibreLinkClient();

  // Wait for a couple of seconds between tests to avoid 429 too many requests errors.
  beforeEach(() => new Promise((resolve) => setTimeout(resolve, 5000)));

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
    expect(typeof data.value).toBe("number");
    expect(data.timestamp instanceof Date).toBe(true);
    expect(mapObjectPropertiesToTypes(data!)).toMatchSnapshot();
  });
});