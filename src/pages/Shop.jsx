import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, X, ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { getProducts } from '@/services/products';

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || '';
  
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(initialCategory);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Simulating filters state
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  useEffect(() => {
    getProducts().then(setProducts);
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const cat = searchParams.get('category') || '';
    setCategory(cat);
  }, [searchParams]);

  const handleCategoryChange = (newCat) => {
    setCategory(newCat);
    setSearchParams(newCat ? { category: newCat } : {});
  };

  const filteredProducts = products.filter(p => {
    const matchCategory = !category || p.category.toLowerCase() === category.toLowerCase();
    const matchGender = !selectedGender || p.gender === selectedGender;
    const matchSize = !selectedSize || p.sizes.includes(selectedSize);
    const matchSearch = !searchQuery || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchGender && matchSize && matchSearch;
  });

  const categoryLabels = {
    '': 'A Coleção Completa',
    'linen': 'A Leveza do Linho',
    'travel': 'Prontos para Partir',
    'beach': 'Essenciais de Beira-Mar',
  };

  // Prevent scroll when mobile filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isFilterOpen]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header da Coleção */}
        <div className="text-center mb-16">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Curadoria CostaVelle
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl sm:text-6xl font-normal text-foreground">
            {searchQuery ? `Resultados para "${searchQuery}"` : categoryLabels[category]}
          </motion.h1>
        </div>

        {/* Categorias Tabs (Desktop) */}
        <div className="hidden sm:flex justify-center gap-12 mb-16 border-b border-border">
          {[{ val: '', label: 'Ver Tudo' }, { val: 'linen', label: 'Linho' }, { val: 'travel', label: 'Viagem' }, { val: 'beach', label: 'Praia' }].map(c => (
            <button
              key={c.val}
              onClick={() => handleCategoryChange(c.val)}
              className={`font-body text-[10px] tracking-[0.2em] uppercase pb-4 -mb-[1px] border-b-2 transition-colors ${category === c.val ? 'border-foreground text-foreground' : 'border-transparent text-muted-foreground hover:text-foreground'}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Action Bar (Mobile & Desktop) */}
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-border sm:border-none sm:pb-0">
          <button 
            onClick={() => setIsFilterOpen(true)} 
            className="flex items-center gap-2 font-body text-[10px] tracking-[0.2em] uppercase text-foreground hover:opacity-70 transition-opacity"
          >
            <Filter className="w-4 h-4" /> Filtros {(selectedGender || selectedSize) && '(Ativos)'}
          </button>
          <span className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">{filteredProducts.length} Peças</span>
        </div>

        {/* Grade de Produtos - 2 cols mobile, 4 cols desktop */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
            {filteredProducts.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        ) : (
           <div className="text-center py-32 border border-border">
             <p className="font-heading text-2xl text-muted-foreground mb-4">Nenhuma peça encontrada.</p>
             <button onClick={() => { setCategory(''); setSelectedGender(''); setSelectedSize(''); }} className="font-body text-[10px] uppercase tracking-widest border-b border-foreground pb-1">Limpar Filtros</button>
           </div>
        )}

        {/* Mobile Filter Drawer / Desktop Modal */}
        <AnimatePresence>
          {isFilterOpen && (
            <>
              {/* Overlay */}
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setIsFilterOpen(false)}
                className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
              />
              
              {/* Drawer */}
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-background z-[70] shadow-2xl flex flex-col"
              >
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h3 className="font-heading text-2xl">Filtros</h3>
                  <button onClick={() => setIsFilterOpen(false)} className="p-2 hover:bg-muted transition-colors rounded-full">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="flex-1 overflow-y-auto p-6 space-y-10">
                  {/* Categoria (visível apenas no mobile drawer para facilitar navegação) */}
                  <div className="sm:hidden">
                    <h4 className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Coleção</h4>
                    <div className="space-y-3">
                      {[{ val: '', label: 'Todas as Peças' }, { val: 'linen', label: 'Linen Collection' }, { val: 'travel', label: 'Travel Ready' }, { val: 'beach', label: 'Beach Essentials' }].map(c => (
                        <label key={c.val} className="flex items-center gap-3 cursor-pointer">
                          <input type="radio" checked={category === c.val} onChange={() => handleCategoryChange(c.val)} className="accent-foreground" />
                          <span className="font-body text-sm">{c.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Departamento</h4>
                    <div className="flex gap-3">
                      {['male', 'female'].map(g => (
                        <button key={g} onClick={() => setSelectedGender(selectedGender === g ? '' : g)} className={`flex-1 py-3 border font-body text-[10px] tracking-widest uppercase transition-colors ${selectedGender === g ? 'bg-foreground text-background border-foreground' : 'border-border text-foreground hover:border-foreground/50'}`}>
                          {g === 'male' ? 'Masculino' : 'Feminino'}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-4">Tamanho</h4>
                    <div className="grid grid-cols-4 gap-3">
                      {['P', 'M', 'G', 'GG'].map(s => (
                        <button key={s} onClick={() => setSelectedSize(selectedSize === s ? '' : s)} className={`py-3 border font-body text-xs tracking-wider transition-colors ${selectedSize === s ? 'bg-foreground text-background border-foreground' : 'border-border text-foreground hover:border-foreground/50'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 border-t border-border mt-auto">
                  <button onClick={() => setIsFilterOpen(false)} className="w-full bg-foreground text-background font-body text-[10px] tracking-[0.2em] uppercase py-4 hover:opacity-90 transition-opacity">
                    Aplicar Filtros
                  </button>
                  {(selectedGender || selectedSize || category) && (
                    <button onClick={() => { setCategory(''); setSelectedGender(''); setSelectedSize(''); }} className="w-full mt-4 text-foreground font-body text-[10px] tracking-[0.2em] uppercase hover:opacity-70 transition-opacity">
                      Limpar Tudo
                    </button>
                  )}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
