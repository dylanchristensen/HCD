/**
 * Sample data. The cart reproduces session D-1's real checkout on Oct 1, 2026:
 * subtotal $22.16, shipping $6.00, tax $2.31, total $30.47.
 */
export const TAX_RATE = 0.0819; // 2.31 / (22.16 + 6.00), rounded
export const ZIP = "28223";

export const items = [
  { id: "case", name: "Polka-dot case, iPhone 16 Plus", price: 3.49, shipsFrom: "temu", sellerShipping: 0,
    deal: { type: "lightning", endsAt: "Tue 3:00 pm", regularPrice: 4.99 }, rating: 4.5, sold: 1021 },
  { id: "tee", name: "Basic tee, 2X, navy", price: 8.69, shipsFrom: "temu", sellerShipping: 0,
    deal: { type: "everyday" }, rating: 4.3, sold: 340 },
  { id: "level", name: "2-line cross laser level", price: 9.98, shipsFrom: "seller", sellerShipping: 6.0,
    deal: { type: "lightning", endsAt: "Tue, Oct 28, 3:00 pm", regularPrice: 12.5 }, rating: 4.6, sold: 1204 },
  { id: "folio", name: "Leather folio case", price: 7.2, shipsFrom: "seller", sellerShipping: 5.98,
    deal: { type: "clearance", left: 12 }, rating: 4.1, sold: 88 },
];

export const cart = items.filter((i) => ["case", "tee", "level"].includes(i.id));
