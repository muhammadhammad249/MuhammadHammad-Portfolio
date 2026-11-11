import { permanentRedirect, notFound } from 'next/navigation';
import { categories } from '@/data/services';
import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const allSubServices = categories.flatMap(c => c.subServices);
  const service = allSubServices.find(s => s.slug === slug);
  if (!service) return {};

  const canonicalUrl = canonicalFor(`/${service.categorySlug}/${service.slug}`);

  return {
    title: service.name,
    description: service.intro,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `${service.name} | RepuKeel`,
      description: service.intro,
      url: canonicalUrl,
    },
  };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const allSubServices = categories.flatMap(c => c.subServices);
  const service = allSubServices.find(s => s.slug === slug);

  if (service) {
    permanentRedirect(`/${service.categorySlug}/${service.slug}`);
  }

  return notFound();
}
