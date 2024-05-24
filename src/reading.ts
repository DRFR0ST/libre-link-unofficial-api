import { TREND_TYPE_MAP } from "./constants";
import { MeasurementColor, RawGlucoseReading, Trend, TrendType } from "./types";
import { parseGlucoseReading } from "./utils";

const DEFAULT_OPTIONS = Object.freeze({
    targetHigh: 150,
    targetLow: 70
});

/**
 * @description A glucose reading class.
 */
export class GlucoseReading {
    /**
     * @description The timestamp of the glucose reading.
     */
    public timestamp: Date;
    /**
     * @description The value of the glucose reading in mg/dL.
     */
    public value: number;
    /**
     * @description The measurement color of the glucose reading. See {@link MeasurementColor}.
     */
    public measurementColor: MeasurementColor;
    /**
     * @description Whether the glucose reading is high, based on the patient's settings. Calculated by the library.
     */
    public isHigh: boolean;
    /**
     * @description Whether the glucose reading is low, based on the patient's settings. Calculated by the library.
     */
    public isLow: boolean;
    /**
     * @description The trend of the glucose reading. See {@link Trend}.
     */
    public trend: Trend;
  
    constructor(public _raw: RawGlucoseReading, public _options: { targetHigh: number, targetLow: number } = DEFAULT_OPTIONS) {
        const parsed = parseGlucoseReading(_raw, _options);

        this.value = parsed.value;
        this.timestamp = parsed.timestamp;
        this.measurementColor = parsed.measurementColor;
        this.isHigh = parsed.isHigh;
        this.isLow = parsed.isLow;
        this.trend = parsed.trend;
    }

    /**
     * @description The mmol value of the glucose reading.
     */
    get mmol() {
        return (this.value / 18).toFixed(1);
    }

    /**
     * @description The mg/dL value of the glucose reading.
     */
    get mgDl() {
        return this.value;
    }

    /**
     * @description The type of the trend. {@see TrendType}
     */
    get trendType(): TrendType {
        return TREND_TYPE_MAP[this.trend];
    }
}