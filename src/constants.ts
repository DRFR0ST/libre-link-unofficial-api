import { Trend, TrendType } from "./types";

export const TREND_MAP: Trend[] = [
    Trend.NotComputable,
    Trend.SingleDown,
    Trend.FortyFiveDown,
    Trend.Flat,
    Trend.FortyFiveUp,
    Trend.SingleUp,
];

export const TREND_TYPE_MAP: TrendType[] = [
    "NotComputable",
    "SingleDown",
    "FortyFiveDown",
    "Flat",
    "FortyFiveUp",
    "SingleUp",
];