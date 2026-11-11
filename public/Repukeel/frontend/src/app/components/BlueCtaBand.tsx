import Link from 'next/link';

interface BlueCtaBandProps {
  headingWhite: string;
  headingGold: string;
  subtext: string;
  primaryBtnText: string;
  primaryBtnLink: string;
  secondaryBtnText?: string;
  secondaryBtnLink?: string;
}

export default function BlueCtaBand({
  headingWhite,
  headingGold,
  subtext,
  primaryBtnText,
  primaryBtnLink,
  secondaryBtnText,
  secondaryBtnLink
}: BlueCtaBandProps) {
  return (
    <section className="relative w-full bg-[var(--blue)] py-20 px-6 overflow-hidden">
      {/* Radial glow and texture */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      
      <div className="relative z-10 max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-[800] text-white mb-4">
          {headingWhite} <span className="text-[var(--gold)]">{headingGold}</span>
        </h2>
        
        <p className="text-[16px] text-blue-100 mb-8 max-w-2xl leading-relaxed">
          {subtext}
        </p>

        {/* 3 small gold dots */}
        <div className="flex items-center justify-center gap-2 mb-10">
          <div className="w-2 h-2 rounded-full bg-[var(--gold)]"></div>
          <div className="w-2 h-2 rounded-full bg-[var(--gold)] opacity-50"></div>
          <div className="w-2 h-2 rounded-full bg-[var(--gold)] opacity-50"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={primaryBtnLink} className="btn btn-gold-solid">
            {primaryBtnText}
          </Link>
          {secondaryBtnText && secondaryBtnLink && (
            <Link href={secondaryBtnLink} className="btn btn-outline-dark white-var">
              {secondaryBtnText}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
