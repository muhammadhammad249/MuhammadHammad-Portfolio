import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Request Free Reputation Analysis',
  description: 'Request a free, confidential reputation analysis and risk assessment from the RepuKeel team.',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: canonicalFor('/request-free-analysis'),
  },
  openGraph: {
    title: 'Request Free Reputation Analysis | RepuKeel',
    description: 'Request a free, confidential reputation analysis and risk assessment from the RepuKeel team.',
    url: canonicalFor('/request-free-analysis'),
  },
  twitter: {
    title: 'Request Free Reputation Analysis | RepuKeel',
    description: 'Request a free, confidential reputation analysis and risk assessment from the RepuKeel team.',
  },
};

export default function RequestFreeAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
