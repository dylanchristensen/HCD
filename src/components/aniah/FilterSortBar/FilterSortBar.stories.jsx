import { useState } from "react";
import { FilterSortBar, applyFilters, DEFAULT_FILTERS } from "./FilterSortBar";
import { items } from "../../../data/sample";
export default { title: "Aniah/FilterSortBar (draft)", component: FilterSortBar };
export const Interactive = {
  render: () => {
    const [f, setF] = useState(DEFAULT_FILTERS);
    const list = applyFilters(items, f);
    return (<div><FilterSortBar value={f} onChange={setF} count={list.length} />
      <ol style={{ fontSize: 13 }}>{list.map((i) => <li key={i.id}>${i.price.toFixed(2)} · {i.name}</li>)}</ol></div>);
  },
};
