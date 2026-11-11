import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Case Studies | Real Results',
  description: 'Explore real reputation management and content removal case studies from RepuKeel.',
  alternates: {
    canonical: canonicalFor('/case-studies'),
  },
  openGraph: {
    title: 'Case Studies & Results | RepuKeel',
    description: 'Explore real reputation management and content removal case studies from RepuKeel.',
    url: canonicalFor('/case-studies'),
  },
};

export default function CaseStudiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
