import { Metadata } from 'next';
import HomeClient from './HomeClient';
import RemovalProofGallery from './components/RemovalProofGallery';
import { canonicalFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'RepuKeel | Online Reputation Management Company Worldwide',
  description: 'At RepuKeel Reputation, we remove harmful online content, repair search results, and protect your reputation — fast, confidentially, and with proven results.',
  alternates: {
    canonical: canonicalFor('/'),
  },
  openGraph: {
    title: 'RepuKeel | Online Reputation Management Company Worldwide',
    description: 'At RepuKeel Reputation, we remove harmful online content, repair search results, and protect your reputation — fast, confidentially, and with proven results.',
    url: canonicalFor('/'),
  },
};

export default function Home() {
  return <HomeClient proofGallery={<RemovalProofGallery variant="compact" limit={3} />} />;
}
