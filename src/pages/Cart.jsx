import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import useCart from '../hooks/useCart';
import { formatCurrency } from '../utils/format';

export default function Cart() {
  const { items, updateQuantity, removeItem, total } = useCart();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {items.length === 0 ? (
          <div className="text-center py-20 sm:py-28 min-h-[460px] flex flex-col items-center justify-center">
            <ShoppingBag className="w-8 h-8 text-foreground/40 mx-auto mb-6 stroke-[1]" />
            <p className="font-heading text-3xl sm:text-4xl mb-4 font-normal">Sua sacola está vazia</p>
            <p className="font-body text-sm text-muted-foreground mb-8 font-light">Explore a coleção e descubra o essencial do verão.</p>
            <Link to="/loja" className="inline-flex items-center gap-3 border border-foreground text-foreground font-body text-[10px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-foreground hover:text-background transition-colors">
              Explorar Coleção
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-16 text-center sm:text-left">
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Revisão</p>
            <h1 className="font-heading text-4xl sm:text-5xl font-normal">Sua Sacola</h1>
          </motion.div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-8 space-y-0">
              <div className="border-b border-border pb-4 mb-6 hidden sm:grid grid-cols-12 gap-4">
                <span className="col-span-6 font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground">Produto</span>
                <span className="col-span-3 font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground text-center">Quantidade</span>
                <span className="col-span-2 font-body text-[9px] tracking-[0.2em] uppercase text-muted-foreground text-right">Total</span>
                <span className="col-span-1" />
              </div>
              {items.map((item, i) => (
                <motion.div key={`${item.id}-${item.size}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="grid grid-cols-1 sm:grid-cols-12 gap-6 sm:gap-4 items-center py-6 border-b border-border">
                  <div className="sm:col-span-6 flex items-center gap-6">
                    <Link to={`/produto/${item.id}`} className="w-24 h-32 bg-muted overflow-hidden flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </Link>
                    <div>
                      <Link to={`/produto/${item.id}`} className="font-heading text-xl hover:opacity-70 transition-opacity line-clamp-1">{item.name}</Link>
                      <p className="font-body text-[10px] tracking-widest uppercase text-muted-foreground mt-2">Tam: {item.size}</p>
                      <p className="font-body text-sm mt-2 text-foreground/80">{formatCurrency(item.price)}</p>
                    </div>
                  </div>
                  <div className="sm:col-span-3 flex sm:justify-center">
                    <div className="inline-flex items-center border border-border">
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)} className="p-3 hover:bg-muted transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="px-4 font-body text-xs">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} className="p-3 hover:bg-muted transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                  </div>
                  <div className="sm:col-span-2 text-left sm:text-right">
                    <span className="font-body text-sm">{formatCurrency(item.price * item.quantity)}</span>
                  </div>
                  <div className="sm:col-span-1 text-right absolute right-4 sm:relative sm:right-0">
                    <button onClick={() => removeItem(item.id, item.size)} className="p-2 text-muted-foreground hover:text-foreground transition-colors"><Trash2 className="w-4 h-4 stroke-[1.5]" /></button>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="lg:col-span-4">
              <div className="border border-border p-8 sticky top-24">
                <h3 className="font-heading text-2xl mb-8">Resumo do Pedido</h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between font-body text-xs tracking-wide">
                    <span className="text-foreground/70">Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between font-body text-xs tracking-wide">
                    <span className="text-foreground/70">Frete</span>
                    <span className="text-muted-foreground text-[10px] uppercase tracking-widest">Calculado na Finalização</span>
                  </div>
                </div>
                <div className="border-t border-border pt-6 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="font-heading text-xl">Total</span>
                    <span className="font-body text-lg">{formatCurrency(total)}</span>
                  </div>
                </div>
                <Link to="/checkout" className="block w-full bg-foreground text-background font-body text-[10px] tracking-[0.2em] uppercase py-4 text-center hover:opacity-90 transition-opacity">Finalizar Compra</Link>
                <div className="mt-6 flex items-center justify-center gap-4">
                   <Link to="/loja" className="font-body text-[9px] tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors border-b border-transparent hover:border-foreground pb-1">Continuar Comprando</Link>
                </div>
              </div>
            </div>
          </div>
          </>
        )}
      </div>
    </div>
  );
}
