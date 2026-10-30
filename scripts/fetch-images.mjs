// Downloads every product image in src/data/products.js into public/products/.
// Run once on your own computer: npm run fetch-images
import { mkdir, writeFile, access } from "node:fs/promises";
import { products } from "../src/data/products.js";

const dir = new URL("../public/products/", import.meta.url);
await mkdir(dir, { recursive: true });

let ok = 0, failed = 0;
for (const p of products) {
  const urls = [[`${p.id}.jpg`, p.img], ...(p.gallery ?? []).map((u, i) => [`${p.id}-${i + 1}.jpg`, u])];
  for (const [name, url] of urls) {
    const file = new URL(name, dir);
    try { await access(file); ok++; continue; } catch {}
    try {
      const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      await writeFile(file, Buffer.from(await res.arrayBuffer()));
      console.log("saved", name); ok++;
    } catch (e) { console.warn("failed", name, e.message); failed++; }
  }
}
console.log(`\n${ok} images ready in public/products/, ${failed} failed.`);
