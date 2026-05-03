import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Ruler, ShieldCheck, Truck } from 'lucide-react';
import { toast } from 'sonner';
import useCart from '../hooks/useCart';
import { formatCurrency } from '../utils/format';
import { getProduct } from '@/services/products';

export default function ProductDetail() {
  const { id } = useParams();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedImage, setSelectedImage] = useState(0);
  const [openAccordion, setOpenAccordion] = useState('description');

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    getProduct(id)
      .then(item => {
        setProduct(item);
        setSelectedSize(item.sizes[1] || item.sizes[0]);
        setSelectedColor(item.colors[0]);
        setSelectedImage(0);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="pt-20 flex justify-center items-center min-h-screen">
        <div className="w-6 h-6 border-2 border-border border-t-foreground rounded-full animate-spin" />
      </div>
    );
  }

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
    { id: 'shipping', title: 'Envio & Devoluções', content: 'Frete grátis para todo o Brasil. Primeira troca gratuita em até 30 dias após o recebimento. Embalagem signature CostaVelle inclusa.' },
  ];
  const galleryImages = (product.images?.length ? product.images : [product.image].filter(Boolean)).slice(0, 3);
  const showPreviousImage = () => setSelectedImage(current => (current - 1 + galleryImages.length) % galleryImages.length);
  const showNextImage = () => setSelectedImage(current => (current + 1) % galleryImages.length);

  return (
    <div className="pt-24 pb-24 min-h-screen bg-background">
      <div className="mx-auto max-w-[1360px] px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-2 font-body text-[9px] tracking-widest uppercase text-muted-foreground mb-10">
          <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link to="/loja" className="hover:text-foreground transition-colors">Coleção</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,710px)_minmax(420px,520px)] lg:gap-14 xl:gap-16">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className={galleryImages.length > 1 ? 'grid grid-cols-[60px_minmax(0,1fr)] gap-4 items-start sm:grid-cols-[76px_minmax(0,1fr)]' : 'block'}
          >
            {galleryImages.length > 1 && (
              <div className="grid grid-cols-1 gap-3">
                {galleryImages.map((image, index) => (
                  <button
                    key={image}
                    type="button"
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-[3/4] overflow-hidden border transition-all duration-300 ${selectedImage === index ? 'border-foreground opacity-100' : 'border-transparent opacity-50 hover:opacity-100'}`}
                    aria-label={`Ver foto ${index + 1} de ${product.name}`}
                  >
                    <img src={image} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            <div className="group relative aspect-[4/5] w-full overflow-hidden bg-muted">
              <motion.img
                key={galleryImages[selectedImage]}
                initial={{ opacity: 0.85 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                src={galleryImages[selectedImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />

              {galleryImages.length > 1 && (
                <>
                  <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={showPreviousImage}
                      className="flex h-10 w-10 items-center justify-center bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background"
                      aria-label="Foto anterior"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      type="button"
                      onClick={showNextImage}
                      className="flex h-10 w-10 items-center justify-center bg-background/90 text-foreground shadow-sm backdrop-blur-sm transition-colors hover:bg-foreground hover:text-background"
                      aria-label="Próxima foto"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                    {galleryImages.map((image, index) => (
                      <button
                        key={`indicator-${image}`}
                        type="button"
                        onClick={() => setSelectedImage(index)}
                        className={`h-2 w-2 rounded-full border border-background transition-all ${selectedImage === index ? 'bg-background' : 'bg-background/30 hover:bg-background/70'}`}
                        aria-label={`Ir para foto ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex w-full max-w-none flex-col lg:pt-1">
            <div className="mb-7">
              <p className="font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-3">{product.category}</p>
              <h1 className="font-heading text-4xl sm:text-5xl font-normal text-foreground mb-4 tracking-tight">{product.name}</h1>
              <p className="font-body text-lg text-foreground/70 tracking-wide">{formatCurrency(product.price)}</p>
            </div>

            <div className="space-y-7 mb-9">
              {product.colors && (
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-body text-[10px] tracking-widest uppercase text-foreground/70">Cor: {selectedColor}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.colors.map(color => (
                      <button key={color} onClick={() => setSelectedColor(color)} className={`px-5 py-3 font-body text-[10px] tracking-widest uppercase transition-all duration-300 border ${selectedColor === color ? 'border-foreground bg-foreground text-background shadow-sm' : 'border-border text-foreground hover:border-foreground hover:bg-foreground/5'}`}>
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <div className="flex justify-between items-center mb-3">
                  <span className="font-body text-[10px] tracking-widest uppercase text-foreground/70">Tamanho</span>
                  <button className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors">
                    <Ruler className="w-3 h-3" /> Guia de Medidas
                  </button>
                </div>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button key={size} onClick={() => setSelectedSize(size)} className={`min-w-[48px] px-4 py-3 font-body text-xs tracking-wider transition-all duration-300 border ${selectedSize === size ? 'border-foreground bg-foreground text-background shadow-sm' : 'border-border text-foreground hover:border-foreground hover:bg-foreground/5'}`}>
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button onClick={handleAddToCart} className="w-full bg-foreground text-background font-body text-[10px] tracking-[0.2em] uppercase py-5 mb-10 transition-all duration-300 hover:bg-foreground/90 hover:shadow-lg transform hover:-translate-y-0.5">
              Adicionar à Sacola
            </button>

            <div className="border-t border-border">
              {accordions.map(acc => (
                <div key={acc.id} className="border-b border-border">
                  <button onClick={() => setOpenAccordion(openAccordion === acc.id ? '' : acc.id)} className="w-full py-5 flex items-center justify-between text-left group">
                    <span className="font-body text-xs tracking-widest uppercase text-foreground group-hover:text-foreground/70 transition-colors">{acc.title}</span>
                    {openAccordion === acc.id ? <ChevronUp className="w-4 h-4 text-muted-foreground" /> : <ChevronDown className="w-4 h-4 text-muted-foreground" />}
                  </button>
                  {openAccordion === acc.id && (
                    <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="pb-6">
                      <p className="font-body text-sm text-muted-foreground leading-relaxed font-light">{acc.content}</p>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-3 group cursor-pointer">
                <Truck className="w-5 h-5 text-muted-foreground stroke-[1.5] group-hover:text-foreground transition-colors" />
                <span className="font-body text-[10px] uppercase tracking-widest text-foreground/70 group-hover:text-foreground transition-colors">Frete Grátis Br</span>
              </div>
              <div className="flex items-center gap-3 group cursor-pointer">
                <ShieldCheck className="w-5 h-5 text-muted-foreground stroke-[1.5] group-hover:text-foreground transition-colors" />
                <span className="font-body text-[10px] uppercase tracking-widest text-foreground/70 group-hover:text-foreground transition-colors">Compra Segura</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
