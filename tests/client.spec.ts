import nock from 'nock';
import { expect, test, afterEach, beforeEach, describe } from "bun:test";
import { LibreLinkClient } from '../src';
import { config } from '../src/config';
import { LibreLinkUpEndpoints } from '../src/types';
import { LibreLinkConnectionsMock, LibreLinkLoginMock } from './mocks';

const API_URL = config.apiUrl;

describe('LibreLinkClient', () => {
  const client: LibreLinkClient = new LibreLinkClient();

  // 
  nock.disableNetConnect();

  afterEach(() => {
    nock.cleanAll();  // Clear pending mocks after each test
  });
  
  test('should be created', () => {
    expect(client).toBeTruthy();
  });

  test('should successfully login', async () => {
    const scope = nock(API_URL).post(`/${LibreLinkUpEndpoints.Login}`).reply(200, LibreLinkLoginMock);

    await client.login();

    expect(client.me).toBeTruthy();
    expect(scope.isDone()).toBe(true);
  });

  test('should successfully fetch connections', async () => {
    const scope = nock(API_URL).post(`/${LibreLinkUpEndpoints.Connections}`).reply(200, LibreLinkConnectionsMock);
    
    const { data } = await client.fetchConnections();

    expect(data).toBeTruthy();
    expect(scope.isDone()).toBe(true);
  });

  /*test('should successfully read data', async () => {
    const scope = nock(API_URL).post(LibreLinkUpEndpoints.Connections).reply(200, LibreLinkReadMock);
    
    const data = await client.read();

    expect(data).toBeTruthy();
    expect(scope.isDone()).toBe(true);
  });*/
});