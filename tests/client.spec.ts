import { expect, test, afterEach, describe } from "bun:test";
import { GlucoseReading, LibreLinkClient } from '../src';
import { LibreLinkConnectionsMock, LibreLinkLoginMock, LibreLinkReadMock } from './mocks';
import {  clearMockFetch, mockFetch } from "./utils";

describe('LibreLinkClient', () => {
  const client: LibreLinkClient = new LibreLinkClient();

  afterEach(() => {
    // Clear pending mocks after each test
    clearMockFetch();
  });
  
  test('should be created', () => {
    expect(client).toBeTruthy();
  });

  test('should successfully login', async () => {
    // Mock the fetch method
    mockFetch('llu/auth/login', LibreLinkLoginMock);

    await client.login();

    expect(client.me).toBeTruthy();
  });

  test('should successfully fetch connections', async () => {
    // Mock the fetch method
    mockFetch('llu/connections', LibreLinkConnectionsMock.data);

    const { data } = await client.fetchConnections();

    expect(data).toBeTruthy();
  });

  test('should successfully read data', async () => {
    // Mock the fetch method
    mockFetch('llu/connections', LibreLinkConnectionsMock.data);
    mockFetch(`llu/connections/*/graph`, LibreLinkReadMock);
    
    const data = await client.read();

    expect(data).toBeTruthy();
  });

  // TODO: Implement unit tests for client.history method.
  test.todo('should return the history');

  test('should successfully stream data', async () => {
    // Mock the fetch method
    mockFetch('llu/connections', LibreLinkConnectionsMock.data);
    mockFetch(`llu/connections/*/graph`, LibreLinkReadMock);

    const stream = client.stream(1000);

    const readings: GlucoseReading[] = [];

    for await (const reading of stream) {
      expect(reading).toBeTruthy();
      expect(reading.value).toBeTruthy();
      expect(reading._raw).toBeTruthy();

      readings.push(reading);
      if (readings.length === 5) break;
    }

    expect(readings.length).toBe(5);
  });
});