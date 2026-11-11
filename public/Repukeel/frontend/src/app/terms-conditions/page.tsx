import { Metadata } from 'next';
import Link from 'next/link';
import { canonicalFor } from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Terms and Conditions',
  description: 'Terms and conditions governing the use of RepuKeel reputation management, DMCA takedowns, and brand protection services.',
  alternates: {
    canonical: canonicalFor('/terms-conditions'),
  },
  openGraph: {
    title: 'Terms and Conditions | RepuKeel',
    description: 'Terms and conditions governing the use of RepuKeel reputation management, DMCA takedowns, and brand protection services.',
    url: 'https://repukeel.com/terms-conditions',
  },
};

const sections = [
  { id: 1, title: 'Acceptance and Scope' },
  { id: 2, title: 'Our Services' },
  { id: 3, title: 'No Guarantee of Results' },
  { id: 4, title: 'Timelines and Waiting Periods' },
  { id: 5, title: 'Client Responsibilities' },
  { id: 6, title: 'Client Promises and Authorization' },
  { id: 7, title: 'Communication' },
  { id: 8, title: 'Fees and Payment' },
  { id: 9, title: 'Refunds and Cancellation' },
  { id: 10, title: 'Confidentiality and Data' },
  { id: 11, title: 'Third Parties, Counter-Notices and Search Engines' },
  { id: 12, title: 'Limitation of Liability' },
  { id: 13, title: 'Indemnity' },
  { id: 14, title: 'Ending the Agreement' },
  { id: 15, title: 'Respectful Conduct and Complaints' },
  { id: 16, title: 'Governing Law and Disputes' },
  { id: 17, title: 'Changes to These Terms' },
  { id: 18, title: 'Contact' },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Hero */}
      <div className="w-full bg-[#0a192f] py-16 px-6 text-center">
        <p className="text-xs font-bold text-[#d4af37] uppercase tracking-[3px] mb-3">Legal</p>
        <h1 className="text-[clamp(28px,4vw,48px)] font-extrabold text-white mb-4">Terms and Conditions</h1>
        <p className="text-[15px] text-gray-400 max-w-xl mx-auto">RepuKeel | Online Reputation Management &amp; Brand Protection</p>
        <p className="text-[14px] text-gray-500 mt-2">Effective date: 20 September 2026</p>
      </div>

      <div className="max-w-[1100px] mx-auto px-6 py-16 grid md:grid-cols-[260px_1fr] gap-12">
        {/* Sidebar TOC */}
        <aside className="hidden md:block">
          <div className="sticky top-24 bg-[#f8fafc] border border-gray-200 rounded-2xl p-5">
            <p className="font-bold text-sm text-[#0a192f] mb-4 uppercase tracking-wide">Contents</p>
            <nav className="space-y-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#section-${s.id}`}
                  className="block text-[13px] text-gray-600 hover:text-[#d4af37] hover:translate-x-1 transition-all py-0.5"
                >
                  {s.id}. {s.title}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="space-y-12 text-[15px] text-gray-700 leading-relaxed">
          <p className="text-[15px] text-gray-600 border-l-4 border-[#d4af37] pl-4 italic">
            Please read these Terms before you hire RepuKeel. They explain what we do, what we need from you, how payment and refunds work, and what timelines to expect.
          </p>

          {/* Section 1 */}
          <section id="section-1">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">1. Acceptance and Scope</h2>
            <div className="space-y-3">
              <p><strong>1.1</strong> These Terms and Conditions (&ldquo;Terms&rdquo;) apply to all services provided by RepuKeel (&ldquo;RepuKeel&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;), an online reputation management and brand protection company based in Islamabad, Pakistan, to you (&ldquo;Client&rdquo;, &ldquo;you&rdquo;).</p>
              <p><strong>1.2</strong> By paying an invoice, approving a quote or otherwise asking us to start work, you confirm that you have read and accepted these Terms.</p>
              <p><strong>1.3</strong> If you and RepuKeel sign a separate written agreement or quote for your case, that document applies together with these Terms. If they conflict, the written agreement or quote for your case prevails.</p>
              <p><strong>1.4</strong> RepuKeel is not a law firm and does not provide legal advice. Where a matter needs a licensed attorney, we will tell you.</p>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">2. Our Services</h2>
            <div className="space-y-3">
              <p><strong>2.1</strong> Our services include content and review removal, DMCA and copyright enforcement, search de-indexing and suppression, reputation building, and monitoring. The specific services for your case are listed in your quote or invoice.</p>
              <p><strong>2.2</strong> Before starting, we assess whether your content is eligible for removal and tell you honestly what is realistic. We may recommend removal, suppression or a combination.</p>
              <p><strong>2.3</strong> Anything not listed in your quote or invoice is outside scope. Extra work can be added through a new or updated quote.</p>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">3. No Guarantee of Results</h2>
            <div className="space-y-3">
              <p><strong>3.1</strong> Platforms, hosts and search engines make the final decision on removal, de-indexing and ranking. We do not control them, and we cannot promise that any specific content will be removed or ranked at a specific position.</p>
              <p><strong>3.2</strong> We promise professional effort, honest advice, and clear reporting. Where removal is not achieved, the refund terms in Section 9 apply.</p>
              <p><strong>3.3</strong> Removed content can be re-uploaded by others, and search results can change over time. We recommend monitoring after cleanup.</p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="section-4">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">4. Timelines and Waiting Periods</h2>
            <div className="space-y-3">
              <p><strong>4.1</strong> Reputation work takes time because most of it depends on third parties reviewing our reports. The table below shows typical timelines. They are estimates, not promises.</p>
              <div className="overflow-x-auto rounded-xl border border-gray-200 mt-4">
                <table className="w-full text-[14px]">
                  <thead className="bg-[#0a192f] text-white">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold">Stage</th>
                      <th className="text-left px-4 py-3 font-semibold">Typical time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {[
                      ['Case review and quote', 'Within 24 hours of a complete request'],
                      ['Work starts', '24–48 hours after payment is confirmed and your authorization is received'],
                      ['Western Union / Remitly payment confirmation', 'Usually within 1 business day of receiving your tracking number or reference and receipt'],
                      ['Crypto payment confirmation', 'After the required network confirmations'],
                      ['Copyright / DMCA takedowns', 'Hours to 14 days. Larger platforms are usually faster; small sites and hosts can take longer'],
                      ['Platform policy removals (reviews, posts, profiles)', 'A few days to 6 weeks. Appeals can take longer'],
                      ['Search engine de-indexing requests', 'A few days to several weeks'],
                      ['Search suppression', 'First changes in 30–45 days; full results in 60–90 days'],
                      ['Our progress updates', 'At least once every 7 days on active cases, and immediately after any major development'],
                      ['Your replies to our requests', 'Within 7 days'],
                    ].map(([stage, time], i) => (
                      <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-[#f8fafc]'}>
                        <td className="px-4 py-3 font-medium text-[#0a192f]">{stage}</td>
                        <td className="px-4 py-3 text-gray-600">{time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p><strong>4.2</strong> Timelines can be longer during platform backlogs, holidays, appeals, counter-notices, or when a platform asks for more evidence. We will keep you updated on the status.</p>
              <p><strong>4.3</strong> Please allow the full estimated period before raising a delay complaint. If you are concerned, message us at any time and we will explain exactly where your case stands.</p>
            </div>
          </section>

          {/* Section 5 */}
          <section id="section-5">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">5. Client Responsibilities</h2>
            <div className="space-y-3">
              <p><strong>5.1</strong> To let us work effectively, you agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>give accurate, complete and truthful information, including correct links, names and dates</li>
                <li>send requested proof (ownership evidence, screenshots, identification where legally required) within 7 days</li>
                <li>reply to our questions and approval requests within 7 days</li>
                <li>keep the relevant accounts, pages and profiles live and unchanged while we work on them</li>
                <li>not report, flag, edit, delete or reply to the same content while we are working on it, unless we agree first</li>
                <li>not contact the person who posted the content, their platform or their host about the matter without telling us first</li>
                <li>preserve the original evidence and not alter or delete it</li>
                <li>tell us straight away if the situation changes, for example if a lawsuit, settlement, or new post appears</li>
              </ul>
              <p><strong>5.2</strong> If you do not respond for more than 30 days, we may pause your case. A paused case is not extended at our cost, and unused time on a fixed-term plan is not refunded because of your inactivity.</p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="section-6">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">6. Client Promises and Authorization</h2>
            <div className="space-y-3">
              <p><strong>6.1</strong> You confirm that you own the content we are enforcing, or that you are legally authorized to act for the owner.</p>
              <p><strong>6.2</strong> You confirm that the information and documents you give us are genuine and not misleading.</p>
              <p><strong>6.3</strong> You authorize RepuKeel to act as your agent to submit removal requests, DMCA notices, reports, appeals and correspondence in your name or on your behalf for the agreed services.</p>
              <p><strong>6.4</strong> You understand that DMCA notices are legal statements. A knowingly false or bad-faith notice can create legal liability, which rests with the person who supplied the false information.</p>
            </div>
          </section>

          {/* Section 7 */}
          <section id="section-7">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">7. Communication</h2>
            <div className="space-y-3">
              <p><strong>7.1</strong> We communicate by email and WhatsApp. Please use the contact details on our website: WhatsApp <a href="https://wa.me/923087525510" className="text-[#d4af37] hover:underline">+92 308 752 5510</a>, email <a href="mailto:Legal@Repukeel.com" className="text-[#d4af37] hover:underline">Legal@Repukeel.com</a>.</p>
              <p><strong>7.2</strong> Standard business hours are Monday to Friday, Pakistan Standard Time (PKT). Emergency DMCA and urgent exposure messages can be sent at any time and are prioritized.</p>
              <p><strong>7.3</strong> Messages received outside business hours are answered on the next business day unless marked urgent. We aim to reply to all messages within 24 hours.</p>
              <p><strong>7.4</strong> You are responsible for making sure that your contact details are accurate. We are not responsible for delays caused by unreachable or unmonitored contact details.</p>
            </div>
          </section>

          {/* Section 8 */}
          <section id="section-8">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">8. Fees and Payment</h2>
            <div className="space-y-3">
              <p><strong>8.1</strong> All prices are quoted in US dollars (USD), unless the quote says otherwise.</p>
              <p><strong>8.2</strong> We accept payment by Western Union, Remitly and cryptocurrency. We do not currently accept cards or PayPal.</p>
              <p><strong>8.3</strong> Payment details are given on your invoice. For Western Union and Remitly, you must send us the tracking number (MTCN or transfer reference) and a receipt. For crypto, you must send the transaction ID. Please double-check the receiver details before sending.</p>
              <p><strong>8.4</strong> Fees charged by Western Union, Remitly, banks, exchanges or the crypto network are paid by the sender. The full invoice amount must arrive with us. If a shortfall arises, we will ask you to pay the difference before work continues.</p>
              <p><strong>8.5</strong> Crypto payments must go to the wallet address and network on your invoice. Funds sent to the wrong address or network cannot be recovered by us. Amounts are calculated at the exchange rate on the invoice.</p>
              <p><strong>8.6</strong> Work begins after we have confirmed payment. Confirmation may take longer if transfer details are incomplete.</p>
              <p><strong>8.7</strong> For larger or multi-month plans, we may agree installments in writing. Work on later stages continues only while installments are paid on time.</p>
              <p><strong>8.8</strong> Fees are for our time, expertise and effort, and are due whether or not a platform accepts the request, except where Section 9 gives you a refund or credit.</p>
              <p><strong>8.9</strong> Taxes, duties and government charges in your country, if any, are your responsibility.</p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="section-9">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">9. Refunds and Cancellation</h2>
            <div className="space-y-3">
              <p><strong>9.1</strong> Removal services (for example, DMCA takedowns and policy-based review removals) are refundable in part if a removal we confirmed as eligible could not be obtained. In this case, we refund the unused portion of the fee or give you credit toward another RepuKeel service. Your choice.</p>
              <p><strong>9.2</strong> Suppression, reputation building and search cleanup campaigns rely on time and effort over months. Fees for work already done are not refundable. If a campaign ends early because of us, we refund the unused portion.</p>
              <p><strong>9.3</strong> Monitoring plans are billed for the period stated in your invoice. Cancelling stops renewal, and no refund is given for a period already started.</p>
              <p><strong>9.4</strong> Refunds are not available where the reason for non-removal is that you gave us incorrect or incomplete information, did not respond, edited or reported the content yourself, or where the content was removed but later re-posted by someone else.</p>
              <p><strong>9.5</strong> You may cancel at any time by written notice by WhatsApp or email. Work already completed up to the date of cancellation is charged.</p>
              <p><strong>9.6</strong> Approved refunds are sent within 7 to 14 business days by the same method you paid with, or by another method we agree. Transfer, bank and network fees are not refunded. Crypto refunds are made in the USD-equivalent amount at the time of refund, minus network fees.</p>
              <p><strong>9.7</strong> To request a refund, message us within 30 days of receiving your final report or of cancellation, whichever is earlier. We will review the request fairly and reply with a decision.</p>
            </div>
          </section>

          {/* Section 10 */}
          <section id="section-10">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">10. Confidentiality and Data</h2>
            <div className="space-y-3">
              <p><strong>10.1</strong> We treat your case, your identity and the documents you send us as confidential. We share information only with platforms, hosts, search engines and other parties that need it to carry out the agreed work, and only as far as is necessary.</p>
              <p><strong>10.2</strong> DMCA notices and some platform reports may include your name, contact details and a description of the material. Platforms can pass these on to the other party. We will tell you before we submit anything that is going to reveal your details.</p>
              <p><strong>10.3</strong> We may disclose information if required by law or a valid legal order.</p>
              <p><strong>10.4</strong> We use your information only to provide the services and keep it only as long as needed for the case, our records and legal obligations. Our Privacy Policy explains more.</p>
              <p><strong>10.5</strong> We do not use your name, logo or case details in marketing without your written permission.</p>
            </div>
          </section>

          {/* Section 11 */}
          <section id="section-11">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">11. Third Parties, Counter-Notices and Search Engines</h2>
            <div className="space-y-3">
              <p><strong>11.1</strong> We depend on the policies and decisions of third parties. They can change their rules, refuse requests, restore content, or stop accepting submissions without notice, and RepuKeel is not responsible for their decisions.</p>
              <p><strong>11.2</strong> A DMCA counter-notice can lead a platform to restore content unless legal action is started. We will tell you about counter-notices and explain your options. Court action requires a licensed attorney and is outside our services.</p>
              <p><strong>11.3</strong> Suppression works by ranking better content above unwanted content. Search engines control rankings, so results are gradual and can change.</p>
              <p><strong>11.4</strong> Removing one result can make another existing result more visible. We will explain this risk before we start and work on such results as agreed.</p>
            </div>
          </section>

          {/* Section 12 */}
          <section id="section-12">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">12. Limitation of Liability</h2>
            <div className="space-y-3">
              <p><strong>12.1</strong> To the fullest extent allowed by law, RepuKeel is not liable for indirect, incidental or consequential loss, including loss of business, income, opportunities or reputation, arising from the services.</p>
              <p><strong>12.2</strong> Our total liability for any claim connected to the services is limited to the fees you paid us for the service that the claim relates to.</p>
              <p><strong>12.3</strong> We are not liable for delays or failures caused by events outside our control, including platform or internet outages, changes in third-party policies, natural disasters, or government actions.</p>
              <p><strong>12.4</strong> Nothing in these Terms limits liability that cannot legally be limited.</p>
            </div>
          </section>

          {/* Section 13 */}
          <section id="section-13">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">13. Indemnity</h2>
            <p><strong>13.1</strong> You agree to cover RepuKeel for any claim, loss or cost that results from information or instructions you gave us that were false, misleading or unlawful, or from your breach of these Terms.</p>
          </section>

          {/* Section 14 */}
          <section id="section-14">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">14. Ending the Agreement</h2>
            <div className="space-y-3">
              <p><strong>14.1</strong> You may end the services at any time as set out in Section 9.</p>
              <p><strong>14.2</strong> We may suspend or end the services immediately if you breach these Terms, do not pay, provide false information, or abuse our staff.</p>
              <p><strong>14.3</strong> If we end the services because of your breach, you remain responsible for fees for work already done.</p>
              <p><strong>14.4</strong> Sections covering payment, confidentiality, liability, indemnity and governing law continue after the services end.</p>
            </div>
          </section>

          {/* Section 15 */}
          <section id="section-15">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">15. Respectful Conduct and Complaints</h2>
            <div className="space-y-3">
              <p><strong>15.1</strong> We ask that clients treat our team respectfully. We may end the services if there is abuse, threats or harassment.</p>
              <p><strong>15.2</strong> If you are unhappy about anything, please contact us first so we can look into it and try to fix it. We take all complaints seriously. Nothing in these Terms limits your right to share your honest opinion about our services or to contact a regulator.</p>
            </div>
          </section>

          {/* Section 16 */}
          <section id="section-16">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">16. Governing Law and Disputes</h2>
            <div className="space-y-3">
              <p><strong>16.1</strong> These Terms are governed by the laws of Pakistan.</p>
              <p><strong>16.2</strong> We will first try to settle any dispute in good faith through discussion. If that fails, the courts of Islamabad, Pakistan have jurisdiction, unless we agree in writing to arbitration.</p>
            </div>
          </section>

          {/* Section 17 */}
          <section id="section-17">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">17. Changes to These Terms</h2>
            <p><strong>17.1</strong> We may update these Terms from time to time. The updated version will be posted on our website with a new date. Changes do not apply to services already paid for, unless the law requires it. Continued use of our services after an update means acceptance of the updated Terms.</p>
          </section>

          {/* Section 18 */}
          <section id="section-18">
            <h2 className="text-[22px] font-bold text-[#0a192f] mb-4">18. Contact</h2>
            <p><strong>18.1</strong> RepuKeel, P33H+GVV, G-7/4, Islamabad, Pakistan<br />
            WhatsApp: <a href="https://wa.me/923087525510" className="text-[#d4af37] hover:underline">+92 308 752 5510</a><br />
            Email: <a href="mailto:Legal@Repukeel.com" className="text-[#d4af37] hover:underline">Legal@Repukeel.com</a><br />
            Website: <a href="https://repukeel.com" className="text-[#d4af37] hover:underline">repukeel.com</a></p>
          </section>

          {/* Agreement footer */}
          <div className="border-t border-gray-200 pt-8 mt-8">
            <div className="bg-[#f8fafc] border border-gray-200 rounded-2xl p-6">
              <p className="text-[14px] text-gray-600 italic">
                <strong className="text-[#0a192f]">Agreement:</strong> By paying an invoice or approving a quote, you confirm that you have read and agree to these Terms.
              </p>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <Link href="/contact" className="bg-[#d4af37] hover:bg-[#c19b2e] text-white font-bold px-6 py-3 rounded-xl transition-colors text-[14px]">
              Contact Us
            </Link>
            <Link href="/privacy-policy" className="border border-gray-300 hover:border-[#d4af37] text-gray-700 font-semibold px-6 py-3 rounded-xl transition-colors text-[14px]">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
