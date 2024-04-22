import { expect, test, beforeEach, describe } from "bun:test";
import { LibreLinkClient } from '../src';
import { mapObjectPropertiesToTypes } from "./utils";

describe('LibreLinkClient', () => {
  let client: LibreLinkClient = new LibreLinkClient();;

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
    const { data } = await client.read();

    expect(data).toBeTruthy();
    expect(mapObjectPropertiesToTypes(data!)).toMatchSnapshot();
  });
});