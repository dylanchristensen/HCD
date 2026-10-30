/**
 * Real Temu listings, collected from temu.com on Oct 30, 2026 (search results and one product page).
 * Titles are shortened; prices are what Temu showed that day.
 *
 * Images: `img` points at Temu's CDN. Run `npm run fetch-images` once (on a machine with normal
 * internet) to download them into public/products/; `localImg` is then used automatically.
 * For the class presentation only. Don't publish this site.
 */
const cdn = "https://img.kwcdn.com/product/";
const p = (id, file, rest) => ({ id, img: cdn + file, localImg: `/products/${id}.jpg`, ...rest });

export const products = [
  // phone cases (search: "phone case")
  p("case-polka", "fancy/f29b724e-984b-4f1d-8e51-13b221e51d23.jpg", { name: "Cute Vintage Minimalist Polka Dot Phone Case", category: "Phone cases", price: 1.85, originalPrice: 17.99, sold: "8K+", rating: 4.9, shipsFrom: "temu", sellerShipping: 0 }),
  p("case-monkey", "open/211f08b713b542bcac6b71f7e61d9ac7-goods.jpeg", { name: "Monkey Drinking Beverage Shockproof Phone Case", category: "Phone cases", price: 1.62, originalPrice: 15.4, sold: "1.2K+", rating: 4.7, shipsFrom: "temu", sellerShipping: 0 }),
  p("case-space-pig", "open/7ebbc4734f884024ab0c0d2eeed62f41-goods.jpeg", { name: "2D Space Starry Sky Laser-Eye Pig Phone Case", category: "Phone cases", price: 2.28, sold: "131", rating: 4.6, shipsFrom: "temu", sellerShipping: 0 }),
  p("case-matte", "open/71d56588a2e34e849159e80fa71d15e7-goods.jpeg", { name: "Matte Finish 2-in-1 Impact-Resistant Phone Cover", category: "Phone cases", price: 1.74, sold: "1K+", rating: 4.8, shipsFrom: "temu", sellerShipping: 0 }),
  p("case-duck", "open/e557d177b3874477a6f7568d06d9972d-goods.jpeg", { name: "Creative Glasses Duck Pattern Matte Phone Case", category: "Phone cases", price: 1.72, originalPrice: 5.73, sold: "2.3K+", rating: 4.8, shipsFrom: "temu", sellerShipping: 0 }),
  p("case-stripe", "open/0619c740bc834bdaa63e39c56e6a7216-goods.jpeg", { name: "Multicolor Stripe Anti-Drop Soft Phone Case", category: "Phone cases", price: 1.96, originalPrice: 15.01, sold: "500+", rating: 4.6, shipsFrom: "temu", sellerShipping: 0 }),

  // t-shirts (search: "mens basic t shirt")
  p("tee-black-3pk", "open/540628fda9c04891acfe85ae69c532d3-goods.jpeg", { name: "3pcs Minimalist Crew Neck T-Shirts, Solid Black", category: "T-shirts", price: 5.8, originalPrice: 6.85, sold: "1.3K+", rating: 4.7, shipsFrom: "temu", sellerShipping: 0 }),
  p("tee-cotton", "fancy/83d749a2-54de-45ed-976c-8bb22e6c3e3e.jpg", { name: "Men's Pure Cotton Short Sleeve Crew Neck Tee", category: "T-shirts", price: 2.88, sold: "229", rating: 4.5, shipsFrom: "temu", sellerShipping: 0 }),
  p("tee-basic", "open/28ffd603c8b743b1bff7a4a42bd02495-goods.jpeg", { name: "Breathable Comfy Men's Basic T-Shirt", category: "T-shirts", price: 5.82, originalPrice: 12.19, sold: "355", rating: 4.6, shipsFrom: "temu", sellerShipping: 0 }),
  p("tee-black", "open/7ce22b60352d4da987c588bd0c1b8ce5-goods.jpeg", { name: "Men's Solid Black Crew Neck Short Sleeve T-Shirt", category: "T-shirts", price: 2.53, originalPrice: 25.09, sold: "23", rating: 4.4, shipsFrom: "temu", sellerShipping: 0 }),

  // laser levels (search: "cross line laser level"); laser-green has a full product page below
  p("laser-green", "fancy/15bc8fb6-6264-4f8c-9f1c-b78f0e0881c2.jpg", {
    name: "2 Line Green Cross Line Laser Level, 360° Rotatable Shield, Tall Tripod Included",
    category: "Tools", price: 10.63, originalPrice: 53.05, sold: "197", rating: 4.5, reviews: 22,
    shipsFrom: "seller", sellerShipping: 2.99, sellerFreeOver: 30,
    gallery: [
      cdn + "fancy/15bc8fb6-6264-4f8c-9f1c-b78f0e0881c2.jpg",
      cdn + "fancy/05d31e5c-4ec0-4668-9b4f-69fd8bc813d7.jpg",
      cdn + "fancy/7c60b048-2532-4e1a-8d15-5e0e308f8c8b.jpg",
      cdn + "fancy/1723cdd2-43e5-4104-a50e-3618d3604295.jpg",
      cdn + "fancy/7c507bee-c096-440d-b880-e007d024eb0d.jpg",
    ],
    // What Temu's real page says about shipping for this item:
    shippingNote: "Standard: $2.99 or FREE (if ordering $30.00+ from this seller). Fastest delivery in 2 business days.",
  }),
  p("laser-kit", "fancy/6218092e-b9ef-4d95-81dd-f55cb6d04a87.jpg", { name: "Multipurpose Laser Leveling Tool Kit with Cross Line Laser", category: "Tools", price: 6.01, originalPrice: 54.13, sold: "100K+", rating: 4.6, shipsFrom: "temu", sellerShipping: 0 }),
  p("laser-pro", "fancy/de8dabaf-def1-4f03-afed-15603bfedea6.jpg", { name: "Self-Leveling Green Cross Line Laser with Light Adjustment", category: "Tools", price: 21.27, originalPrice: 50.99, sold: "140", rating: 4.7, shipsFrom: "seller", sellerShipping: 2.99, sellerFreeOver: 30 }),

  // gift wrap (search: "christmas wrapping paper")
  p("wrap-fish", "open/bb2c6ac5681b4357afc1bda9bf64d556-goods.jpeg", { name: "Christmas Fish Wrapping Paper Roll, 17.7 x 118 in", category: "Gift wrap", price: 4.27, originalPrice: 11.64, sold: "1K+", rating: 4.8, shipsFrom: "temu", sellerShipping: 0 }),
  p("wrap-dogs", "open/41f0a8f010af42959b5a1446e316d31e-goods.jpeg", { name: "Dog Christmas Wrapping Paper Roll, 17.7 x 118 in", category: "Gift wrap", price: 4.17, originalPrice: 10.96, sold: "4.7K+", rating: 4.8, shipsFrom: "temu", sellerShipping: 0 }),
  p("wrap-santa", "fancy/4ba7a64f-40a8-42f9-8c4b-15f6ddc0336a.jpg", { name: "5pcs Christmas Gift Wrapping Paper, Santa and Reindeer", category: "Gift wrap", price: 4.94, originalPrice: 9.44, sold: "15K+", rating: 4.7, shipsFrom: "temu", sellerShipping: 0 }),
  p("wrap-cow", "fancy/5272cb84-3d12-4d0d-ba51-73d207b2c09e.jpg", { name: "Highland Cow Christmas Wrapping Paper Roll", category: "Gift wrap", price: 3.46, originalPrice: 12.99, sold: "15K+", rating: 4.8, shipsFrom: "temu", sellerShipping: 0 }),
  p("wrap-chicken", "open/e761444c0d6e447a9edd46ce525336a3-goods.jpeg", { name: "Funny Christmas Chicken Wrapping Paper Roll", category: "Gift wrap", price: 5.26, sold: "3K+", rating: 4.7, shipsFrom: "temu", sellerShipping: 0 }),
];

/**
 * Props for an <img>: uses the downloaded copy if `npm run fetch-images` has been run,
 * and falls back to Temu's CDN if it hasn't.   <img {...imageProps(product)} alt={product.name} />
 * Pass a gallery index (0-based) for the product page gallery.
 */
export function imageProps(product, galleryIndex = null) {
  const remote = galleryIndex == null ? product.img : product.gallery[galleryIndex];
  const local = galleryIndex == null ? product.localImg : `/products/${product.id}-${galleryIndex + 1}.jpg`;
  return { src: local, onError: (e) => { if (e.currentTarget.src !== remote) e.currentTarget.src = remote; } };
}
