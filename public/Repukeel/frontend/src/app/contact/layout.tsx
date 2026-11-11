import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with RepuKeel for a free, confidential reputation analysis and consultation.',
  alternates: {
    canonical: canonicalFor('/contact'),
  },
  openGraph: {
    title: 'Contact Us | RepuKeel',
    description: 'Get in touch with RepuKeel for a free, confidential reputation analysis and consultation.',
    url: canonicalFor('/contact'),
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
