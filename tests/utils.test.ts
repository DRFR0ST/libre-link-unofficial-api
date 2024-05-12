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

    expect(glucoseReading.isHigh).to.be(false);
    expect(glucoseReading.isLow).to.be(false);
    expect(glucoseReading.measurementColor).to.be(MeasurementColor.Green);
    expect(glucoseReading.timestamp).to.be.a(Date);
    expect(glucoseReading.value).to.be(100);
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

    expect(glucoseReading.isHigh).to.be(false);
    expect(glucoseReading.isLow).to.be(true);
    expect(glucoseReading.measurementColor).to.be(MeasurementColor.Red);
    expect(glucoseReading.timestamp).to.be.a(Date);
    expect(glucoseReading.value).to.be(43);
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

    expect(glucoseReading.isHigh).to.be(true);
    expect(glucoseReading.isLow).to.be(false);
    expect(glucoseReading.measurementColor).to.be(MeasurementColor.Yellow);
    expect(glucoseReading.timestamp).to.be.a(Date);
    expect(glucoseReading.value).to.be(242);
  });
});