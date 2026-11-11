import { blogs } from "../data";
import { notFound } from "next/navigation";
import { Metadata } from 'next';
import { canonicalFor, SITE_URL } from '@/lib/seo';
import Link from 'next/link';

export async function generateStaticParams() {
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const blog = blogs.find((b) => b.slug === decodedSlug);
  if (!blog) return {};

  const canonicalUrl = canonicalFor(`/blogs/${blog.slug}`);

  return {
    title: blog.title,
    description: blog.meta || blog.title,
    authors: [{ name: 'RepuKeel Team' }],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      title: blog.title,
      description: blog.meta || blog.title,
      url: canonicalUrl,
      publishedTime: blog.datePublished,
      authors: ['RepuKeel Team'],
      siteName: 'RepuKeel',
    },
  };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const decodedSlug = decodeURIComponent(resolvedParams.slug);
  const blog = blogs.find((b) => b.slug === decodedSlug);

  if (!blog) {
    notFound();
  }

  const canonicalUrl = canonicalFor(`/blogs/${blog.slug}`);

  // Related posts: same category, excluding current, max 3
  const relatedPosts = blogs
    .filter((b) => b.category === blog.category && b.slug !== blog.slug)
    .slice(0, 3);
  // If not enough same-category posts, fill with recent from other categories
  if (relatedPosts.length < 3) {
    const needed = 3 - relatedPosts.length;
    const extras = blogs
      .filter((b) => b.slug !== blog.slug && !relatedPosts.find(r => r.slug === b.slug))
      .slice(0, needed);
    relatedPosts.push(...extras);
  }

  // BreadcrumbList JSON-LD
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": SITE_URL,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": `${SITE_URL}/blogs`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": blog.title,
        "item": canonicalUrl,
      },
    ],
  };

  // Article JSON-LD
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "description": blog.meta,
    "datePublished": blog.datePublished,
    "dateModified": blog.datePublished,
    "author": {
      "@type": "Organization",
      "name": "RepuKeel Team",
      "url": SITE_URL,
    },
    "publisher": {
      "@type": "Organization",
      "name": "RepuKeel",
      "url": SITE_URL,
      "logo": {
        "@type": "ImageObject",
        "url": `${SITE_URL}/icon.jpg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": canonicalUrl,
    },
  };

  return (
    <div className="min-h-screen bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />

      <div className="container mx-auto px-4 py-24 max-w-3xl">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="text-sm mb-8 flex items-center gap-2 text-gray-500">
          <Link href="/" className="hover:text-[#e0ac2f] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/blogs" className="hover:text-[#e0ac2f] transition-colors">Blog</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium truncate max-w-[300px]">{blog.title}</span>
        </nav>

        <h1 className="text-4xl font-extrabold mb-6 text-black leading-tight">{blog.title}</h1>

        <div className="flex items-center gap-4 mb-10 border-b border-gray-200 pb-6">
          <div className="w-10 h-10 bg-[#e0ac2f] rounded-full flex items-center justify-center text-black font-bold">R</div>
          <div>
            <p className="text-black font-semibold">RepuKeel Team</p>
            <p className="text-gray-500 text-sm">
              {new Date(blog.datePublished).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>
      
        <article 
          className="prose prose-lg max-w-none text-gray-700 prose-headings:text-black prose-a:text-[#e0ac2f]"
          dangerouslySetInnerHTML={{ __html: blog!.content }}
        />

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="mt-16 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-[800] text-black mb-8">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="bg-[#f8f9fa] border border-gray-100 rounded-2xl p-6 hover:shadow-md transition-shadow group no-underline"
                >
                  <div className="text-[12px] font-[700] text-[#e0ac2f] uppercase tracking-wider mb-2">{post.category}</div>
                  <h3 className="text-[15px] font-[700] text-black mb-3 group-hover:text-[#e0ac2f] transition-colors line-clamp-3">{post.title}</h3>
                  <p className="text-[13px] text-gray-500 line-clamp-2">{post.meta}</p>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
