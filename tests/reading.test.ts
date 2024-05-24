
import { expect, test, describe } from "bun:test";
import { GlucoseReading } from "../src/reading";
import { LibreConnection, MeasurementColor, RawGlucoseReading, Trend } from "../src/types";

describe("GlucoseReading", () => {
    test("should parse a raw glucose reading", () => {
      const rawReading = {
        Timestamp: 1631452800,
        ValueInMgPerDl: 100,
        MeasurementColor: MeasurementColor.Green,
        TrendArrow: Trend.Flat,
      } as unknown as RawGlucoseReading;

      const connection = {
        targetHigh: 200,
        targetLow: 50,
      } as unknown as LibreConnection;

      const glucoseReading = new GlucoseReading(rawReading, connection);

      expect(glucoseReading).toBeTruthy();
      expect(glucoseReading.timestamp).toBeInstanceOf(Date);
      expect(glucoseReading.value).toBe(100);
      expect(glucoseReading.mgDl).toBe(100);
      expect(glucoseReading.mmol).toBe("5.5");
      expect(glucoseReading.trendType).toBe("Flat");
      expect(glucoseReading.measurementColor).toBe(MeasurementColor.Green);
      expect(glucoseReading.trend).toBe(Trend.Flat);
    });

    test("should calculate isHigh and isLow based on target values", () => {
      const rawReading = {
        Timestamp: 1631452800,
        ValueInMgPerDl: 151,
        MeasurementColor: MeasurementColor.Green,
        TrendArrow: Trend.FortyFiveUp,
      } as unknown as RawGlucoseReading;

      const connection = {
        targetHigh: 150,
        targetLow: 70,
      } as unknown as LibreConnection;

      const glucoseReading = new GlucoseReading(rawReading, connection);

      expect(glucoseReading.isHigh).toBe(true);
      expect(glucoseReading.isLow).toBe(false);
    });
  });
