import { useRef, useEffect } from 'react';

export const HeaderLogo = () => {
  const shuklaRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!shuklaRef.current) return;
      if (window.scrollY > 20) {
        shuklaRef.current.classList.remove('text-white', 'group-hover:text-zinc-300');
        shuklaRef.current.classList.add('text-yellow-400');
      } else {
        shuklaRef.current.classList.remove('text-yellow-400');
        shuklaRef.current.classList.add('text-white', 'group-hover:text-zinc-300');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-5 left-6 sm:left-8 z-50 flex flex-col items-start select-none pointer-events-auto cursor-pointer group px-1 py-2 rounded-xl">
      <span className="text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-zinc-200 transition-colors duration-300 uppercase leading-none">
        AARJAV
      </span>
      <span
        ref={shuklaRef}
        className="text-xs sm:text-sm font-bold tracking-wider text-white group-hover:text-zinc-200 transition-colors duration-300 uppercase leading-none mt-0.5"
      >
        SHUKLA
      </span>
    </div>
  );
};

export default HeaderLogo;
