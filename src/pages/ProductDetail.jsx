import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, Ruler, Truck, ShieldCheck, ChevronDown, ChevronUp } from 'lucide-react';
import { toast } from 'sonner';
import useCart from '../hooks/useCart';
import { formatCurrency } from '../utils/format';
// Simulação de banco de dados
import productsData from '../../server/database/products.json';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const product = productsData.find(p => p.id === id);
  
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [openAccordion, setOpenAccordion] = useState('description');

  useEffect(() => {
    window.scrollTo(0, 0);
    if (product) {
      setSelectedSize(product.sizes[1] || product.sizes[0]);
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="pt-32 min-h-screen text-center flex flex-col items-center justify-center">
        <h1 className="font-heading text-3xl mb-4">Peça não encontrada</h1>
        <Link to="/loja" className="font-body text-xs tracking-widest uppercase border-b border-foreground pb-1">Retornar à Coleção</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error('Por favor, selecione um tamanho', { style: { background: '#FAFAF8', color: '#2A2421', border: '1px solid #E5E5E5' } });
      return;
    }
    addItem(product, selectedSize, 1);
    toast.success(`${product.name} adicionado à sacola`, { style: { background: '#FAFAF8', color: '#2A2421', border: '1px solid #E5E5E5' } });
  };

  const accordions = [
    { id: 'description', title: 'Detalhes da Peça', content: product.description },
    { id: 'care', title: 'Composição & Cuidados', content: `Composição: ${product.material}. Lave à mão com água fria e sabão neutro. Seque à sombra para preservar a textura natural. Não utilize secadora.` },
    { id: 'shipping', title: 'Envio & Devoluções', content: 'Frete grátis para todo o Brasil. Primeira troca gratuita em até 30 dias após o recebimento. Embalagem signature CostaVelle inclusa.' }
  ];

  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-body text-[9px] tracking-widest uppercase text-muted-foreground mb-10">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/loja" className="hover:text-foreground transition-colors">Coleção</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="space-y-4">
            <div className="aspect-[3/4] bg-muted w-full overflow-hidden">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>
            {/* Espaço para thumbnails caso houvesse na API */}
          </motion.div>

          {/* Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex flex-col">
            <div className="mb-8">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">{product.category}</p>
              <h1 className="font-heading text-4xl sm:text-5xl font-normal text-foreground mb-4">{product.name}</h1>
              <p className="font-heading text-2xl text-foreground/90">{formatCurrency(product.price)}</p>
            </div>

            <div className="space-y-8 mb-10">
              {/* Colors */}
              {product.colors && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-body text-[10px] tracking-widest uppercase text-foreground/70">Cor: {selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button key={color} onClick={() => setSelectedColor(color)} className={`px-5 py-3 font-body text-[10px] tracking-widest uppercase transition-colors border ${selectedColor === color ? 'border-foreground bg-foreground text-background' : 'border-border text-foreground hover:border-foreground/50'}`}>
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sizes */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-[10px] tracking-widest uppercase text-foreground/70">Tamanho</span>
                  <button className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                    <Ruler className="w-3 h-3" /> Guia de Medidas
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`min-w-[48px] px-4 py-3 font-body text-xs tracking-wider transition-colors border ${selectedSize === size ? 'border-foreground bg-foreground text-background' : 'border-border text-foreground hover:border-foreground/50'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={handleAddToCart} className="w-full bg-foreground text-background font-body text-[10px] tracking-[0.2em] uppercase py-5 mb-10 hover:opacity-90 transition-opacity">
              Adicionar à Sacola
            </button>

            {/* Accordions */}
            <div className="border-t border-border mt-auto">
              {accordions.map((acc) => (
                <div key={acc.id} className="border-b border-border">
                  <button onClick={() => setOpenAccordion(openAccordion === acc.id ? '' : acc.id)} className="w-full py-5 flex items-center justify-between text-left group">
                    <span className="font-body text-xs tracking-widest uppercase text-foreground group-hover:text-foreground/70 transition-colors">{acc.title}</span>
                    {openAccordion === acc.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  {openAccordion === acc.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pb-6">
                      <p className="font-body text-sm text-foreground/70 leading-relaxed font-light">{acc.content}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
               <div className="flex items-center gap-3">
                 <Truck className="w-5 h-5 text-muted-foreground stroke-[1.5]" />
                 <span className="font-body text-[9px] uppercase tracking-widest text-foreground/70">Frete Grátis Br</span>
               </div>
               <div className="flex items-center gap-3">
                 <ShieldCheck className="w-5 h-5 text-muted-foreground stroke-[1.5]" />
                 <span className="font-body text-[9px] uppercase tracking-widest text-foreground/70">Compra Segura</span>
               </div>
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}
