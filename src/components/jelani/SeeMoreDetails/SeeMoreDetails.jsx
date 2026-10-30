/**
 * Owner: Jelani. Starter stub; replace freely.
 * Idea (from our ideation session): Use "see more", "more details" and other drop down menus to place extra information on certain important parts of product information, without overloading the user.
 */
import { useState } from "react";
export function SeeMoreDetails({ summary = "Price: $2.50 - $5.00 off!", details = "Coupon applies at checkout on orders over $20." }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="ui-stub">
      {summary} <button className="ui-btn ui-btn--link" onClick={() => setOpen(!open)}>{open ? "See less" : "See more"}</button>
      {open && <div>{details}</div>}
      <div>TODO (Jelani): which product fields collapse.</div>
    </div>
  );
}
