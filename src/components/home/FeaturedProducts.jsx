import { Link } from 'react-router-dom';
import ProductCard from '../ProductCard';

export default function FeaturedProducts({ products }) {
  if (!products.length) return null;

  return (
    <section className="py-20 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-12 sm:mb-16 gap-6">
          <div className="text-center sm:text-left">
            <h2 className="font-heading text-4xl sm:text-5xl text-foreground mb-3">Destaques</h2>
            <p className="font-body text-[10px] text-muted-foreground uppercase tracking-widest">Nossa Curadoria Exclusiva</p>
          </div>
          <Link to="/loja" className="hidden sm:inline-block font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground hover:text-foreground border-b border-transparent hover:border-foreground transition-all pb-1">
            Ver Coleção Completa
          </Link>
        </div>
        
        {/* Grid: 2 colunas mobile, 4 colunas desktop. Gap menor no mobile para formato catálogo. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {products.slice(0, 4).map((p, i) => (
             <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>

        {/* Botão Mobile - 100% largura */}
        <div className="mt-10 text-center sm:hidden">
           <Link to="/loja" className="inline-block border border-foreground w-full font-body text-[10px] tracking-[0.2em] uppercase text-foreground py-4 hover:bg-foreground hover:text-background transition-colors">
            Ver Coleção Completa
          </Link>
        </div>
      </div>
    </section>
  );
}
