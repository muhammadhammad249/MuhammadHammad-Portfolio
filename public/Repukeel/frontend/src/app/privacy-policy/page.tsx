import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'RepuKeel Privacy Policy. Learn how we handle, protect, and process client information and case data.',
  alternates: {
    canonical: canonicalFor('/privacy-policy'),
  },
  openGraph: {
    title: 'Privacy Policy | RepuKeel',
    description: 'RepuKeel Privacy Policy. Learn how we handle, protect, and process client information and case data.',
    url: canonicalFor('/privacy-policy'),
  },
};

export default function PrivacyPolicyPage() {
  const sections = ["Information We Collect","How We Use Your Information","Information Sharing & Disclosure","Data Security","Cookies & Tracking","Your Rights","Third-Party Links","Children's Privacy","Changes to This Policy","Contact"];
  return (
    <div className="container mx-auto px-4 py-24 max-w-5xl">
      <h1 className="text-4xl font-extrabold mb-2">Privacy Policy</h1>
      <p className="text-slate-500 mb-12">Last updated: September 2026</p>
      <div className="grid md:grid-cols-4 gap-12">
        <aside className="md:col-span-1">
          <div className="sticky top-24 bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <p className="font-bold text-sm text-slate-700 mb-3">Contents</p>
            <nav className="space-y-2">
              {sections.map((s, i) => (
                <a key={s} href={`#section-${i+1}`} className="block text-xs text-slate-600 hover:text-blue-600 hover:translate-x-1 transition-transform">{i+1}. {s}</a>
              ))}
            </nav>
          </div>
        </aside>
        <div className="md:col-span-3 space-y-12">
          {sections.map((s, i) => (
            <section key={s} id={`section-${i+1}`}>
              <h2 className="text-xl font-bold mb-4">{i+1}. {s}</h2>
              <div className="text-slate-600 leading-relaxed space-y-3">
                <p>This section covers our policy regarding {s.toLowerCase()}. We are committed to protecting your privacy and handling your data in an open and transparent manner.</p>
                <p>If you have any questions about how we handle this aspect of your privacy, please contact our Data Protection Officer at privacy@repukeel.com.</p>
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
}
