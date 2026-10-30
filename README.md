# Temu redesign (Group D, ITIS 8300)

Components for our Temu redesign, built one at a time and reskinned at the end.

**The plan:** each of us designs our own components independently in a neutral "wireframe" look. When the designs are done, we sample colors, type and spacing from Temu screenshots into one theme file, and every component picks up the Temu look at once.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run storybook   # component workshop at http://localhost:6006
npm run dev         # the whole site clicked through, at http://localhost:5173
```

In Storybook, the **Theme** button in the toolbar switches between Wireframe and Temu skin.

## Who owns what

Split by screen. Each person owns their screen's folder; everything is designed in the wireframe theme first.

| Folder | Owner | Screens and components |
|---|---|---|
| `src/components/dylan` | Dylan | **OnboardingSplash** (first-use splash: ZIP, budget, deals toggle), **Cart** (popout and full-screen modes, budget line), **Checkout** (order summary with Rupak's auto-apply coupons button) |
| `src/components/aniah` | Aniah | **NavBar**, **FilterSortBar** (same filters on every page), **QRCodeDeals** (QR-code deals usable on the website), RecentlyViewed |
| `src/components/rupak` | Rupak | **SearchResults** page from his design concept: **ProductCard** with **EligibilityLabel** (green eligible / blue not eligible / orange new users only, with hover conditions) and **DeliveryBadge** (local vs overseas, before you click), plus the **EligibilityGuide** side panel. DeliveryBadge also appears on each line of Dylan's cart. |
| `src/components/jelani` | Jelani | **ProductDetails** page built from his design concept sketch (drop-down boxes, large rating, color-coded price, item metrics, shipping with stipulations, independent-scrolling reviews), SeeMoreDetails, SectionBlock, GamesRewardsTab |
| `src/shared` | everyone | Button, Pill, Card, **DealLabel** (the three deal types, so every screen shows deals the same way) |

Design concept sketches and mockups are in `reference/concepts/`. Aniah's folder starts as stubs or starter layouts with your ideas from our ideation session in the comment at the top. Replace them however you like. The PriceBlock in Jelani's folder came from Dylan's price ideas and is no longer used by his page.

**How the screens connect** (see `src/main.jsx`): the NavBar cart button and "Add to cart" open the Cart popout; the popout's "Open full cart" goes to the full-screen Cart; Checkout comes from either. The OnboardingSplash appears on first load.

## Adding a component

Make a folder under your name with three files:

```
src/components/<you>/<ComponentName>/
  ComponentName.jsx           the component
  ComponentName.css           its styles (optional)
  ComponentName.stories.jsx   the states you want to show
```

Copy any of Dylan's components as a template. It shows up in Storybook automatically.

## Real Temu products and images

`src/data/products.js` has 17 real listings (phone cases, t-shirts, laser levels, gift wrap) with names, prices, sold counts, ratings and image addresses, plus a full gallery and Temu's real shipping rule for one laser level. Run this once to download the images into `public/products/`:

```bash
npm run fetch-images
```

Use them with `<img {...imageProps(product)} alt={product.name} />`. Until you've run the script, images load from Temu's servers. `reference/temu-screens/` has screenshots of Temu's homepage, search results and product page for matching the layout.

## Rules that keep the Temu reskin easy

- **Colors, fonts, borders and radii come from `src/theme/tokens.css`**, via `var(--color-accent)` and friends. Don't hard-code hex colors in components.
- **Shared pieces** (Button, Pill, Card) live in `src/shared`. Use them instead of styling your own buttons.
- **Money math** lives in `src/lib/price.js`. If your component shows a price or total, use `landedPrice` / `cartTotals` so everyone's numbers agree.
- **Demo data** is in `src/data/sample.js`, built on the real Temu listings in `products.js`. The demo cart is the polka-dot phone case, 3-pack tees, the green laser level (seller-shipped, $2.99) and the Christmas fish wrapping paper: $22.55 + $2.99 shipping + $1.85 tax (7.25%, ZIP 28223) = **$27.39**, against a **$25** budget. Swapping the laser level for the Temu-shipped laser kit brings it to $19.23; auto-applying SAVE2 at checkout brings it to $25.25. Use these items in every screen so the demo is consistent.

## The Temu coat of paint (end of project)

1. Take screenshots of the real Temu screens our components replace.
2. Colors, font, radii and button shape are already sampled from Temu's cart and homepage into the `[data-theme="temu"]` block in `tokens.css`. **`reference/temu-style/`** has the full style guide (README) and a page that rebuilds Temu's order summary, cart price, buttons, badges and tiles (`examples.html`, with a screenshot). Use the tokens (`--color-sale`, `--color-success`, `--radius-button`...) rather than hard-coded colors.
3. Switch the theme and compare each component with its screenshot side by side.

Screenshots and Temu branding are for this class project only. Keep the repo private.

## Git workflow

- Work on a branch named after you: `git checkout -b aniah/filter-bar`
- Open a pull request into `main` when a component is ready for the others to see.
- Don't edit someone else's folder without asking; shared files (`tokens.css`, `shared/`, `lib/`) are fair game but mention it in the PR.
