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
| `src/components/rupak` | Rupak | **SearchResults** page (starts with the price-and-shipping ProductTile), DeliveryEstimate, PurchaseCount, EligibilityLabel |
| `src/components/jelani` | Jelani | **ProductDetails** page (starts with the PriceBlock), SeeMoreDetails, SectionBlock, GamesRewardsTab |
| `src/shared` | everyone | Button, Pill, Card, **DealLabel** (the three deal types, so every screen shows deals the same way) |

Aniah's, Rupak's and Jelani's folders start as stubs or starter layouts with your ideas from our ideation session in the comment at the top. Replace them however you like. The ProductTile and PriceBlock in Rupak's and Jelani's folders came from Dylan's price ideas; they're yours now.

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

## Rules that keep the Temu reskin easy

- **Colors, fonts, borders and radii come from `src/theme/tokens.css`**, via `var(--color-accent)` and friends. Don't hard-code hex colors in components.
- **Shared pieces** (Button, Pill, Card) live in `src/shared`. Use them instead of styling your own buttons.
- **Money math** lives in `src/lib/price.js`. If your component shows a price or total, use `landedPrice` / `cartTotals` so everyone's numbers agree.
- **Sample data** is in `src/data/sample.js`. The cart reproduces a real session from our study (subtotal $22.16, shipping $6.00, tax $2.31, total $30.47).

## The Temu coat of paint (end of project)

1. Take screenshots of the real Temu screens our components replace.
2. Colors, font, radii and button shape are already sampled from Temu's cart and homepage into the `[data-theme="temu"]` block in `tokens.css`. **`reference/temu-style/`** has the full style guide (README) and a page that rebuilds Temu's order summary, cart price, buttons, badges and tiles (`examples.html`, with a screenshot). Use the tokens (`--color-sale`, `--color-success`, `--radius-button`...) rather than hard-coded colors.
3. Switch the theme and compare each component with its screenshot side by side.

Screenshots and Temu branding are for this class project only. Keep the repo private.

## Git workflow

- Work on a branch named after you: `git checkout -b aniah/filter-bar`
- Open a pull request into `main` when a component is ready for the others to see.
- Don't edit someone else's folder without asking; shared files (`tokens.css`, `shared/`, `lib/`) are fair game but mention it in the PR.
