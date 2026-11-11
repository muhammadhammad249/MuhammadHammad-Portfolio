/* eslint-disable */
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { blogs as rawBlogs } from './data';

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  // Dummy data (empty for now to show the empty state requested)
  const categories = ['All', 'Reputation Management', 'DMCA', 'Brand Protection', 'Social Media', 'Reviews'];
  const tags = ['DMCA', 'Piracy', 'OnlyFans', 'Google', 'Defamation', 'Social Media', 'Trustpilot'];

  // Map the raw blogs from data.ts into the format needed for the UI
  const allBlogs = rawBlogs.map((b, i) => {
    return {
      id: i + 1,
      title: b.title,
      slug: b.slug,
      category: b.category,
      excerpt: b.meta,
      date: new Date(b.datePublished).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      tag: b.category
    };
  });

  const blogs = allBlogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = activeCategory === 'All' || blog.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[var(--bg-soft)]">
      
      {/* ================= HERO ================= */}
      <section className="w-full bg-white pt-24 pb-32">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl font-[800] tracking-tight mb-4 text-black">
            Insights & News
          </h1>
          <p className="text-[16px] text-gray-600 max-w-2xl mx-auto mb-10">
            Expert advice, company news, and the latest updates on digital rights management.
          </p>

          {/* Search Bar */}
          <div className="max-w-xl mx-auto bg-white rounded-full p-2 flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.2)]">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent px-4 py-2 outline-none text-[15px] text-[var(--text-heading)]"
            />
            <button className="w-10 h-10 rounded-full bg-[var(--gold)] text-[var(--bg-navy)] flex items-center justify-center hover:scale-105 transition-transform">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}
      <section className="container relative z-10 -mt-16 pb-24 grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Sidebar */}
        <div className="lg:col-span-1 flex flex-col gap-8 bg-white border border-[var(--border-light)] rounded-2xl p-6 shadow-sm">
          
          <div>
            <h3 className="text-[18px] font-[800] text-[var(--text-heading)] mb-4">Categories</h3>
            <ul className="flex flex-col gap-3">
              {categories.map((cat) => (
                <li key={cat}>
                  <Link 
                    href={cat === 'All' ? '/blogs' : `/blogs?category=${encodeURIComponent(cat)}`}
                    onClick={(e) => {
                      e.preventDefault();
                      setActiveCategory(cat);
                    }}
                    className={`text-[14px] font-[600] transition-colors block ${
                      activeCategory === cat ? 'text-[var(--gold)]' : 'text-[var(--text-body)] hover:text-[var(--gold)]'
                    }`}
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[18px] font-[800] text-[var(--text-heading)] mb-4">Popular Tags</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blogs?tag=${encodeURIComponent(tag)}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setSearchQuery(tag);
                  }}
                  className="px-3 py-1.5 rounded-full bg-[var(--bg-soft)] text-[12px] font-[600] text-[var(--text-heading)] border border-[var(--border-light)] hover:border-[var(--gold)] transition-colors inline-block"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
          
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          {blogs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {blogs.map(blog => (
                <div key={blog.id} className="bg-white border border-[var(--border-light)] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="text-[12px] font-[700] text-[var(--gold)] uppercase tracking-wider mb-2">{blog.category}</div>
                  <h3 className="text-[18px] font-[800] text-[var(--text-heading)] mb-3">
                    <Link href={`/blogs/${blog.slug}`} className="hover:text-[var(--gold)] transition-colors">
                      {blog.title}
                    </Link>
                  </h3>
                  <p className="text-[14px] text-[var(--text-body)] mb-4">{blog.excerpt}</p>
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-[12px] text-[var(--text-muted-navy)] font-[600]">{blog.date}</span>
                    <Link
                      href={`/blogs/${blog.slug}`}
                      className="text-[13px] font-[700] text-[var(--bg-navy)] hover:text-[var(--gold)] transition-colors"
                      aria-label={`Read guide: ${blog.title}`}
                    >
                      Read Guide &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="relative overflow-hidden bg-[#111d40] border border-[rgba(217,165,43,0.3)] rounded-2xl p-16 flex flex-col items-center justify-center text-center shadow-[0_0_40px_rgba(217,165,43,0.12)]">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--gold)] rounded-full mix-blend-screen filter blur-[80px] opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500 rounded-full mix-blend-screen filter blur-[80px] opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
              
              <div className="relative z-10">
                <div className="w-20 h-20 rounded-full bg-[rgba(217,165,43,0.1)] flex items-center justify-center text-[var(--gold)] mx-auto mb-6 shadow-[0_0_20px_rgba(217,165,43,0.2)]">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <h3 className="text-[22px] font-[800] mb-3" style={{ color: '#ffffff' }}>No articles found</h3>
                <p className="text-[15px] max-w-md mx-auto mb-8" style={{ color: '#c8d0e7' }}>
                  We couldn't find any articles matching your current filters. Our team is constantly publishing new insights on digital rights and brand protection.
                </p>
                <Link href="/contact" className="btn btn-gold-solid">
                  Contact Our Experts
                </Link>
              </div>
            </div>
          )}
        </div>
        
      </section>

    </div>
  );
}
