import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import useCart from '@/hooks/useCart';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { count: cartCount } = useCart();
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { to: '/loja', label: 'Coleção' },
    { to: '/sobre', label: 'Maison' },
  ];

  const isTransparent = !scrolled && location.pathname === '/';
  const textColor = isTransparent ? 'text-white' : 'text-foreground';

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${isTransparent ? 'bg-transparent py-6' : 'bg-background border-b border-border py-4'} ${textColor}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        
        {/* Left: Mobile Menu Toggle / Desktop Links */}
        <div className="flex-1 flex items-center">
          <button onClick={() => setOpen(!open)} className="sm:hidden -ml-2 p-2">
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <nav className="hidden sm:flex items-center gap-8">
            {navLinks.map(l => (
              <Link key={l.to} to={l.to} className="font-body text-[10px] tracking-[0.2em] uppercase hover:opacity-50 transition-opacity">
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Center: Logo */}
        <Link to="/" className="font-heading text-2xl sm:text-3xl tracking-wide absolute left-1/2 -translate-x-1/2">
          CostaVelle
        </Link>

        {/* Right: Cart & Search */}
        <div className="flex-1 flex items-center justify-end gap-6">
          <button className="hover:opacity-50 transition-opacity hidden sm:block">
            <Search className="w-4 h-4" />
          </button>
          <Link to="/carrinho" className="relative hover:opacity-50 transition-opacity">
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && <span className="absolute -top-2 -right-2 w-[14px] h-[14px] bg-foreground text-background text-[9px] flex items-center justify-center rounded-full">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="absolute top-full left-0 w-full bg-background text-foreground border-b border-border sm:hidden flex flex-col p-6 gap-6">
          {navLinks.map(l => (
            <Link key={l.to} to={l.to} className="font-heading text-2xl">
              {l.label}
            </Link>
          ))}
          <Link to="/contato" className="font-heading text-2xl">Contato</Link>
        </div>
      )}
    </header>
  );
}
