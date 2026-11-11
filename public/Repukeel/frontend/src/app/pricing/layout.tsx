import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Transparent Pricing & Plans',
  description: 'View transparent pricing for our reputation management and content removal services. No hidden fees. Get a free custom quote today.',
  alternates: {
    canonical: canonicalFor('/pricing'),
  },
  openGraph: {
    title: 'Transparent Pricing & Plans | RepuKeel',
    description: 'View transparent pricing for our reputation management and content removal services. No hidden fees. Get a free custom quote today.',
    url: canonicalFor('/pricing'),
  },
};

export default function PricingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
