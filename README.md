# Temu redesign (Group D, ITIS 8300)

Components for our Temu redesign, built one at a time and reskinned at the end.

**The plan:** each of us designs our own components independently in a neutral "wireframe" look. When the designs are done, we sample colors, type and spacing from Temu screenshots into one theme file, and every component picks up the Temu look at once.

## Run it

You need [Node.js](https://nodejs.org) 18 or newer.

```bash
npm install
npm run storybook   # component workshop at http://localhost:6006
npm run dev         # assembled screens at http://localhost:5173
```

In Storybook, the **Theme** button in the toolbar switches between Wireframe and Temu skin.

## Who owns what

| Folder | Owner | Components | Idea source |
|---|---|---|---|
| `src/components/dylan` | Dylan | FirstVisitCard, DealLabel, ProductTile, PriceBlock, CartDrawer, CheckoutSummary | ZIP at start; price and shipping under items; budget; three deal types; end dates instead of timers; deals toggle |
| `src/components/rupak` | Rupak | DeliveryEstimate, PurchaseCount, EligibilityLabel | Delivery before you click; purchase counts; discount eligibility label |
| `src/components/aniah` | Aniah | FilterSortBar, RecentlyViewed, CouponPopup | Filter/sort on every page; recently viewed instead of new tabs; coupon pop-ups for web and mobile |
| `src/components/jelani` | Jelani | SeeMoreDetails, GamesRewardsTab, SectionBlock | See-more drop-downs; Games and Rewards tab; visual hierarchy |

Rupak's, Aniah's and Jelani's folders start as stubs: a placeholder component with your idea in the comment at the top. Replace them however you like.

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
2. Sample colors, font, border and radius values; fill them into the `[data-theme="temu"]` block in `tokens.css` (current values are rough placeholders).
3. Switch the theme and compare each component with its screenshot side by side.

Screenshots and Temu branding are for this class project only. Keep the repo private.

## Git workflow

- Work on a branch named after you: `git checkout -b aniah/filter-bar`
- Open a pull request into `main` when a component is ready for the others to see.
- Don't edit someone else's folder without asking; shared files (`tokens.css`, `shared/`, `lib/`) are fair game but mention it in the PR.
