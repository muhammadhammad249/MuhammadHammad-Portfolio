import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    absolute: 'Online Reputation Management Blog | RepuKeel',
  },
  description: 'Expert guides, actionable strategies, and proven solutions for online reputation management, review removal, search result suppression, and digital brand protection.',
  alternates: {
    canonical: canonicalFor('/blogs'),
  },
  openGraph: {
    title: 'Online Reputation Management Blog | RepuKeel',
    description: 'Expert guides, actionable strategies, and proven solutions for online reputation management, review removal, search result suppression, and digital brand protection.',
    url: canonicalFor('/blogs'),
    type: 'website',
  },
};

export default function BlogsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
