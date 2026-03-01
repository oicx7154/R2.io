import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Page = 'home' | 'version' | 'games' | 'scripts' | 'getkey';
import SSImage from './icon.png';

const sectionLinks = [
  { label: '功能', href: '#features', page: null as Page | null },
  { label: '游戏', href: '#/games', page: 'games' as Page },
  { label: '脚本', href: '#/scripts', page: 'scripts' as Page },
  { label: '获取卡密', href: '#/getkey', page: 'getkey' as Page },
  { label: '版本', href: '#/version', page: 'version' as Page },
  { label: '常见问题', href: '#faq', page: null as Page | null },
];

export default function Navbar({
  navigate,
  currentPage,
}: {
  navigate: (p: Page) => void;
  currentPage: Page;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = (link: typeof sectionLinks[number]) => {
    setMobileOpen(false);
    if (link.page) {
      navigate(link.page);
    } else {
      if (currentPage !== 'home') {
        navigate('home');
        setTimeout(() => {
          const el = document.querySelector(link.href);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  };

  const handleLogoClick = () => {
    setMobileOpen(false);
    navigate('home');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#050510]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-indigo-500/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <button onClick={handleLogoClick} className="flex items-center gap-2 group">
          <div className="w-9 h-9 rounded-lg overflow-hidden shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow">
            <img
              src={SSImage}
              alt="RSHUB Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                const parent = (e.target as HTMLImageElement).parentElement;
                if (parent) {
                  parent.innerHTML = `<div class="w-full h-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center"><span class="text-white text-xs font-black">LX</span></div>`;
                }
              }}
            />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="text-white">RS</span>
            <span className="text-gradient">Hub</span>
          </span>
        </button>

        <div className="hidden md:flex items-center gap-1">
          {sectionLinks.map((l) => {
            const isActive = l.page ? currentPage === l.page : false;
            return l.page ? (
              <button
                key={l.label}
                onClick={() => handleLinkClick(l)}
                className={`px-4 py-2 text-sm rounded-lg transition-all duration-300 ${
                  isActive
                    ? 'text-indigo-400 bg-indigo-500/10'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {l.label}
              </button>
            ) : (
              <a
                key={l.label}
                href={currentPage === 'home' ? l.href : undefined}
                onClick={(e) => {
                  if (currentPage !== 'home') {
                    e.preventDefault();
                    handleLinkClick(l);
                  }
                }}
                className="px-4 py-2 text-sm text-slate-400 hover:text-white rounded-lg hover:bg-white/5 transition-all duration-300"
              >
                {l.label}
              </a>
            );
          })}
        </div>

        <button
          className="md:hidden text-slate-300"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0a0a1a]/95 backdrop-blur-xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-6 py-4 flex flex-col gap-1">
              {sectionLinks.map((l) => {
                const isActive = l.page ? currentPage === l.page : false;
                return l.page ? (
                  <button
                    key={l.label}
                    onClick={() => handleLinkClick(l)}
                    className={`px-4 py-3 text-left rounded-lg transition-all ${
                      isActive
                        ? 'text-indigo-400 bg-indigo-500/10'
                        : 'text-slate-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {l.label}
                  </button>
                ) : (
                  <a
                    key={l.label}
                    href={currentPage === 'home' ? l.href : undefined}
                    onClick={(e) => {
                      if (currentPage !== 'home') {
                        e.preventDefault();
                        handleLinkClick(l);
                      } else {
                        setMobileOpen(false);
                      }
                    }}
                    className="px-4 py-3 text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-all"
                  >
                    {l.label}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
