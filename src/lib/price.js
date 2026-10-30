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

/** The whole cart, plus where it sits against an optional budget. */
export function cartTotals(items, taxRate, budget = null) {
  const subtotal = round(items.reduce((s, i) => s + i.price * (i.qty ?? 1), 0));
  const shipping = round(items.filter((i) => i.shipsFrom === "seller").reduce((s, i) => s + i.sellerShipping, 0));
  const tax = round((subtotal + shipping) * taxRate);
  const total = round(subtotal + shipping + tax);
  const sellerShippedCount = items.filter((i) => i.shipsFrom === "seller").length;
  const overBudget = budget != null ? round(total - budget) : null;
  return { subtotal, shipping, tax, total, sellerShippedCount, budget, overBudget };
}

const round = (n) => Math.round(n * 100) / 100;
