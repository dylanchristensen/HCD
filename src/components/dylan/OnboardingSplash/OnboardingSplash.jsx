import { useState } from "react";
import { Button } from "../../../shared";
import "./OnboardingSplash.css";

/**
 * Owner: Dylan. Onboarding splash shown on first use, over the homepage.
 * Asks for ZIP, an optional budget and whether to show deals and timers. Nothing is required.
 * Replaces the prize wheel and coupon pop-ups Temu shows on first open.
 */
export function OnboardingSplash({ open = true, defaultZip = "", defaultBudget = "", defaultShowDeals = true, onDone = () => {} }) {
  const [zip, setZip] = useState(defaultZip);
  const [budget, setBudget] = useState(defaultBudget);
  const [showDeals, setShowDeals] = useState(defaultShowDeals);
  if (!open) return null;
  const finish = (skip) =>
    onDone(skip ? { zip: "", budget: null, showDeals: true } : { zip, budget: budget === "" ? null : Number(budget), showDeals });
  return (
    <div className="splash-backdrop" role="dialog" aria-modal="true" aria-labelledby="splash-title">
      <div className="splash">
        <h2 id="splash-title" className="splash-title">Before you shop</h2>
        <p className="ui-muted">Three quick things so every price you see is the price you pay. Nothing is required.</p>
        <label className="splash-field">
          <span>Your ZIP code</span>
          <input className="ui-field" value={zip} onChange={(e) => setZip(e.target.value)} inputMode="numeric" maxLength={5} placeholder="28223" />
          <span className="ui-muted">Used to show shipping and estimated tax in every price. No account, no address.</span>
        </label>
        <label className="splash-field">
          <span>Budget for today <span className="ui-muted">(optional)</span></span>
          <input className="ui-field" value={budget} onChange={(e) => setBudget(e.target.value)} inputMode="decimal" placeholder="$ 30" />
          <span className="ui-muted">The cart tells you when you go over. It never stops you.</span>
        </label>
        <label className="splash-toggle">
          <input type="checkbox" checked={showDeals} onChange={(e) => setShowDeals(e.target.checked)} />
          <span><b>Show deals and timers</b><br /><span className="ui-muted">Off hides deal labels and end times. Prices stay the same.</span></span>
        </label>
        <div className="splash-actions">
          <Button onClick={() => finish(false)}>Start shopping</Button>
          <Button variant="link" onClick={() => finish(true)}>Skip for now</Button>
        </div>
        <p className="ui-muted splash-foot">You can change any of this later from the menu.</p>
      </div>
    </div>
  );
}
