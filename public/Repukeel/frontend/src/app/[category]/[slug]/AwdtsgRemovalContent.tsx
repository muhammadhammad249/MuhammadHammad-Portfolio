import Link from "next/link";
import RemoveRequestButton from "@/app/components/RemoveRequestButton";

interface AwdtsgRemovalContentProps {
  categoryName: string;
  serviceName: string;
  ctaText?: string;
  modalTitle?: string;
  modalSubtitle?: string;
  inputPlaceholder?: string;
}

export default function AwdtsgRemovalContent({
  categoryName,
  serviceName,
  ctaText = "Get AWDTSG Posts Removed",
  modalTitle,
  modalSubtitle,
  inputPlaceholder,
}: AwdtsgRemovalContentProps) {
  return (
    <div className="w-full">
      {/* 1. Hero Band (White) */}
      <section className="w-full bg-white py-12 sm:py-16 lg:py-20">
        <div className="max-w-[1280px] mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex flex-wrap items-center gap-1.5 mb-8 text-[12px] sm:text-[13px] font-[600] text-[#9aa4c0]">
            <span className="truncate max-w-[140px] sm:max-w-none">{categoryName}</span>
            <span>›</span>
            <span className="text-[#d9a52b] truncate max-w-[160px] sm:max-w-none">{serviceName}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#000000] tracking-tight mb-6">
            Remove AWDTSG posts about you
          </h1>

          <p className="text-[16px] sm:text-[18px] text-[#374151] leading-relaxed max-w-[70ch] mb-8">
            If you want to remove an AWDTSG post about you, RepuKeel can help. AWDTSG stands for &quot;Are We Dating The Same Guy?&quot;, a network of local Facebook groups where members share photos, screenshots and stories about men they have dated. A post about you can reach thousands of members, and you usually get no chance to reply. Tell us what you found and we will explain what can realistically be done.
          </p>

          <div>
            <RemoveRequestButton
              serviceName={serviceName}
              ctaText={ctaText}
              modalTitle={modalTitle}
              modalSubtitle={modalSubtitle}
              inputPlaceholder={inputPlaceholder}
            />
          </div>
        </div>
      </section>

      {/* 2. Why these posts are hard to remove (Light Gray) */}
      <section className="w-full bg-[#f8fafc] border-y border-slate-200/60 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight mb-6">
            Why these posts are hard to remove
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#374151] leading-relaxed max-w-[70ch]">
            Most AWDTSG groups are private, so only the group administrators and Facebook can take a post down. Facebook judges a post against its own rules on privacy, harassment and images shared without consent. It does not decide whether the story is true. Members also screenshot posts and pass them around, so a post can outlive the thread it started in. Some copies end up in other groups, on Reddit or on TikTok.
          </p>
        </div>
      </section>

      {/* 3. How we remove AWDTSG posts (White) */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight mb-8">
            How we remove AWDTSG posts
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] transition-colors h-full flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[rgba(217,165,43,0.12)] border border-[rgba(217,165,43,0.3)] text-[#d9a52b] font-extrabold flex items-center justify-center text-base mb-5 shrink-0">
                1
              </div>
              <h3 className="text-[17px] font-bold text-[#0a192f] mb-3 leading-snug">
                You send what you have.
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                A link to the post is best. A screenshot also works, and so does the name of the group.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] transition-colors h-full flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[rgba(217,165,43,0.12)] border border-[rgba(217,165,43,0.3)] text-[#d9a52b] font-extrabold flex items-center justify-center text-base mb-5 shrink-0">
                2
              </div>
              <h3 className="text-[17px] font-bold text-[#0a192f] mb-3 leading-snug">
                We review the post against the rules it may break.
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                If it uses your photos or messages, copyright can apply as well as privacy and harassment.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] transition-colors h-full flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[rgba(217,165,43,0.12)] border border-[rgba(217,165,43,0.3)] text-[#d9a52b] font-extrabold flex items-center justify-center text-base mb-5 shrink-0">
                3
              </div>
              <h3 className="text-[17px] font-bold text-[#0a192f] mb-3 leading-snug">
                We send removal requests to the group administrators and to Facebook&apos;s trust and safety teams.
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                When a first request is refused, we escalate under the platform&apos;s harassment and privacy policies.
              </p>
            </div>

            {/* Step 4 */}
            <div className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] transition-colors h-full flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[rgba(217,165,43,0.12)] border border-[rgba(217,165,43,0.3)] text-[#d9a52b] font-extrabold flex items-center justify-center text-base mb-5 shrink-0">
                4
              </div>
              <h3 className="text-[17px] font-bold text-[#0a192f] mb-3 leading-snug">
                We look for reposts.
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                After a post comes down, we check mirror groups for copies and report what we find.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. What we can help remove (Light Gray) */}
      <section className="w-full bg-[#f8fafc] border-y border-slate-200/60 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight mb-8">
            What we can help remove
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] transition-colors h-full flex items-center">
              <p className="text-[15px] sm:text-[16px] text-[#374151] leading-relaxed font-medium">
                Screenshots of your dating app chats or profile
              </p>
            </div>

            <div className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] transition-colors h-full flex items-center">
              <p className="text-[15px] sm:text-[16px] text-[#374151] leading-relaxed font-medium">
                Posts that show your photo, name, initials or location
              </p>
            </div>

            <div className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] transition-colors h-full flex items-center">
              <p className="text-[15px] sm:text-[16px] text-[#374151] leading-relaxed font-medium">
                Comment threads that reveal personal details
              </p>
            </div>

            <div className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] transition-colors h-full flex items-center">
              <p className="text-[15px] sm:text-[16px] text-[#374151] leading-relaxed font-medium">
                Copies of the post in other AWDTSG-style groups
              </p>
            </div>
          </div>

          <p className="text-[15px] sm:text-[16px] text-[#374151] leading-relaxed max-w-[70ch]">
            Not sure whether anyone has posted about you? Our{" "}
            <Link
              href="/dating-reputation/awdtsg-checker-search"
              className="text-[#20409a] font-semibold underline hover:text-[#d4af37] transition-colors focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded"
            >
              AWDTSG checker and search
            </Link>{" "}
            service can help you find out.
          </p>
        </div>
      </section>

      {/* 5. When the post has spread (White) */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight mb-4">
            When the post has spread
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#374151] leading-relaxed max-w-[70ch] mb-8">
            A post often has copies elsewhere.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/dating-reputation/tea-app-checker-removal"
              className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] hover:shadow-md transition-all group block h-full flex flex-col no-underline focus:outline-none focus:ring-2 focus:ring-[#20409a]"
            >
              <h3 className="text-[17px] font-bold text-[#0a192f] group-hover:text-[#20409a] transition-colors mb-2">
                Tea app checker and removal
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                If yours also appears on the Tea app
              </p>
            </Link>

            <Link
              href="/search-result-cleanup/reddit-forum-result-cleanup"
              className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] hover:shadow-md transition-all group block h-full flex flex-col no-underline focus:outline-none focus:ring-2 focus:ring-[#20409a]"
            >
              <h3 className="text-[17px] font-bold text-[#0a192f] group-hover:text-[#20409a] transition-colors mb-2">
                Reddit and forum result cleanup
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                For threads on Reddit and forums
              </p>
            </Link>

            <Link
              href="/dating-reputation/social-media-takedowns"
              className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] hover:shadow-md transition-all group block h-full flex flex-col no-underline focus:outline-none focus:ring-2 focus:ring-[#20409a]"
            >
              <h3 className="text-[17px] font-bold text-[#0a192f] group-hover:text-[#20409a] transition-colors mb-2">
                Social media takedowns
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                Copies on TikTok, Instagram or other social platforms
              </p>
            </Link>

            <Link
              href="/dating-reputation/image-protection"
              className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] hover:shadow-md transition-all group block h-full flex flex-col no-underline focus:outline-none focus:ring-2 focus:ring-[#20409a]"
            >
              <h3 className="text-[17px] font-bold text-[#0a192f] group-hover:text-[#20409a] transition-colors mb-2">
                Image protection
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                If your photos were reposted without permission
              </p>
            </Link>

            <Link
              href="/search-result-cleanup/google-suppression-de-indexing"
              className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] hover:shadow-md transition-all group block h-full flex flex-col no-underline focus:outline-none focus:ring-2 focus:ring-[#20409a]"
            >
              <h3 className="text-[17px] font-bold text-[#0a192f] group-hover:text-[#20409a] transition-colors mb-2">
                Google suppression and de-indexing
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                When a post shows up in Google results
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 6. After the post is removed (Light Gray) */}
      <section className="w-full bg-[#f8fafc] border-y border-slate-200/60 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight mb-4">
            After the post is removed
          </h2>
          <p className="text-[16px] sm:text-[17px] text-[#374151] leading-relaxed max-w-[70ch] mb-8">
            A removed post can come back.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/monitoring-alerts/awdtsg-monitoring-scan-alerts"
              className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] hover:shadow-md transition-all group block h-full flex flex-col no-underline focus:outline-none focus:ring-2 focus:ring-[#20409a]"
            >
              <h3 className="text-[17px] font-bold text-[#0a192f] group-hover:text-[#20409a] transition-colors mb-2">
                AWDTSG monitoring and scan alerts
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                Watch for new mentions
              </p>
            </Link>

            <Link
              href="/dating-reputation/monitoring-packages"
              className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] hover:shadow-md transition-all group block h-full flex flex-col no-underline focus:outline-none focus:ring-2 focus:ring-[#20409a]"
            >
              <h3 className="text-[17px] font-bold text-[#0a192f] group-hover:text-[#20409a] transition-colors mb-2">
                Monitoring packages
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                Cover ongoing checks
              </p>
            </Link>

            <Link
              href="/reputation-audit/personal-reputation-audit"
              className="rounded-2xl border border-[#e6e8ec] p-6 bg-white shadow-sm hover:border-[#d9a52b] hover:shadow-md transition-all group block h-full flex flex-col no-underline focus:outline-none focus:ring-2 focus:ring-[#20409a]"
            >
              <h3 className="text-[17px] font-bold text-[#0a192f] group-hover:text-[#20409a] transition-colors mb-2">
                Personal reputation audit
              </h3>
              <p className="text-[14px] text-[#374151] leading-relaxed">
                A wider look at what appears when someone searches your name
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Cost and timing + Privacy (White) */}
      <section className="w-full bg-white py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl border border-[#e6e8ec] p-8 bg-white shadow-sm hover:border-[#d9a52b] transition-colors h-full flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight mb-4">
                Cost and timing
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#374151] leading-relaxed max-w-[70ch]">
                Cost and timing depend on how many posts there are, where they appear and which rules they break. We give you both after we review your case. You can also read our{" "}
                <Link
                  href="/pricing"
                  className="text-[#20409a] font-semibold underline hover:text-[#d4af37] transition-colors focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded"
                >
                  pricing page
                </Link>
                .
              </p>
            </div>

            <div className="rounded-2xl border border-[#e6e8ec] p-8 bg-white shadow-sm hover:border-[#d9a52b] transition-colors h-full flex flex-col">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight mb-4">
                Privacy
              </h2>
              <p className="text-[15px] sm:text-[16px] text-[#374151] leading-relaxed max-w-[70ch]">
                Your case details stay confidential. Our{" "}
                <Link
                  href="/privacy-policy"
                  className="text-[#20409a] font-semibold underline hover:text-[#d4af37] transition-colors focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded"
                >
                  privacy policy
                </Link>{" "}
                explains how we handle the information you send us.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Questions about removing AWDTSG posts (Light Gray Accordion) */}
      <section className="w-full bg-[#f8fafc] border-y border-slate-200/60 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight mb-8">
            Questions about removing AWDTSG posts
          </h2>

          <div className="space-y-4 max-w-4xl">
            <details className="group border border-[#e6e8ec] rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded">
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0a192f] pr-4">
                  Can you remove an AWDTSG post about me?
                </h3>
                <span className="ml-4 shrink-0 rounded-full border border-gray-200 p-1.5 text-gray-700 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-[15px] sm:text-[16px] text-[#374151] leading-relaxed max-w-[70ch]">
                We try to. Whether a post comes down depends on what it contains and which rules it breaks. Facebook and the group administrators decide, so we cannot promise a result. After we review the post, we tell you what we think is realistic.
              </div>
            </details>

            <details className="group border border-[#e6e8ec] rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded">
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0a192f] pr-4">
                  What if I do not have a link to the post?
                </h3>
                <span className="ml-4 shrink-0 rounded-full border border-gray-200 p-1.5 text-gray-700 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-[15px] sm:text-[16px] text-[#374151] leading-relaxed max-w-[70ch]">
                Send a screenshot, or tell us the group and roughly when it was posted. The{" "}
                <Link
                  href="/dating-reputation/awdtsg-checker-search"
                  className="text-[#20409a] font-semibold underline hover:text-[#d4af37] transition-colors focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded"
                >
                  AWDTSG checker and search
                </Link>{" "}
                service can also help you find out whether you were posted.
              </div>
            </details>

            <details className="group border border-[#e6e8ec] rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded">
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0a192f] pr-4">
                  The post is old. Can it still be removed?
                </h3>
                <span className="ml-4 shrink-0 rounded-full border border-gray-200 p-1.5 text-gray-700 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-[15px] sm:text-[16px] text-[#374151] leading-relaxed max-w-[70ch]">
                Age does not rule it out. If the post is still visible, we can review it.
              </div>
            </details>

            <details className="group border border-[#e6e8ec] rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded">
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0a192f] pr-4">
                  What if it was reposted to Reddit or TikTok?
                </h3>
                <span className="ml-4 shrink-0 rounded-full border border-gray-200 p-1.5 text-gray-700 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-[15px] sm:text-[16px] text-[#374151] leading-relaxed max-w-[70ch]">
                Send us those links too. We treat reposts as part of the same case where we can.
              </div>
            </details>

            <details className="group border border-[#e6e8ec] rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded">
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0a192f] pr-4">
                  Will the post still appear in Google?
                </h3>
                <span className="ml-4 shrink-0 rounded-full border border-gray-200 p-1.5 text-gray-700 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-[15px] sm:text-[16px] text-[#374151] leading-relaxed max-w-[70ch]">
                Some posts and reposts can show up in search results. If one does, ask us about{" "}
                <Link
                  href="/search-result-cleanup/google-suppression-de-indexing"
                  className="text-[#20409a] font-semibold underline hover:text-[#d4af37] transition-colors focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded"
                >
                  Google suppression and de-indexing
                </Link>
                .
              </div>
            </details>

            <details className="group border border-[#e6e8ec] rounded-2xl bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex cursor-pointer items-center justify-between font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded">
                <h3 className="text-[17px] sm:text-[18px] font-bold text-[#0a192f] pr-4">
                  Does this cover the Tea app?
                </h3>
                <span className="ml-4 shrink-0 rounded-full border border-gray-200 p-1.5 text-gray-700 transition duration-300 group-open:-rotate-180">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </span>
              </summary>
              <div className="mt-4 text-[15px] sm:text-[16px] text-[#374151] leading-relaxed max-w-[70ch]">
                Tea is a separate app with its own rules. See{" "}
                <Link
                  href="/dating-reputation/tea-app-checker-removal"
                  className="text-[#20409a] font-semibold underline hover:text-[#d4af37] transition-colors focus:outline-none focus:ring-2 focus:ring-[#20409a] rounded"
                >
                  Tea app checker and removal
                </Link>{" "}
                for that.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 9. CTA Band (Distinct Soft Tone) */}
      <section className="w-full bg-[#f0f4ff] border-y border-[#dbe4f0] py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#000000] tracking-tight mb-4">
            Start with a free analysis
          </h2>
          <p className="text-[16px] sm:text-[18px] text-[#374151] leading-relaxed max-w-[70ch] mb-8">
            Send the post or a screenshot. We review it and explain your options.
          </p>
          <div>
            <RemoveRequestButton
              serviceName={serviceName}
              ctaText={ctaText}
              modalTitle={modalTitle}
              modalSubtitle={modalSubtitle}
              inputPlaceholder={inputPlaceholder}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
