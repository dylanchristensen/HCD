# Temu style reference

How Temu's website looks, measured from two pages saved from temu.com on Oct 30, 2026: the **shopping cart** and the **homepage**. Use this when applying the Temu coat of paint to our components. The values below are already in the `[data-theme="temu"]` block of `src/theme/tokens.css`.

`examples.html` in this folder rebuilds each pattern below so you can see it. Open it in a browser.

**Why the raw pages aren't in the repo:** they were saved from a logged-in session, so they hold one person's cart, a masked account name and about 60 tracking/session scripts. Temu's main stylesheets also load from their CDN, so the saved files don't render on their own anyway. What's here is the useful part: the values and the structure.

## Colors

Counted across inline styles and style blocks of both pages.

| Token | Value | Where Temu uses it |
|---|---|---|
| text | `#222222` | almost all body text, labels in the order summary |
| muted | `#555555` | secondary text ("Taxes and delivery fees are calculated on the next page."), struck-out original prices |
| accent (orange) | `#FB7701` | primary buttons (pill-shaped), discount amounts in the order summary, `$` sign in deal prices, outline badges |
| sale red | `#D9001B` | sale price, `-46%`, `LAST DAY !`, `$0.51 OFF`, strike-through line on original price (`rgba(217,0,27,.65)`, 4px) |
| success green | `#0A8800` (cart), `#0B8000` (home) | `Shipping: FREE`, estimated total, "covered by our Price Match Guarantee", check icons |
| focus blue | `#0B7BFF` | keyboard focus outlines everywhere (2px, offset 2px) |
| highlight yellow | `#FFF7A7` | background behind promo text |
| surface | `#F7F7F7` | page sections, card backgrounds |
| border | `#ECECEC` | dividers between rows |
| countdown | black boxes, white digits | `05 : 11 : 12` in "expires in" timers |

## Type

- **Font:** system stack, `miui, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif`. No brand webfont.
- **Sizes used most:** 12px and 14px (body, tiles), 13px (secondary), 15px (order summary rows), 16 to 18px (prices), 20px (estimated total).
- **Weights:** 400 for labels, 500 for amounts, 600 for sale prices, 700 for big red callouts (`-46%`, `LAST DAY`).
- **Prices are split:** the `$` is set 2px smaller than the number. Cart: `$` 16px, `0.59` 18px. Order summary: `$` 13px, `14.45` 15px. On homepage tiles the cents are smaller again (`$ 1 .80`).

## Shape

- **Buttons:** full pills (`border-radius: 9999px`). Orange fill, white text. Small pill buttons on the homepage: `padding: 6px 12px; font-size: 12px; font-weight: 500`.
- **Badges:** small rectangles, `height: 18px; padding: 0 4px; border: 1px solid #FB7701; border-radius: 3px; font-size: 12px; font-weight: 600`.
- **Cards and panels:** `border-radius: 8px`, thin `#ECECEC` dividers rather than borders, almost no shadows.
- **Dark overlay chips:** `background: rgba(0,0,0,.6); border-radius: 20px; font-size: 12px` (on images).

## Component patterns

### Order summary (cart page)
Rows of label left, amount right, 15px. Discounts are orange with a leading minus. Shipping is green and says `FREE`. The final line is "Estimated total" in green, 18 to 20px, followed by small grey notes. Temu's summary has **no tax and no real shipping cost**: "Taxes and delivery fees are calculated on the next page."

```
Item(s) total:                      $19.86   (grey, struck through)
Item(s) discount:                   -$5.41   (orange, 500)
                                    $14.45
Temu's discount for specific item:  -$4.45   (orange)
Limited-time discount:              -$0.06   (orange)
Shipping:                           FREE     (green, 600, 18px)
Estimated total                     $9.94    (green, 500, 20px)
```

### Cart line price
Stacked pressure cues around one price:
`ALMOST SOLD OUT` (white on dark, 11px) → `$0.51 OFF expires in 05:11:12` (red + black timer boxes) → `-46% LAST DAY !` (red, 700, 18px) → `$1.10` (struck in red) `$0.59` (red) → "after applying promos to $1.04".

### Checkout button
Full-width orange pill: `Checkout (5)` with a line above it in white, 600: `Last day for 49.9% off`.

### Homepage deal sections
Section headers in caps (`LIGHTNING DEALS`, `CLEARANCE DEALS`) with a subtitle ("Limited-time offers", "Limited stock"). Tiles show price with smaller cents, struck original price, `-74%`, and "last 3 days".

## What this means for our redesign

Keep Temu's **look**: orange pills, red for sale prices, green for free/confirmed, system font, split dollar and cents, 8px panels with thin dividers.

Drop the **pressure patterns** our concepts replace: timers, "LAST DAY !", "ALMOST SOLD OUT", stacked struck-out prices, and the "Taxes and delivery fees are calculated on the next page" total. In our components those become a stated end time, a real total with shipping and tax, and a budget line, styled in Temu's own colors so the result looks like Temu, just honest.
