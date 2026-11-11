import { categories } from "@/data/services";
import { blogs } from "@/app/blogs/data";
import RemoveRequestButton from "@/app/components/RemoveRequestButton";
import ServiceIcon from "@/app/components/ServiceIcon";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { canonicalFor } from "@/lib/seo";
import Link from "next/link";
import AwdtsgRemovalContent from "./AwdtsgRemovalContent";

function renderBodyText(text: string) {
  if (!text.includes('[')) return text;
  const parts: (string | React.ReactNode)[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      <Link
        key={match.index}
        href={match[2]}
        className="text-[#20409a] underline hover:text-[#d4af37] transition-colors font-medium"
      >
        {match[1]}
      </Link>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return <>{parts}</>;
}

export async function generateStaticParams() {
  return categories.flatMap((cat) =>
    cat.subServices.map((sub) => ({
      category: cat.slug,
      slug: sub.slug,
    }))
  );
}

export async function generateMetadata({ params }: { params: Promise<{ category: string; slug: string }> }): Promise<Metadata> {
  const { category: categorySlug, slug } = await params;
  const category = categories.find((c) => c.slug === categorySlug);
  const service = category?.subServices.find((s) => s.slug === slug);
  if (!category || !service) return {};

  if (categorySlug === 'dating-reputation' && slug === 'awdtsg-removal') {
    const title = "Remove AWDTSG Posts About You";
    const description = "Want to remove an AWDTSG post about you? RepuKeel files privacy, harassment and copyright reports and watches for reposts. Request a free analysis.";
    return {
      title,
      description,
      alternates: {
        canonical: canonicalFor(`/${category.slug}/${service.slug}`),
      },
      openGraph: {
        title,
        description,
        url: canonicalFor(`/${category.slug}/${service.slug}`),
      },
      twitter: {
        title,
        description,
      },
    };
  }

  const canonicalUrl = canonicalFor(`/${category.slug}/${service.slug}`);

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

export default async function SubServicePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;

  const category = categories.find((c) => c.slug === categorySlug);
  const service = category?.subServices.find((s) => s.slug === slug);

  if (!category || !service) return notFound();

  // Find related blog posts that match this service or category
  const relatedBlogs = blogs.filter((b) => {
    return (
      b.content.includes(`/${category.slug}/${service.slug}`) ||
      b.content.toLowerCase().includes(service.name.toLowerCase()) ||
      (category.slug === 'content-removal' && (b.category === 'Reviews' || b.category === 'Reputation Management')) ||
      (category.slug === 'dating-reputation' && b.category === 'Social Media') ||
      (category.slug === 'monitoring-alerts' && b.category === 'Brand Protection') ||
      (category.slug === 'reputation-management' && b.category === 'Reputation Management')
    );
  }).slice(0, 3);
  const finalRelatedBlogs = relatedBlogs.length > 0 ? relatedBlogs : blogs.slice(0, 3);

  // Dedicated layout for AWDTSG removal
  if (service.slug === 'awdtsg-removal') {
    return (
      <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
        <AwdtsgRemovalContent
          categoryName={category.name}
          serviceName={service.name}
          ctaText={service.ctaText}
          modalTitle={service.modalTitle}
          modalSubtitle={service.modalSubtitle}
          inputPlaceholder={service.inputPlaceholder}
        />

        {/* Related Guides & Insights */}
        {finalRelatedBlogs.length > 0 && (
          <section className="border-t border-gray-200 py-16 sm:py-20 lg:py-24 bg-white">
            <div className="max-w-[1280px] mx-auto px-6">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="text-xs font-bold text-[#e0ac2f] uppercase tracking-[2px] block mb-1">Expert Advice</span>
                  <h2 className="text-2xl font-extrabold text-[#0a192f]">Related Guides &amp; Insights</h2>
                </div>
                <Link href="/blogs" className="text-sm font-bold text-[#20409a] hover:text-[#d4af37] transition-colors hidden sm:block">
                  View all articles &rarr;
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {finalRelatedBlogs.map((b) => (
                  <Link
                    key={b.slug}
                    href={`/blogs/${b.slug}`}
                    className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-6 hover:border-[#e0ac2f] hover:shadow-md transition-all group block no-underline"
                  >
                    <span className="text-xs font-bold text-[#e0ac2f] uppercase tracking-wider block mb-2">{b.category}</span>
                    <h3 className="text-[15px] font-bold text-[#0a192f] mb-2 group-hover:text-[#20409a] transition-colors line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 line-clamp-2">{b.meta}</p>
                    <span className="text-[12px] font-bold text-[#20409a] group-hover:text-[#d4af37] transition-colors mt-4 inline-block">
                      Read guide &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
      <div className="container py-6 sm:py-8 lg:py-12">

        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6 sm:mb-8 text-[12px] sm:text-[13px] font-[600] text-[var(--text-muted-navy)]">
          <span className="truncate max-w-[140px] sm:max-w-none">{category.name}</span>
          <span>›</span>
          <span className="text-[var(--gold)] truncate max-w-[160px] sm:max-w-none">{service.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ===== LEFT: Blog Content ===== */}
          <article>
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 bg-[rgba(217,165,43,0.1)] border border-[rgba(217,165,43,0.3)] rounded-full px-4 py-1.5 text-[12px] font-[700] text-[var(--gold)] uppercase tracking-widest mb-6">
              {category.name}
            </div>

            <h1 style={{ fontFamily: 'Poppins, sans-serif', color: '#000000', fontWeight: 800, lineHeight: 1.15, marginBottom: '16px' }}
              className="text-[26px] sm:text-[30px] lg:text-[36px]"
            >
              {service.heading}
            </h1>

            <p style={{ fontFamily: 'Poppins, sans-serif', color: '#374151', fontSize: '15px', lineHeight: 1.8, marginBottom: '28px' }}
              className="sm:text-[17px]"
            >
              {service.intro}
            </p>

            {service.bodySections.map((section, i) => (
              <div key={i} style={{ marginBottom: '24px' }}>
                <h2 style={{ fontFamily: 'Poppins, sans-serif', color: '#000000', fontSize: '18px', fontWeight: 700, marginBottom: '8px', marginTop: '24px' }}>
                  {section.heading}
                </h2>
                <p style={{ fontFamily: 'Poppins, sans-serif', color: '#374151', fontSize: '14px', lineHeight: 1.8 }}>
                  {renderBodyText(section.text)}
                </p>
              </div>
            ))}

            {/* Gold-accented bullet list */}
            <div className="bg-[var(--bg-soft)] rounded-xl p-6 border-l-4 border-[var(--gold)] mt-8 mb-8">
              <h3 style={{ fontFamily: 'Poppins, sans-serif', color: '#000000', fontSize: '16px', fontWeight: 700, marginBottom: '14px' }}>
                What We Do
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px', margin: 0, padding: 0, listStyle: 'none' }}>
                {service.bulletPoints.map((point, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontFamily: 'Poppins, sans-serif', color: '#374151', fontSize: '14px' }}>
                    <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#d9a52b', flexShrink: 0, marginTop: '6px', display: 'inline-block' }} />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <RemoveRequestButton
              serviceName={service.name}
              ctaText={service.ctaText}
              modalTitle={service.modalTitle}
              modalSubtitle={service.modalSubtitle}
              inputPlaceholder={service.inputPlaceholder}
            />
          </article>

          {/* ===== RIGHT: Icon — shown below content on mobile, sticky on desktop ===== */}
          <div className="lg:sticky lg:top-24 order-first lg:order-last">
            <ServiceIcon slug={service.slug} name={service.name} />
          </div>

        </div>

        {/* Related Guides & Insights */}
        {finalRelatedBlogs.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#e0ac2f] uppercase tracking-[2px] block mb-1">Expert Advice</span>
                <h2 className="text-2xl font-extrabold text-[#0a192f]">Related Guides &amp; Insights</h2>
              </div>
              <Link href="/blogs" className="text-sm font-bold text-[#20409a] hover:text-[#d4af37] transition-colors hidden sm:block">
                View all articles &rarr;
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {finalRelatedBlogs.map((b) => (
                <Link
                  key={b.slug}
                  href={`/blogs/${b.slug}`}
                  className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-6 hover:border-[#e0ac2f] hover:shadow-md transition-all group block no-underline"
                >
                  <span className="text-xs font-bold text-[#e0ac2f] uppercase tracking-wider block mb-2">{b.category}</span>
                  <h3 className="text-[15px] font-bold text-[#0a192f] mb-2 group-hover:text-[#20409a] transition-colors line-clamp-2">
                    {b.title}
                  </h3>
                  <p className="text-[13px] text-gray-500 line-clamp-2">{b.meta}</p>
                  <span className="text-[12px] font-bold text-[#20409a] group-hover:text-[#d4af37] transition-colors mt-4 inline-block">
                    Read guide &rarr;
                  </span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
