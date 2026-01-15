import { expect, test, afterEach, describe } from "bun:test";
import { GlucoseReading, LibreLinkClient } from '../src';
import { LibreLinkConnectionsMock, LibreLinkLoginMock, LibreLinkReadMock, LibreLinkMultipleConnectionsMock } from './mocks';
import { mock, clearMocks } from 'bun-bagel';

describe('LibreLinkClient', () => {
  const client: LibreLinkClient = new LibreLinkClient();

  afterEach(() => {
    // Clear pending mocks after each test
    clearMocks();
    client.clearCache();
  });

  test('should be created', () => {
    expect(client).toBeTruthy();
  });

  test('should successfully login', async () => {
    // Mock the fetch method
    mock('llu/auth/login', { data: { data: LibreLinkLoginMock }, method: "POST" });
    
    await client.login();

    expect(client.me).toBeTruthy();
  });

  test('should successfully fetch connections', async () => {
    // Mock the fetch method
    mock('llu/connections', { data: { data: LibreLinkConnectionsMock.data } });

    const { data } = await client.fetchConnections();

    expect(data).toBeTruthy();
  });

  test('should successfully read data', async () => {
    // Mock the fetch method
    mock('llu/connections', { data: { data: LibreLinkConnectionsMock.data } });
    mock(`llu/connections/*/graph`, { data: { data: LibreLinkReadMock } });

    const data = await client.read();

    expect(data).toBeTruthy();
  });

  test('should return the logbook', async () => {
    // Mock the fetch method
    mock('llu/connections', { data: { data: LibreLinkConnectionsMock.data } });
    mock('llu/connections/*/logbook', { data: { data: [LibreLinkReadMock.connection.glucoseMeasurement] } })

    const data = await client.logbook();

    expect(data).toBeTruthy();
    expect(data[0]).toBeInstanceOf(GlucoseReading);
    expect(data.length).toBe(1);
  });

  test('should successfully stream data', async () => {
    // Mock the fetch method
    mock('llu/connections', { data: { data: LibreLinkConnectionsMock.data } });
    mock(`llu/connections/*/graph`, { data: { data: LibreLinkReadMock } });

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

  test('should return first connection patient ID when no patientId specified', async () => {
    // Mock the fetch method
    mock('llu/connections', { data: { data: LibreLinkConnectionsMock.data } });

    const patientId = await client.getPatientId();

    expect(patientId).toBe('1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a');
  });

  test('should throw error when no connections available', async () => {
    // Mock empty connections
    mock('llu/connections', { data: { status: 4, data: [] } });

    try {
      await client.getPatientId();
      expect(true).toBe(false);
    } catch (error) {
      const err = error as Error;
      expect(err.message).toContain('No connections found');
    }
  });
});

describe('Patient ID selection with specific patientId', () => {
  afterEach(() => {
    clearMocks();
  });

  test('should return specified patient ID when it exists (2nd connection)', async () => {
    const specificClient = new LibreLinkClient({ 
      email: 'test@example.com', 
      password: 'test',
      patientId: 'patient-xyz-789' 
    });

    mock('llu/connections', { data: LibreLinkMultipleConnectionsMock });

    const patientId = await specificClient.getPatientId();

    expect(patientId).toBe('patient-xyz-789');
  });

  test('should return specified patient ID when it exists (3rd connection)', async () => {
    const specificClient = new LibreLinkClient({ 
      email: 'test@example.com', 
      password: 'test',
      patientId: 'patient-def-456' 
    });

    mock('llu/connections', { data: LibreLinkMultipleConnectionsMock });

    const patientId = await specificClient.getPatientId();

    expect(patientId).toBe('patient-def-456');
  });

  test('should throw error when specified patient ID not found', async () => {
    const specificClient = new LibreLinkClient({ 
      email: 'test@example.com', 
      password: 'test',
      patientId: 'patient-invalid-999' 
    });

    mock('llu/connections', { data: LibreLinkMultipleConnectionsMock });

    try {
      await specificClient.getPatientId();
      expect(true).toBe(false);
    } catch (error) {
      const err = error as Error;
      expect(err.message).toContain('Specified patient ID "patient-invalid-999" not found in connections');
    }
  });

  test('should work with single connection when patient ID matches', async () => {
    const specificClient = new LibreLinkClient({ 
      email: 'test@example.com', 
      password: 'test',
      patientId: '1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a' 
    });

    mock('llu/connections', { data: { data: LibreLinkConnectionsMock.data } });

    const patientId = await specificClient.getPatientId();

    expect(patientId).toBe('1a1a1a1a-1a1a-1a1a-1a1a-1a1a1a1a1a1a');
  });
});