import Link from "next/link";
import { categories } from "@/data/services";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';

export async function generateStaticParams() {
  return categories.map((cat) => ({
    category: cat.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return {};

  const canonicalUrl = canonicalFor(`/${category.slug}`);

  return {
    title: category.name,
    description: `Explore our professional ${category.name} solutions. RepuKeel provides specialized services for ${category.name.toLowerCase()}.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${category.name} | RepuKeel`,
      description: `Explore our professional ${category.name} solutions. RepuKeel provides specialized services for ${category.name.toLowerCase()}.`,
      url: canonicalUrl,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categorySlug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) return notFound();

  return (
    <div className="max-w-[1280px] mx-auto px-6 py-12">
      <div className="bg-[#0a152e] rounded-lg px-6 py-5 flex items-center gap-3 mb-8">
        <span className="text-2xl" aria-hidden="true">{category.icon}</span>
        <h1 className="text-white text-2xl font-bold">{category.name}</h1>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {category.subServices.map((service) => (
          <Link
            key={service.slug}
            href={`/${category.slug}/${service.slug}`}
            className="bg-[#f0f4f8] hover:bg-[#e2e8f0] border border-[var(--border-light)] transition rounded-xl px-6 py-5 font-bold text-gray-900 shadow-sm hover:shadow-md"
          >
            {service.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
