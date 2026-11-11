import { getAllProducts } from "./products";

export default async function filters() {
  const { products } = await getAllProducts(1, 100);
  
  let minPrice = 0;
  let maxPrice = 1000; // default max

  if (products && products.length > 0) {
    const prices = products.map(p => p.price);
    const actualMin = Math.min(...prices);
    const actualMax = Math.max(...prices);

    // Rounding logic: 170-630 -> 100-700
    minPrice = Math.floor(actualMin / 100) * 100;
    maxPrice = Math.ceil(actualMax / 100) * 100;
  }

  return {
    price: {
      min: minPrice,
      max: maxPrice,
    },
    sort: [
      "Featured",
      "New Arrivals",
      "Price: Low to High",
      "Price: High to Low",
      "Name (A-Z)"
    ],
  };
}
