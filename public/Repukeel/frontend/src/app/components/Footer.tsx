import Link from 'next/link';
import Image from 'next/image';
import FooterContactButton from './FooterContactButton';
import { footerSocialBrands } from '@/data/socialBrands';

export default function Footer() {
  return (
    <footer className="w-full bg-[#0a152e] text-[var(--text-on-navy)] font-['Poppins']">
      <div className="max-w-[1280px] mx-auto px-8 pt-20 pb-10">

        {/* Top 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-16 mb-16 border-b border-white/10 pb-16">

          {/* Column 1: Brand & Status */}
          <div className="flex flex-col gap-8">

            <Link href="/" className="inline-flex items-center">
              <Image
                src="/logo.png"
                alt="RepuKeel Logo"
                width={180}
                height={52}
                className="h-[52px] w-auto object-contain"
                style={{ filter: 'brightness(0) invert(1)' }}
              />
            </Link>

            {/* Social Media */}
            <div>
              <p className="text-[14px] font-[600] text-white mb-4">
                Connect With Us
              </p>

              <div className="flex items-center gap-4">
                {footerSocialBrands.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="w-10 h-10 rounded-full bg-white hover:bg-gray-100 transition-all duration-150 ease-in-out hover:-translate-y-0.5 hover:shadow-md flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a152e] shrink-0"
                    >
                      <Icon className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Column 2: Brand Protection Solutions */}
          <div>
            <h4
              className="text-[17px] font-[700] mb-6"
              style={{ color: '#d4af37' }}
            >
              Brand Protection Solutions
            </h4>

            <ul className="flex flex-col gap-4 text-[14px] text-gray-300">
              <li>
                <Link href="/protection" className="hover:text-white transition-colors">
                  Content Protection
                </Link>
              </li>

              <li>
                <Link href="/monitoring-alerts/social-media-reputation-monitoring" className="hover:text-white transition-colors">
                  Social Media Monitoring
                </Link>
              </li>

              <li>
                <Link href="/monitoring-alerts/dark-web-data-leak-monitoring" className="hover:text-white transition-colors">
                  Dark Web &amp; Leak Monitoring
                </Link>
              </li>

              <li>
                <Link href="/dating-reputation/social-media-takedowns" className="hover:text-white transition-colors">
                  Fake Profile &amp; Impersonation Removal
                </Link>
              </li>

              <li>
                <Link href="/reputation-management" className="hover:text-white transition-colors">
                  Online Reputation Management
                </Link>
              </li>

              <li>
                <Link href="/dating-reputation/tea-app-checker-removal" className="hover:text-white transition-colors">
                  Tea App Content Removal
                </Link>
              </li>

              <li>
                <Link href="/search-result-cleanup/youtube-video-result-suppression" className="hover:text-white transition-colors">
                  YouTube &amp; Video Suppression
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Content Protection Solutions */}
          <div>
            <h4
              className="text-[17px] font-[700] mb-6"
              style={{ color: '#d4af37' }}
            >
              Content Protection Solutions
            </h4>

            <ul className="flex flex-col gap-4 text-[14px] text-gray-300">
              <li>
                <Link href="/dating-reputation/image-protection" className="hover:text-white transition-colors">
                  Stolen Image Protection
                </Link>
              </li>

              <li>
                <Link href="/content-removal/tiktok-content-removal" className="hover:text-white transition-colors">
                  TikTok Content Removal
                </Link>
              </li>

              <li>
                <Link href="/content-removal/instagram-content-removal" className="hover:text-white transition-colors">
                  Instagram Content Removal
                </Link>
              </li>

              <li>
                <Link href="/dating-reputation/awdtsg-removal" className="hover:text-white transition-colors">
                  AWDTSG Post Removal
                </Link>
              </li>

              <li>
                <Link href="/content-removal/mugshot-removal-suppression" className="hover:text-white transition-colors">
                  Mugshot Removal &amp; Suppression
                </Link>
              </li>

              <li>
                <Link href="/search-result-cleanup/news-article-removal" className="hover:text-white transition-colors">
                  News Article Removal
                </Link>
              </li>

              <li>
                <Link href="/search-result-cleanup/google-suppression-de-indexing" className="hover:text-white transition-colors">
                  Google De-Indexing &amp; Suppression
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Review & Record Removal */}
          <div>
            <h4
              className="text-[17px] font-[700] mb-6"
              style={{ color: '#d4af37' }}
            >
              Review &amp; Record Removal
            </h4>

            <ul className="flex flex-col gap-4 text-[14px] text-gray-300">
              <li>
                <Link href="/content-removal/google-review-removal" className="hover:text-white transition-colors">
                  Google Review Removal
                </Link>
              </li>

              <li>
                <Link href="/content-removal/trustpilot-review-removal" className="hover:text-white transition-colors">
                  Trustpilot Review Removal
                </Link>
              </li>

              <li>
                <Link href="/content-removal/fake-review-removal" className="hover:text-white transition-colors">
                  Fake Review Removal
                </Link>
              </li>

              <li>
                <Link href="/content-removal/bbb-review-removal" className="hover:text-white transition-colors">
                  BBB Review Removal
                </Link>
              </li>

              <li>
                <Link href="/content-removal/facebook-review-removal" className="hover:text-white transition-colors">
                  Facebook Review Removal
                </Link>
              </li>

              <li>
                <Link href="/content-removal/indeed-review-removal" className="hover:text-white transition-colors">
                  Indeed Review Removal
                </Link>
              </li>

              <li>
                <Link href="/content-removal/travel-hospitality-review-removal" className="hover:text-white transition-colors">
                  Travel &amp; Hospitality Review Removal
                </Link>
              </li>

              <li>
                <Link href="/job-reputation/glassdoor-employer-review-cleanup" className="hover:text-white transition-colors">
                  Glassdoor Review Cleanup
                </Link>
              </li>

              <li>
                <Link href="/job-reputation/background-check-cleanup" className="hover:text-white transition-colors">
                  Background Check Cleanup
                </Link>
              </li>

              <li>
                <Link href="/content-removal/ripoff-report-removal" className="hover:text-white transition-colors">
                  Ripoff Report Removal
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Contact & Quick Links */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-16 mb-16">

          {/* Contact */}
          <div>
            <h4
              className="text-[17px] font-[700] mb-6 border-b border-white/10 pb-4"
              style={{ color: '#d4af37' }}
            >
              Contact
            </h4>

            <ul className="flex flex-col gap-5 text-[14px] text-gray-300">

              {/* Headquarters */}
              <li className="flex items-start flex-col gap-1">
                <span className="font-[600] text-white">
                  Headquarters:
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-[var(--gold)]">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </span>

                  <span>
                    P33H+GVV, G-7/4, Islamabad, Pakistan
                  </span>
                </div>
              </li>

              {/* Email */}
              <li className="flex items-start flex-col gap-1">
                <span className="font-[600] text-white">
                  Email:
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-white">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5"
                    >
                      <rect
                        x="3"
                        y="5"
                        width="18"
                        height="14"
                        rx="2"
                        ry="2"
                      />
                      <path d="M3 7l9 6 9-6" />
                    </svg>
                  </span>

                  <a
                    href="mailto:Legal@Repukeel.com"
                    className="hover:text-[var(--gold)] transition-colors"
                  >
                    Legal@Repukeel.com
                  </a>
                </div>
              </li>

              {/* WhatsApp */}
              <li className="flex items-start flex-col gap-1">
                <span className="font-[600] text-white">
                  Phone / WhatsApp:
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-white">
                    <svg viewBox="0 0 24 24" fill="#25D366" className="w-5 h-5" aria-hidden="true" focusable="false">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                    </svg>
                  </span>

                  <a
                    href="https://wa.me/923087525510"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[var(--gold)] transition-colors"
                  >
                    +92 308 752 5510
                  </a>
                </div>
              </li>

            </ul>

          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="text-[17px] font-[700] mb-6 border-b border-white/10 pb-4"
              style={{ color: '#d4af37' }}
            >
              Quick Links
            </h4>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 text-[14px] text-gray-300">
              <Link href="/about" className="hover:text-white transition-colors">
                About Us
              </Link>

              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>

              <Link href="/tools" className="hover:text-white transition-colors">
                Free Tools
              </Link>

              <Link href="/clients" className="hover:text-white transition-colors">
                Our Clients
              </Link>

              <Link
                href="/request-free-analysis"
                className="hover:text-white transition-colors"
              >
                Request Free Analysis
              </Link>

              <Link
                href="/case-studies"
                className="hover:text-white transition-colors"
              >
                Case Studies
              </Link>

              <Link
                href="/privacy-policy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>

              <Link
                href="/blogs"
                className="hover:text-white transition-colors"
              >
                Blog
              </Link>

              <Link
                href="/terms-conditions"
                className="hover:text-white transition-colors"
              >
                Terms &amp; Conditions
              </Link>

              <Link
                href="/faq"
                className="hover:text-white transition-colors"
              >
                FAQ
              </Link>

              <Link
                href="/pricing"
                className="hover:text-white transition-colors"
              >
                Pricing
              </Link>
            </div>
          </div>
        </div>

        {/* 24/7 Emergency Strip */}
        <div className="w-full bg-[#121c36] rounded-[16px] p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-12 shadow-lg">

          <div>
            <h3 className="text-[20px] font-[700] text-white mb-2">
              24/7 Emergency DMCA Support
            </h3>

            <p className="text-[15px] text-gray-400">
              Need immediate takedown assistance? Our legal team is available around the clock.
            </p>
          </div>

          {/* Contact Us Button */}
          <FooterContactButton />
        </div>

        {/* Copyright */}
        <div className="text-center text-[13px] text-gray-400 flex flex-col gap-2 items-center justify-center">

          <p>
            RepuKeel - Online Reputation Management company. All Right Reserved
          </p>

          <p>
            Professional Reputation Management Service and Digital Brand Protection
          </p>

          <div className="flex gap-4 mt-2">

            <Link
              href="/privacy-policy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>

            <span className="text-gray-600">|</span>

            <Link
              href="/terms-conditions"
              className="hover:text-white transition-colors"
            >
              Terms &amp; Conditions
            </Link>

            <span className="text-gray-600">|</span>

            <Link
              href="/faq"
              className="hover:text-white transition-colors"
            >
              FAQ
            </Link>

          </div>
        </div>

      </div>
    </footer>
  );
}