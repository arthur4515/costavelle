import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/format';

export default function ProductCard({ product, index = 0 }) {
  // Lógica de fallback se hook não puder ser chamado diretamente no preview
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    // A integração com useCart ocorrerá onde o Cart estiver montado.
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      whileInView={{ opacity: 1, y: 0 }} 
      viewport={{ once: true }} 
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group flex flex-col w-full h-full"
    >
      <Link to={`/produto/${product.id}`} className="block relative aspect-[3/4] overflow-hidden bg-muted mb-4">
        <img 
          src={product.image || ''} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" 
        />
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 hidden lg:block">
           <button className="w-full bg-background/95 backdrop-blur-md text-foreground font-body text-[10px] tracking-[0.2em] uppercase py-3 hover:bg-foreground hover:text-background transition-colors">
             Adicionar à Sacola
           </button>
        </div>
      </Link>
      
      <div className="text-center sm:text-left flex-1 flex flex-col justify-between">
        <div>
          <p className="font-body text-[9px] tracking-widest uppercase text-muted-foreground mb-1.5">
            {product.category}
          </p>
          <Link to={`/produto/${product.id}`}>
            <h3 className="font-heading text-base sm:text-lg text-foreground mb-1 group-hover:opacity-70 transition-opacity line-clamp-1">
              {product.name}
            </h3>
          </Link>
          <p className="font-body text-xs sm:text-sm text-foreground/80 mb-4 sm:mb-0">
            {formatCurrency(product.price)}
          </p>
        </div>
        
        <button className="lg:hidden w-full border border-border text-foreground font-body text-[9px] tracking-[0.2em] uppercase py-3 mt-auto hover:bg-foreground hover:text-background transition-colors">
          Adicionar
        </button>
      </div>
    </motion.div>
  );
}
