import { getProductById } from "@/app/api/products/products";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  try {
    const product = await getProductById(slug);
    if (!product) return { title: "Product Not Found" };
    
    return {
      title: product.name,
      description: product.description?.substring(0, 160) || `Buy ${product.name} on Prolixus.`,
      openGraph: {
        title: product.name,
        description: product.description?.substring(0, 160),
        images: product.image ? [product.image] : [],
      },
    };
  } catch (error) {
    return { title: "Product" };
  }
}

export default function ProductLayout({ children }) {
  return <>{children}</>;
}
