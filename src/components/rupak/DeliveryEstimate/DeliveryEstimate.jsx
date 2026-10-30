/**
 * Owner: Rupak. Starter stub; replace freely.
 * Idea (from our ideation session): Display approximate shipping and delivery time frame on home page before item is clicked by the user. Display shipping and delivery information when the item is added to the cart. (Also from the meeting: "before you click on the item.")
 */
export function DeliveryEstimate({ range = "Nov 3 to Nov 10", shipsIn = "1 to 2 days", variant = "tile" }) {
  return (
    <div className="ui-stub">
      <b>Arrives {range}</b>{variant === "cart" && <> · ships in {shipsIn}</>}
      <div>TODO (Rupak): design the tile and add-to-cart versions.</div>
    </div>
  );
}
