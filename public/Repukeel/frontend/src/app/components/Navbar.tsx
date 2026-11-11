/* eslint-disable */
'use client';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
import AccountMenu from './AccountMenu';
import Link from 'next/link';
import Image from 'next/image';
import ServicesMenuLayout from './ServicesMenuLayout';
import { categories } from '@/data/services';

export default function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // Always default to first category so the mega-menu shows services immediately on open
  const [servicesMenuTab, setServicesMenuTab] = useState<string | null>(categories[0]?.slug ?? null);
  const pathname = usePathname();
  // Ref for the 150ms hover-close delay timer on Services dropdown
  const servicesCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Stop navigation progress bar when pathname changes
    setIsNavigating(false);
    // Also close dropdown on navigation and cancel any pending close timer
    if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
    setOpenDropdown(null);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      // Don't close the dropdown if clicking inside the mobile drawer
      if (target.closest('#mobile-drawer')) return;
      
      // Close dropdown if click is outside any element with .has-dropdown
      if (!target.closest('.has-dropdown')) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (drawerOpen) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
    const handleResize = () => {
      if (window.innerWidth > 900) setDrawerOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [drawerOpen]);

  const handleNavClick = (_e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    if (pathname !== target) {
      setIsNavigating(true);
    }
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Protection', path: '/protection', isPill: true },
    { name: 'Services', path: '/services' },
    { name: 'Free Tools', path: '/tools' },
    { name: 'About Us', path: '/about' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQs', path: '/faq' },
    { name: 'Blog', path: '/blogs' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      {isNavigating && <div className="nav-progress-bar"></div>}
      <header className="sticky top-0 z-[1000] bg-white border-b border-[#eee] shadow-[0_8px_30px_rgba(0,0,0,0.4)] h-[68px] flex items-center justify-center">
        <div className="w-full max-w-[1280px] px-[28px] flex items-center justify-between gap-6">
          
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0" onClick={(e) => handleNavClick(e, '/')}>
            <Image src="/logo.png" alt="RepuKeel Logo" width={180} height={52} className="object-contain w-auto h-[40px] md:h-[48px]" style={{ width: 'auto' }} priority />
          </Link>

          {/* Desktop Nav */}
          {!['/login', '/signup', '/forgot-password', '/reset-password'].includes(pathname) && (
            <>
              <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.path;
              if (link.isPill) {
                return (
                  <Link 
                    key={link.name} 
                    href={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className="flex items-center gap-1.5 bg-[var(--gold)] text-[var(--bg-navy)] rounded-full px-4 py-1.5 font-[700] text-[14px] hover:shadow-lg transition-shadow whitespace-nowrap shrink-0 h-10"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="w-4 h-4">
                      <path d="M12 2l8 4v6c0 5.25-3.6 9-8 10.3C7.6 21 4 17.25 4 12V6l8-4z"/>
                    </svg>
                    {link.name}
                  </Link>
                );
              }

              if (link.name === 'Services') {
                const isOpen = openDropdown === link.name;
                return (
                  <div
                    key={link.name}
                    className="relative has-dropdown"
                    onMouseEnter={() => {
                      if (servicesCloseTimer.current) clearTimeout(servicesCloseTimer.current);
                      setOpenDropdown('Services');
                    }}
                    onMouseLeave={() => {
                      servicesCloseTimer.current = setTimeout(() => setOpenDropdown(null), 150);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') {
                        setOpenDropdown(null);
                        (e.currentTarget.querySelector('a') as HTMLElement | null)?.focus();
                      }
                    }}
                  >
                    {/* Trigger row: real link + chevron toggle */}
                    <span className={`flex items-center gap-0.5 text-[14px] font-[500] transition-colors pb-1 border-b-2 whitespace-nowrap shrink-0 ${
                      isActive || isOpen
                        ? 'text-[var(--gold)] border-[var(--gold)]'
                        : 'text-black border-transparent hover:text-[var(--gold)]'
                    }`}>
                      <Link
                        href="/services"
                        onClick={(e) => {
                          handleNavClick(e, '/services');
                          setOpenDropdown(null);
                        }}
                      >
                        Services
                      </Link>
                      {/* Chevron toggle button — for keyboard and touch */}
                      <button
                        type="button"
                        aria-label="Toggle services menu"
                        aria-expanded={isOpen}
                        aria-haspopup="true"
                        aria-controls="services-panel"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenDropdown(isOpen ? null : 'Services');
                        }}
                        className="flex items-center justify-center p-0.5 focus:outline-none"
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                      </button>
                    </span>

                    {/* The Mega Menu Dropdown — always in DOM for SEO, hidden with CSS when closed */}
                    <div
                      id="services-panel"
                      role="region"
                      aria-label="Services menu"
                      className={`fixed top-[84px] left-[28px] xl:left-[calc(50vw-640px+28px)] mt-0 w-[95vw] max-w-[950px] bg-[#f4f7fb] rounded-3xl shadow-[0_30px_80px_rgba(0,0,0,0.2)] border border-[var(--border-light)] p-4 lg:p-6 z-[1000] overflow-y-auto max-h-[calc(100vh-120px)] transition-all duration-150 ${
                        isOpen
                          ? 'opacity-100 visible pointer-events-auto'
                          : 'opacity-0 invisible pointer-events-none'
                      }`}
                    >
                      <ServicesMenuLayout
                        activeCatId={servicesMenuTab}
                        setActiveCatId={setServicesMenuTab}
                        onLinkClick={() => setOpenDropdown(null)}
                      />
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`text-[14px] font-[500] transition-colors pb-1 border-b-2 whitespace-nowrap shrink-0 ${
                    isActive 
                      ? 'text-[var(--gold)] border-[var(--gold)]' 
                      : 'text-black border-transparent hover:text-[var(--gold)]'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Side Tools */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <ThemeToggle />
            <AccountMenu 
              loginClassName="text-[14px] font-[600] text-black hover:text-[var(--gold)] transition-colors cursor-pointer whitespace-nowrap" 
              menuClassName="" 
            />
          </div>

          {/* Hamburger Mobile */}
          <button 
            className="lg:hidden flex flex-col justify-center items-center w-8 h-8 gap-1.5 z-[1001]" 
            onClick={() => {
              const willOpen = !drawerOpen;
              setDrawerOpen(willOpen);
              if (willOpen) {
                // Collapse other dropdowns, but keep first service tab selected
                setOpenDropdown(null);
                setServicesMenuTab(categories[0]?.slug ?? null);
              }
            }}
            aria-label="Toggle Navigation"
          >
            <span className={`block w-6 h-[2px] bg-[var(--text-heading)] transition-transform ${drawerOpen ? 'rotate-45 translate-y-[8px]' : ''}`}></span>
            <span className={`block w-6 h-[2px] bg-[var(--text-heading)] transition-opacity ${drawerOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-[2px] bg-[var(--text-heading)] transition-transform ${drawerOpen ? '-rotate-45 -translate-y-[8px]' : ''}`}></span>
          </button>
            </>
          )}
        </div>
      </header>

      {/* Mobile Drawer */}
      {drawerOpen && (
        <div id="mobile-drawer" className="fixed inset-0 bg-white z-[1000] pt-[80px] px-6 flex flex-col gap-6 overflow-y-auto">
          {navLinks.map((link) => {
            if (link.name === 'Services') {
              const isOpen = openDropdown === link.name;
              return (
                <div key={link.name} className="flex flex-col gap-4 has-dropdown">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      setOpenDropdown(isOpen ? null : link.name);
                    }}
                    className={`flex justify-between items-center text-xl font-[600] w-full text-left ${pathname.startsWith('/services') ? 'text-[var(--gold)]' : 'text-[var(--text-heading)]'}`}
                  >
                    {link.name}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6"/></svg>
                  </button>
                  {isOpen && (
                    <div className="pl-4 -mr-6 overflow-hidden">
                      <ServicesMenuLayout 
                        activeCatId={servicesMenuTab} 
                        setActiveCatId={setServicesMenuTab} 
                        onLinkClick={() => {
                          setOpenDropdown(null);
                          setDrawerOpen(false);
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            }
            return (
              <Link
                key={link.name}
                href={link.path}
                onClick={(e) => {
                  setDrawerOpen(false);
                  handleNavClick(e, link.path);
                }}
                className={`text-xl font-[600] ${pathname === link.path ? 'text-[var(--gold)]' : 'text-[var(--text-heading)]'}`}
              >
                {link.name}
              </Link>
            );
          })}
          <div className="w-full h-px bg-[#eee] my-2"></div>
          <AccountMenu 
              loginClassName="text-xl font-[600] text-[var(--text-heading)]" 
              menuClassName="mt-2" 
              onNavigate={() => setDrawerOpen(false)}
            />
        </div>
      )}
    </>
  );
}
