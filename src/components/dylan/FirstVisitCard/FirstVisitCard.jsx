import { useState } from "react";
import { Button, Card } from "../../../shared";
import "./FirstVisitCard.css";

/**
 * First thing a new shopper sees: ZIP, optional budget, deals-and-timers toggle.
 * Nothing is required. Replaces the prize wheel / coupon pop-ups on first open.
 */
export function FirstVisitCard({ defaultZip = "", defaultBudget = "", defaultShowDeals = true, onDone = () => {} }) {
  const [zip, setZip] = useState(defaultZip);
  const [budget, setBudget] = useState(defaultBudget);
  const [showDeals, setShowDeals] = useState(defaultShowDeals);
  const submit = () => onDone({ zip, budget: budget === "" ? null : Number(budget), showDeals });
  return (
    <Card style={{ maxWidth: 440 }}>
      <h2 className="fvc-title">Before you shop</h2>
      <p className="ui-muted">Three quick things so every price you see is the price you pay. Nothing is required.</p>
      <label className="fvc-field">
        <span>Your ZIP code</span>
        <input className="ui-field" value={zip} onChange={(e) => setZip(e.target.value)} inputMode="numeric" maxLength={5} placeholder="28223" />
        <span className="ui-muted">Used to show shipping and estimated tax in every price. No account, no address.</span>
      </label>
      <label className="fvc-field">
        <span>Budget for today <span className="ui-muted">(optional)</span></span>
        <input className="ui-field" value={budget} onChange={(e) => setBudget(e.target.value)} inputMode="decimal" placeholder="$ 30" />
        <span className="ui-muted">The cart tells you when you go over. It never stops you.</span>
      </label>
      <label className="fvc-toggle">
        <input type="checkbox" checked={showDeals} onChange={(e) => setShowDeals(e.target.checked)} />
        <span><b>Show deals and timers</b><br /><span className="ui-muted">Off hides deal labels and end times. Prices stay the same.</span></span>
      </label>
      <div className="fvc-actions">
        <Button onClick={submit}>Start shopping</Button>
        <Button variant="link" onClick={() => onDone({ zip: "", budget: null, showDeals: true })}>Skip for now</Button>
      </div>
    </Card>
  );
}
