/**
 * Price math shared by every component that shows money.
 * Rule from our pilot: shipping is free when every item in the order ships from Temu;
 * seller-shipped items add their own shipping. (Check against Temu's shipping page.)
 */
export const money = (n) => `$${n.toFixed(2)}`;

/** One item on its own: item price + its shipping + estimated tax. */
export function landedPrice(item, taxRate) {
  const shipping = item.shipsFrom === "seller" ? item.sellerShipping : 0;
  const tax = round((item.price + shipping) * taxRate);
  return { item: item.price, shipping, tax, total: round(item.price + shipping + tax) };
}

/** The whole cart, plus where it sits against an optional budget. A coupon discount comes off before tax. */
export function cartTotals(items, taxRate, budget = null, discount = 0) {
  const subtotal = round(items.reduce((s, i) => s + i.price * (i.qty ?? 1), 0));
  const shipping = round(items.filter((i) => i.shipsFrom === "seller").reduce((s, i) => s + i.sellerShipping, 0));
  const tax = round((subtotal - discount + shipping) * taxRate);
  const total = round(subtotal - discount + shipping + tax);
  const sellerShippedCount = items.filter((i) => i.shipsFrom === "seller").length;
  const overBudget = budget != null ? round(total - budget) : null;
  return { subtotal, discount, shipping, tax, total, sellerShippedCount, budget, overBudget };
}

/** Coupons the shopper qualifies for, best first. A coupon is { code, label, amount } or { code, label, percent }, with minOrder. */
export function eligibleCoupons(coupons, subtotal) {
  return coupons
    .filter((c) => subtotal >= (c.minOrder ?? 0))
    .map((c) => ({ ...c, savings: round(c.amount ?? (subtotal * c.percent) / 100) }))
    .sort((a, b) => b.savings - a.savings);
}

const round = (n) => Math.round(n * 100) / 100;
