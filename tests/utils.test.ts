import { expect, test, describe } from "bun:test";
import { parseGlucoseReading } from "../src/utils";
import { LibreConnection, MeasurementColor, RawGlucoseReading } from "../src/types";

describe('Utils', () => {

  test('should parse raw glucose reading', () => {
    const rawReading = {
      Timestamp: 1631452800,
      Value: 100,
      MeasurementColor: "Green",
    } as unknown as RawGlucoseReading;

    const connection = {
      targetHigh: 200,
      targetLow: 50,
    } as unknown as LibreConnection;

    const glucoseReading = parseGlucoseReading(rawReading, connection);
    
    expect(glucoseReading).toBeTruthy();

    expect(glucoseReading.isHigh).toBe(false);
    expect(glucoseReading.isLow).toBe(false);
    expect(glucoseReading.measurementColor).toBe("Green");
    expect(glucoseReading.timestamp instanceof Date).toBe(true);
    expect(glucoseReading.value).toBe(100);
  });

  test('should parse raw low glucose reading', () => {
    const rawReading = {
      Timestamp: 1631452800,
      Value: 43,
      MeasurementColor: "Red",
    } as unknown as RawGlucoseReading;

    const connection = {
      targetHigh: 200,
      targetLow: 50,
    } as unknown as LibreConnection;

    const glucoseReading = parseGlucoseReading(rawReading, connection);

    expect(glucoseReading.isHigh).toBe(false);
    expect(glucoseReading.isLow).toBe(true);
    expect(glucoseReading.measurementColor).toBe("Red");
    expect(glucoseReading.timestamp instanceof Date).toBe(true);
    expect(glucoseReading.value).toBe(43);
  });

  test('should parse raw high glucose reading', () => {
    const rawReading = {
      Timestamp: 1631452800,
      Value: 242,
      MeasurementColor: "Yellow",
    } as unknown as RawGlucoseReading;

    const connection = {
      targetHigh: 200,
      targetLow: 50,
    } as unknown as LibreConnection;

    const glucoseReading = parseGlucoseReading(rawReading, connection);

    expect(glucoseReading.isHigh).toBe(true);
    expect(glucoseReading.isLow).toBe(false);
    expect(glucoseReading.measurementColor).toBe("Yellow");
    expect(glucoseReading.timestamp instanceof Date).toBe(true);
    expect(glucoseReading.value).toBe(242);
  });
});