import { Metadata } from 'next';
import { canonicalFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Remove Harmful Content & Protect Your Work',
  description:
    'Get help with negative or harmful content about you online, and with stolen or copyrighted content. Tell us what you found and see your options.',
  alternates: {
    canonical: canonicalFor('/protection'),
  },
  openGraph: {
    title: 'Remove Harmful Content & Protect Your Work',
    description:
      'Get help with negative or harmful content about you online, and with stolen or copyrighted content. Tell us what you found and see your options.',
    url: canonicalFor('/protection'),
  },
  twitter: {
    title: 'Remove Harmful Content & Protect Your Work',
    description:
      'Get help with negative or harmful content about you online, and with stolen or copyrighted content. Tell us what you found and see your options.',
  },
};

export default function ProtectionLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
