/**
 * Estimated sales tax from a ZIP code, so "You'll pay" changes when the shopper's ZIP does.
 * ZIP -> state from the first three digits (USPS prefix ranges). Rate = the state's average combined
 * state + local rate (approximate, Tax Foundation-style averages); Charlotte (282xx) uses its exact 7.25%
 * (NC 4.75% + Mecklenburg 2.5%). Demo estimate only: real tax depends on the exact address and the item.
 */
const RANGES = [
  [5, 5, "NY"], [6, 9, "PR"], [10, 27, "MA"], [28, 29, "RI"], [30, 38, "NH"], [39, 49, "ME"], [50, 59, "VT"],
  [60, 69, "CT"], [70, 89, "NJ"], [100, 149, "NY"], [150, 196, "PA"], [197, 199, "DE"], [200, 205, "DC"],
  [206, 219, "MD"], [220, 246, "VA"], [247, 268, "WV"], [270, 289, "NC"], [290, 299, "SC"], [300, 319, "GA"],
  [320, 349, "FL"], [350, 369, "AL"], [370, 385, "TN"], [386, 397, "MS"], [398, 399, "GA"], [400, 427, "KY"],
  [430, 459, "OH"], [460, 479, "IN"], [480, 499, "MI"], [500, 528, "IA"], [530, 549, "WI"], [550, 567, "MN"],
  [570, 577, "SD"], [580, 588, "ND"], [590, 599, "MT"], [600, 629, "IL"], [630, 658, "MO"], [660, 679, "KS"],
  [680, 693, "NE"], [700, 715, "LA"], [716, 729, "AR"], [730, 749, "OK"], [750, 799, "TX"], [800, 816, "CO"],
  [820, 831, "WY"], [832, 838, "ID"], [840, 847, "UT"], [850, 865, "AZ"], [870, 884, "NM"], [889, 898, "NV"],
  [900, 961, "CA"], [967, 968, "HI"], [970, 979, "OR"], [980, 994, "WA"], [995, 999, "AK"],
];
// Average combined state + local sales tax, percent (approximate).
const RATE = {
  AL: 9.29, AK: 1.82, AZ: 8.38, AR: 9.45, CA: 8.85, CO: 7.81, CT: 6.35, DE: 0, DC: 6.0, FL: 7.0, GA: 7.38, HI: 4.5,
  ID: 6.03, IL: 8.86, IN: 7.0, IA: 6.94, KS: 8.65, KY: 6.0, LA: 9.56, ME: 5.5, MD: 6.0, MA: 6.25, MI: 6.0, MN: 8.04,
  MS: 7.06, MO: 8.39, MT: 0, NE: 6.97, NV: 8.24, NH: 0, NJ: 6.6, NM: 7.62, NY: 8.53, NC: 7.0, ND: 7.04, OH: 7.24,
  OK: 8.99, OR: 0, PA: 6.34, PR: 11.5, RI: 7.0, SC: 7.5, SD: 6.11, TN: 9.55, TX: 8.2, UT: 7.25, VT: 6.36, VA: 5.77,
  WA: 9.43, WV: 6.57, WI: 5.7, WY: 5.44,
};

export const isZip = (zip) => /^\d{5}$/.test(String(zip ?? "").trim());

/** { state, rate (0.0725), label } for a 5-digit ZIP, or null if it isn't one we know. */
export function taxForZip(zip) {
  if (!isZip(zip)) return null;
  const z = String(zip).trim();
  if (z.startsWith("282")) return { state: "NC", rate: 0.0725, label: "Charlotte, NC" };
  const p = Number(z.slice(0, 3));
  const hit = RANGES.find(([lo, hi]) => p >= lo && p <= hi);
  if (!hit) return null;
  return { state: hit[2], rate: RATE[hit[2]] / 100, label: hit[2] };
}
