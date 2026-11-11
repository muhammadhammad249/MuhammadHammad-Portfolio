/* eslint-disable */
import "./globals.css";
import type { Metadata, Viewport } from "next";
import Script from "next/script";

import GlobalLayoutWrapper from "./components/GlobalLayoutWrapper";
import Chatbot from "./components/Chatbot";

export const metadata: Metadata = {
  metadataBase: new URL('https://repukeel.com'),
  title: {
    default: "RepuKeel | Premium Reputation & Brand Protection Worldwide",
    template: "%s | RepuKeel"
  },
  description: "Fast, effective reputation and DMCA takedown service. Protecting your intellectual property from piracy and unauthorized use across all platforms globally.",
  authors: [{ name: "RepuKeel Team" }],
  creator: "RepuKeel",
  publisher: "RepuKeel",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://repukeel.com",
    siteName: "RepuKeel",
    images: [
      {
        url: "/icon.jpg",
        width: 1200,
        height: 630,
        alt: "RepuKeel Brand Protection",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/icon.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "RepuKeel",
              "alternateName": ["RepuKeel", "RepuKeel Reputation"],
              "url": "https://repukeel.com",
              "logo": "https://repukeel.com/icon.jpg",
              "description": "RepuKeel specializes in online reputation management, DMCA takedowns, and global brand protection.",
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+923087525510",
                "contactType": "customer service"
              },
              "sameAs": [
                "https://www.facebook.com/RepuKeel/",
                "https://x.com/Repukeel",
                "https://www.linkedin.com/company/repukeel",
                "https://www.instagram.com/repukeel/"
              ]
            })
          }}
        />
      </head>
      <body style={{ margin: 0, padding: 0 }}>
        {/* Google Analytics 4 */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YJ5E3P9TVV"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YJ5E3P9TVV');
          `}
        </Script>
        <GlobalLayoutWrapper>{children}</GlobalLayoutWrapper>
        
        {/* Global Floating Action Buttons */}
        <div className="fixed bottom-8 right-8 z-[999] flex flex-row items-center gap-4">
          {/* Chatbot Functional Widget */}
          <Chatbot />

          {/* WhatsApp FAB */}
          <a 
            href="https://wa.me/923087525510" 
            className="w-[60px] h-[60px] rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(37,211,102,0.5)] transition-transform hover:scale-105 bg-[#25d366] text-white relative z-10 animate-bounce" 
            target="_blank" 
            rel="noopener noreferrer" 
            aria-label="Chat on WhatsApp"
          >
            {/* Soft huge background glow specifically for WhatsApp */}
            <div className="absolute inset-0 rounded-full bg-[#25d366] opacity-30 blur-[20px] -z-10 scale-[1.5]"></div>
            
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-[34px] h-[34px]" aria-hidden="true" focusable="false">
              <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.2-1.4A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.1-1.1l-.3-.2-3 .8.8-3-.2-.3A8 8 0 1 1 12 20zm4.3-5.9c-.2-.1-1.4-.7-1.6-.8-.2-.1-.4-.1-.6.1-.2.3-.7.8-.9 1-.1.2-.3.2-.5.1a9 9 0 0 1-2-1.2 7.5 7.5 0 0 1-1.4-1.7c-.1-.3 0-.4.2-.5l.5-.5.3-.5.1-.5-1-2.3c-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.3C8.3 8.5 7.5 9.5 7.5 11s1 2.8 1.2 3 2 3.2 5 4.4c2.5 1 3 .8 3.5.8s1.7-.7 2-1.4.3-1.3.2-1.4z"/>
            </svg>
            
            {/* Notification Bubble */}
            <span className="absolute -top-1 -right-1 w-[22px] h-[22px] rounded-full bg-[#ef4444] text-white text-[13px] font-[800] flex items-center justify-center border-[3px] border-white shadow-sm leading-none pt-[1px]">1</span>
          </a>
        </div>
      </body>
    </html>
  );
}

