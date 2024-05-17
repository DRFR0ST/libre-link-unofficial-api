import { expect, test, afterEach, mock, describe } from "bun:test";
import { LibreLinkClient } from '../src';
import { config } from '../src/config';
import { LibreLinkUpEndpoints } from '../src/types';
import { LibreLinkConnectionsMock, LibreLinkLoginMock } from './mocks';
import { clearMockFetch, mockFetch } from "./utils";

const API_URL = config.apiUrl;


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
    mockFetch(LibreLinkLoginMock);

    await client.login();

    expect(client.me).toBeTruthy();
  });

  test('should successfully fetch connections', async () => {
    // Mock the fetch method
    mockFetch(LibreLinkConnectionsMock);

    const { data } = await client.fetchConnections();

    expect(data).toBeTruthy();
  });

  // test('should successfully read data', async () => {
  //   mockFetch(LibreLinkReadMock);
    
  //   const data = await client.read();

  //   expect(data).toBeTruthy();
  //   expect(scope.isDone()).toBe(true);
  // });
});