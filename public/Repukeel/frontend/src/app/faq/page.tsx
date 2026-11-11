/* eslint-disable */
'use client';
import { useState } from 'react';
import Link from 'next/link';

type FAQItem = { q: string; a: string };

const faqCategories: { title: string; items: FAQItem[] }[] = [
  {
    title: 'General & Billing',
    items: [
      { q: 'Is RepuKeel a legitimate company?', a: 'Yes. RepuKeel is an online reputation management and brand protection company based in Islamabad, Pakistan. We handle content removal, DMCA enforcement, search result suppression and monitoring for clients worldwide.' },
      { q: 'How quickly do you start working on a case?', a: 'We review new requests within 24 hours. Active work usually begins within 24–48 hours after your case is confirmed and payment is received. Monitoring can often be set up the same day.' },
      { q: 'Is your service confidential?', a: 'Yes. We work discreetly and do not contact third parties or publish anything about your case without your written approval.' },
      { q: 'Do I need a lawyer?', a: 'For standard takedowns, usually not. We prepare and submit the copyright, privacy and policy-violation reports ourselves. Court orders and lawsuits do need a licensed attorney, and we will tell you if your case requires one.' },
      { q: 'Is this service legal?', a: 'Yes. We act only through platform policies, copyright law (including DMCA), privacy rights and lawful legal channels. We never use hacking, threats or deception.' },
      { q: 'Do you work with clients outside Pakistan?', a: 'Yes. We serve clients worldwide and communicate through email and WhatsApp across time zones.' },
      { q: 'What payment methods do you accept?', a: 'We accept Western Union, Remitly and cryptocurrency. Payment details are sent with your invoice.' },
      { q: 'Do you accept credit cards or PayPal?', a: 'Not at this time. Our accepted methods are Western Union, Remitly and cryptocurrency.' },
      { q: 'How do I pay through Western Union or Remitly?', a: 'After you approve your quote, we send the receiver details. Once you send the transfer, share the tracking number (MTCN for Western Union, or your Remitly transfer reference) and a receipt. We start work once the payment is confirmed.' },
      { q: 'How does crypto payment work?', a: 'We send a wallet address and the exact amount on your invoice. Send the payment and share the transaction ID. Work begins after the network confirms the transfer. Network fees are paid by the sender.' },
      { q: 'Are transfer fees included in your prices?', a: 'No. Prices are quoted in USD, and any fees charged by Western Union, Remitly or the crypto network are paid by the sender. Please send the full invoice amount so it arrives without a shortfall.' },
      { q: 'Can I pay in installments?', a: 'For larger or multi-month programs, we can sometimes split payment into stages. Any installment plan is agreed in writing before work begins.' },
      { q: 'What happens if you cannot remove the content?', a: 'If we cannot obtain a qualifying removal, we refund the unused portion of your fee or apply it as credit toward another service. The exact terms are stated in your service agreement.' },
      { q: 'Can I cancel a service midway?', a: 'Yes. You can cancel at any time. Work already completed is not refundable, but any unused portion may be refunded or credited under your agreement.' },
      { q: 'How do I know which plan I need?', a: 'Request a free analysis. We review the content, check its removal eligibility and recommend the most suitable plan.' },
      { q: 'Do you offer white-label or agency services?', a: 'Yes. We partner with law firms, talent managers, PR teams and digital agencies who need reliable takedown and reputation support for their own clients.' },
      { q: 'Can I use a pseudonym?', a: 'You can use an alias for intake and everyday communication. Legal notices, however, must contain accurate ownership details, which we submit on your behalf with your authorization.' },
      { q: 'Can I manage someone else\'s reputation?', a: 'Yes, with written authorization from that person or their legal representative.' },
      { q: 'Are the results permanent?', a: 'Content removed at its source is generally gone for good, though it can be re-uploaded by others. Suppression results can shift over time, so we recommend monitoring after cleanup.' },
      { q: 'Do you help protect minors and families?', a: 'Yes. Content involving minors is treated as urgent. We also advise reporting to local authorities and the platform\'s child-safety channels where appropriate.' },
      { q: 'Do you offer 24/7 support?', a: 'Emergency DMCA and urgent exposure requests can be sent by WhatsApp or email at any hour. Routine cases are handled during business hours.' },
      { q: 'Will I receive a report at the end?', a: 'Yes. You receive a summary of the actions taken, links removed, links pending and recommended next steps.' },
      { q: 'How do I book a consultation?', a: 'Use the Contact page or Request Free Analysis page on our website, message us on WhatsApp at +92 087525510, or email Legal@Repukeel.com.' },
    ],
  },
  {
    title: 'AI Scanner',
    items: [
      { q: 'What is the RepuKeel AI Scanner?', a: 'It is a tool on our website that helps you spot where your name, images or brand may be exposed online, so you can decide what to act on.' },
      { q: 'Is the AI Scanner free?', a: 'It is free to try from our website. A scan is a starting point, not a full case review.' },
      { q: 'Do humans review the results?', a: 'Yes. For any case you bring to us, our team verifies the findings before any removal request is filed.' },
    ],
  },
  {
    title: 'DMCA & Copyright Protection',
    items: [
      { q: 'What is a DMCA takedown?', a: 'It is a formal notice under the U.S. Digital Millennium Copyright Act asking a website, host or search engine to remove content that infringes your copyright.' },
      { q: 'Who can file a DMCA notice?', a: 'The copyright owner or a person authorized to act for them. We can act as your authorized agent.' },
      { q: 'What proof of ownership do I need?', a: 'Original files, screenshots, timestamps, EXIF data, drafts or links to your original posts. We will tell you exactly what your case needs.' },
      { q: 'Do I need a registered copyright?', a: 'No. Registration is not required to send DMCA notices to most platforms. It only matters if you later decide to sue in the United States.' },
      { q: 'What if a site ignores the DMCA notice?', a: 'We escalate to the web host, domain registrar, CDN and search engines. Removing the page from search results also reduces its visibility while escalation continues.' },
      { q: 'How long does a DMCA takedown take?', a: 'Large platforms often act within hours to a few days. Smaller sites and hosts can take one to two weeks or longer.' },
      { q: 'Can you remove leaked or private content?', a: 'Yes. If you own the content or are authorized to act, we file copyright notices and privacy or non-consensual content reports and request de-indexing from search engines.' },
      { q: 'Can you protect content creators?', a: 'Yes. We remove stolen photos, videos and paid content from piracy sites, tube sites, forums and social platforms, and monitor for re-uploads.' },
      { q: 'Can you remove pirated courses and e-learning material?', a: 'Yes. We handle unauthorized copies of courses, ebooks, templates and software from file-sharing sites, forums and groups.' },
      { q: 'What if the other party sends a counter-notice?', a: 'The platform may restore the content after a waiting period unless legal action is started. We advise you on whether to pursue it further.' },
      { q: 'Can you remove fake profiles and impersonators?', a: 'Yes. We report accounts using your name, photos or content through impersonation and copyright channels.' },
      { q: 'Do you monitor for re-uploads?', a: 'Yes. Monitoring plans detect reposted content so it can be reported quickly.' },
      { q: 'Can you remove content from sites in other countries?', a: 'Usually yes. Even when a site ignores DMCA notices, its host, registrar and search engine listings can often be reached.' },
    ],
  },
  {
    title: 'Content Removal',
    items: [
      { q: 'Which platforms do you work with?', a: 'Facebook, Instagram, TikTok, X (Twitter), Google, Trustpilot, BBB, Indeed, Ripoff Report, travel and hospitality review sites, forums and blogs. Ask us if yours is not listed.' },
      { q: 'Can you remove any post or review?', a: 'Only content that breaks a platform\'s rules or the law, such as fake reviews, impersonation, harassment, private information or copyright infringement. We check eligibility first and tell you honestly if removal is unlikely.' },
      { q: 'Can you remove negative reviews that are genuine?', a: 'Honest opinions are generally protected. In these cases we focus on review response strategy, generating positive reviews and search suppression.' },
      { q: 'Can you remove fake reviews?', a: 'Yes, when they can be documented as fake, conflicted, spam or policy-violating.' },
      { q: 'Can you remove Trustpilot reviews?', a: 'Yes, when a review breaks Trustpilot\'s guidelines, for example reviews not based on a genuine experience.' },
      { q: 'Can you remove BBB reviews and complaints?', a: 'We can assist with policy-based disputes and responses. Outcomes depend on BBB\'s review process.' },
      { q: 'Can you remove Ripoff Report listings?', a: 'Ripoff Report has restrictive policies, so full removal is often limited. We assess your options, including its dispute process and search suppression.' },
      { q: 'Can you remove Facebook and Instagram content?', a: 'Yes. We handle posts, reels, stories, pages and fake accounts that violate platform rules or infringe your rights.' },
      { q: 'Can you remove TikTok and X content?', a: 'Yes. We report videos, posts and accounts that infringe your copyright, impersonate you or violate platform policies.' },
      { q: 'Can you remove Indeed and employer reviews?', a: 'Yes, where a review breaks Indeed\'s rules, for instance by containing personal attacks, false claims or private information.' },
      { q: 'Can you remove travel and hospitality reviews?', a: 'Yes. We handle policy-violating reviews on TripAdvisor, Booking and similar platforms.' },
      { q: 'Can you remove mugshots and arrest records?', a: 'Where the site has a removal policy or the law allows it, yes. Otherwise we use search suppression and de-indexing.' },
      { q: 'Will the person who posted it know I reported it?', a: 'We do not contact posters ourselves. However, platforms may notify an account holder that content was reported, particularly in copyright cases.' },
    ],
  },
  {
    title: 'Google Review Removal',
    items: [
      { q: 'Can you remove Google reviews?', a: 'Yes, but only when the review violates Google\'s policies. A negative review alone does not qualify.' },
      { q: 'How do you remove Google reviews?', a: 'We check the review against Google\'s policies, collect evidence and submit structured reports and appeals.' },
      { q: 'Can fake Google reviews be removed?', a: 'Yes. Fake, spam or conflict-of-interest reviews can qualify when they are properly documented.' },
      { q: 'Can opinion-based negative reviews be removed?', a: 'Usually not. Genuine opinions are allowed, and we will not promise otherwise.' },
      { q: 'Should I flag the review myself first?', a: 'You can, and it costs nothing. If it is declined or reposted, we can escalate with stronger evidence.' },
      { q: 'How long does Google review removal take?', a: 'Straightforward violations may be handled within days. Complex or appealed cases can take several weeks.' },
      { q: 'What if a removed review is posted again?', a: 'Our monitoring detects reposts and coordinated attacks so we can report them again quickly.' },
      { q: 'Are removed Google reviews gone permanently?', a: 'Once Google removes a review it is gone from Google. Copies or screenshots elsewhere require separate action.' },
      { q: 'Is Google review removal legal?', a: 'Yes. We use Google\'s official reporting and appeal channels, plus applicable legal grounds where they exist.' },
    ],
  },
  {
    title: 'Dating Reputation',
    items: [
      { q: 'What is dating reputation management?', a: 'Removing, suppressing or monitoring dating-related posts, screenshots and rumors that harm your personal or professional life.' },
      { q: 'Can you remove me from "Are We Dating the Same Guy" (AWDTSG) posts?', a: 'We can pursue removal where the post breaks platform rules, for example through privacy violations, harassment, defamation or use of your photos. Results depend on the group and the platform.' },
      { q: 'What if I am not named but I am identifiable?', a: 'Photos, screenshots or identifying details can still support a privacy or harassment report.' },
      { q: 'Can you remove dating screenshots and profile photos?', a: 'Yes, when you own the photos or they expose private information. We use copyright and privacy channels.' },
      { q: 'Can you remove Reddit and TikTok dating content?', a: 'Yes. We report threads, storytime videos, stitches and reposts that violate platform policies.' },
      { q: 'What if the post has gone viral?', a: 'We report the original post, then its reposts, and use de-indexing and suppression to reduce visibility of what remains.' },
      { q: 'What if the post is old?', a: 'Age does not prevent removal. Older content can still be reported while it is publicly accessible.' },
      { q: 'What if the content was shared in private groups?', a: 'We can act on public reposts and on content you can screenshot and document. Fully private groups are outside our reach.' },
      { q: 'Can you monitor for reposts?', a: 'Yes. Monitoring plans of one, three or six months are available.' },
      { q: 'What if I was falsely accused?', a: 'We pursue removal where possible and build positive, verifiable content to replace it in search.' },
      { q: 'Can you help if someone threatens to post about me?', a: 'Yes. We can advise on prevention, prepare legal notices and set up monitoring. If you are in danger, please contact local authorities as well.' },
      { q: 'Will people know I hired you?', a: 'No. Our work is confidential and we do not contact posters or group admins on your behalf without approval.' },
      { q: 'Do you protect both men and women?', a: 'Yes. Our service is open to everyone.' },
    ],
  },
  {
    title: 'Job & Professional Reputation',
    items: [
      { q: 'What is job reputation management?', a: 'Protecting your online presence so that employers, recruiters and clients see accurate, professional results when they search for you.' },
      { q: 'Can this help before a job interview?', a: 'Yes. We remove or suppress harmful results and strengthen your positive presence before interviews.' },
      { q: 'Can you improve my LinkedIn search results?', a: 'Yes. We optimize your LinkedIn and other profiles so they rank above negative or irrelevant links.' },
      { q: 'Can you help with issues found in background checks?', a: 'We can identify online content that may show up and pursue removal or suppression where possible. We cannot alter official records held by screening companies or courts.' },
      { q: 'Can you protect licensed professionals?', a: 'Yes, including doctors, nurses, lawyers, therapists and other regulated professionals.' },
      { q: 'Can you help after a termination or layoff?', a: 'Yes. We can remove or suppress harmful posts and prepare a strong public profile.' },
      { q: 'Can you remove workplace defamation?', a: 'We can pursue removal where content contains false statements, private information or harassment, and suppress what cannot be removed.' },
      { q: 'Can you clean up Glassdoor, Indeed or employer reviews?', a: 'We handle reviews that break a platform\'s rules and suppress related content that cannot be removed.' },
      { q: 'How long does job reputation cleanup take?', a: 'Visible improvement usually takes 30–45 days. Full results depend on the content and search engines.' },
      { q: 'Will my employer or licensing board know?', a: 'No. We do not contact employers or licensing boards, and any profile changes are made with your approval.' },
      { q: 'Do you offer packages for job seekers?', a: 'Yes. Pre-employment packages combine search cleanup, profile optimization and monitoring.' },
    ],
  },
  {
    title: 'Monitoring & Alerts',
    items: [
      { q: 'What does your monitoring service include?', a: 'Tracking of Google results, social media, forums and known groups, plus reverse-image checks. Coverage is tailored to your case.' },
      { q: 'How does social media monitoring work?', a: 'We watch for your name, images and linked content on platforms such as TikTok, Reddit, Instagram, X and Facebook.' },
      { q: 'How will I be alerted?', a: 'By email or WhatsApp. You can choose instant alerts, a daily summary or a monthly report.' },
      { q: 'Can you find my photos if my name is not used?', a: 'Yes. Reverse-image searches can find reposts of your photos, even when there is no name attached.' },
      { q: 'Do you monitor the dark web?', a: 'We check publicly accessible leak and paste sites for exposed personal data. We cannot guarantee visibility into private or closed forums.' },
      { q: 'Can monitoring prevent posts?', a: 'No. It cannot stop a post from being made, but it helps us detect it early and act quickly.' },
      { q: 'Is monitoring useful if I have never been posted about?', a: 'Yes. Early detection is often the cheapest way to prevent a small problem from becoming a big one.' },
      { q: 'Can I monitor a business or a brand?', a: 'Yes. We track reviews, impersonators, counterfeits and negative content for brands and businesses.' },
      { q: 'Can you detect fake profiles?', a: 'Yes. We look for accounts misusing your name, images or brand.' },
      { q: 'How is this different from Google Alerts?', a: 'Google Alerts only notifies you about new web pages that match a keyword. We check more sources, verify what we find and take action on it.' },
      { q: 'How do I know monitoring is working?', a: 'You receive timestamped alerts with screenshots and links, plus regular summary reports.' },
    ],
  },
  {
    title: 'Online Reputation Management',
    items: [
      { q: 'What is online reputation management (ORM)?', a: 'ORM is the practice of removing, suppressing or outranking harmful online content and building a positive, accurate online presence.' },
      { q: 'Who needs reputation management?', a: 'Business owners, executives, professionals, creators, job seekers and anyone harmed by damaging content online.' },
      { q: 'What services are included?', a: 'Reputation audits, content removal, search suppression, profile building, review management and monitoring.' },
      { q: 'How long does a campaign take?', a: 'Most campaigns run 30–90 days, depending on the amount and type of negative content.' },
      { q: 'What is suppression?', a: 'Suppression pushes negative results lower in search by publishing and promoting stronger positive content that ranks above them.' },
      { q: 'Do you create new content for me?', a: 'Yes. We write bios, articles and press-style pieces, set up websites and optimize social profiles.' },
      { q: 'Can you help if I am targeted repeatedly?', a: 'Yes. Ongoing protection and monitoring plans cover repeated attacks.' },
      { q: 'Can you separate my name from my business in search?', a: 'Yes. We build search results that keep your personal profile and your business distinct.' },
      { q: 'Can this help before fundraising or selling my business?', a: 'Yes. A cleaned-up search profile builds trust with investors, partners and buyers.' },
      { q: 'Do you offer long-term plans?', a: 'Yes. We offer one-, two- and three-month programs with renewable protection.' },
      { q: 'Can I upgrade my plan midway?', a: 'Yes. Plans can be extended or upgraded at any time.' },
      { q: 'Will I work with a dedicated person?', a: 'Yes. A case lead is assigned and coordinates SEO, content and takedown work for your case.' },
      { q: 'Do you guarantee results?', a: 'We do not guarantee that specific content will disappear, because platforms and search engines make the final decision. We do assess eligibility upfront and refund or credit the unused portion if a qualifying removal is not achieved.' },
    ],
  },
  {
    title: 'Search Result Cleanup',
    items: [
      { q: 'What is search result cleanup?', a: 'Removing, de-indexing or suppressing harmful links, articles and forum posts that appear when someone searches for you.' },
      { q: 'What is the difference between removal and suppression?', a: 'Removal deletes content at its source or from Google\'s index. Suppression leaves it online but pushes it off the first page.' },
      { q: 'Can you completely remove content from Google?', a: 'Yes, when it qualifies under Google\'s removal policies. Otherwise we use suppression or de-indexing requests.' },
      { q: 'Can you remove news articles?', a: 'Sometimes. Outdated, inaccurate or resolved-case articles are the best candidates. Accurate, current reporting is much harder to remove.' },
      { q: 'What if the article is accurate but harmful?', a: 'Accurate articles usually remain online. We focus on suppression and building a stronger, more positive online presence.' },
      { q: 'Can you remove articles about an arrest that did not lead to conviction?', a: 'In many cases, yes, especially with dismissed charges, sealed records or expunged cases, through publisher requests and platform policies.' },
      { q: 'How long does suppression take?', a: 'First changes typically appear in 30–45 days, with full results in 60–90 days.' },
      { q: 'Can you fix Google autocomplete and related searches?', a: 'We can often influence autocomplete and related terms through content and search-behavior strategies, and by requesting removal of policy-violating predictions. Results vary.' },
      { q: 'Can you remove Reddit threads from search?', a: 'Yes, through removal requests where Reddit or Google rules are violated, or through suppression.' },
      { q: 'Can you remove YouTube results?', a: 'Yes, through copyright, privacy and policy enforcement, and through suppression when removal is not possible.' },
      { q: 'What if a page was deleted but still shows in Google?', a: 'We request de-indexing and cache removal so the outdated listing disappears.' },
      { q: 'Can you handle multiple names or aliases?', a: 'Yes. We build a plan for each known name, alias and business name.' },
      { q: 'Which search engines do you focus on?', a: 'Google mainly, plus Bing, Yahoo and DuckDuckGo.' },
      { q: 'What if negative results keep coming back?', a: 'Ongoing monitoring and periodic tune-ups keep new content from climbing back into your search results.' },
    ],
  },
];

function FAQItem({ q, a, idx }: { q: string; a: string; idx: number }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-[600] text-[15px] text-[#0a192f] hover:bg-gray-50 transition-colors"
        aria-expanded={open}
      >
        <span><span className="text-[#d4af37] font-[800] mr-2">Q{idx}.</span>{q}</span>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`w-4 h-4 flex-shrink-0 text-[#d4af37] transition-transform ${open ? 'rotate-180' : ''}`}>
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-[14px] text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-[#fafafa]">
          {a}
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  let qNum = 0;
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <div className="w-full bg-[#0a192f] py-16 px-6 text-center">
        <p className="text-xs font-bold text-[#d4af37] uppercase tracking-[3px] mb-3">Help Center</p>
        <h1 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white mb-4">Frequently Asked Questions</h1>
        <p className="text-[15px] text-gray-400 max-w-2xl mx-auto">RepuKeel | Online Reputation Management &amp; Brand Protection</p>
        <p className="text-[14px] text-gray-500 mt-3 max-w-xl mx-auto">
          Answers to the most common questions about our services, payments, timelines and how we work. If you cannot find what you need, contact us and we will reply within 24 hours.
        </p>
      </div>

      <div className="max-w-[900px] mx-auto px-6 py-16 space-y-14">
        {faqCategories.map((cat) => (
          <section key={cat.title}>
            <h2 className="text-[20px] font-[900] text-[#0a192f] mb-6 pb-3 border-b-2 border-[#d4af37] inline-block">
              {cat.title}
            </h2>
            <div className="space-y-3">
              {cat.items.map((item) => {
                qNum += 1;
                return <FAQItem key={item.q} q={item.q} a={item.a} idx={qNum} />;
              })}
            </div>
          </section>
        ))}

        {/* Contact CTA */}
        <div className="bg-[#0a192f] rounded-2xl p-10 text-center">
          <h3 className="text-[24px] font-[900] text-white mb-3">Still Have Questions?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6 text-[14px] text-gray-400">
            <a href="/request-free-analysis" className="text-[#d4af37] hover:underline font-semibold">
              Request a free analysis →
            </a>
            <span className="hidden sm:block text-gray-600">|</span>
            <a href="https://wa.me/923087525510" target="_blank" rel="noopener noreferrer" className="text-[#d4af37] hover:underline font-semibold">
              WhatsApp: +92 308 752 5510
            </a>
            <span className="hidden sm:block text-gray-600">|</span>
            <a href="mailto:Legal@Repukeel.com" className="text-[#d4af37] hover:underline font-semibold">
              Legal@Repukeel.com
            </a>
          </div>
          <p className="text-gray-500 text-[13px] mt-4">P33H+GVV, G-7/4, Islamabad, Pakistan</p>
          <div className="mt-6">
            <Link href="/contact" className="bg-[#d4af37] hover:bg-[#c19b2e] text-white font-bold px-8 py-3 rounded-xl transition-colors text-[14px] inline-block">
              Contact Us Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
