import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Lock } from 'lucide-react';
import { toast } from 'sonner';
import useCart from '../hooks/useCart';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { formatCurrency } from '../utils/format';

export default function Checkout() {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_cpf: '',
    customer_phone: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    payment_method: 'credit_card',
  });

  const update = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.customer_name || !form.customer_email || !form.customer_cpf || !form.address || !form.city || !form.state || !form.zip_code) {
      toast.error('Preencha os campos obrigatórios', {
        style: { background: '#FAFAF8', color: '#2A2421', border: '1px solid #E5E5E5', fontSize: '12px' }
      });
      return;
    }
    setSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1200));
    clearCart();
    toast.success('Pedido finalizado com sucesso!', {
      style: { background: '#FAFAF8', color: '#2A2421', border: '1px solid #E5E5E5', fontSize: '12px' }
    });
    navigate('/');
    setSubmitting(false);
  };

  if (items.length === 0) {
    return (
      <div className="pt-32 pb-24 min-h-screen flex flex-col items-center justify-center bg-background text-foreground">
        <p className="font-heading text-3xl mb-6">Sua sacola está vazia</p>
        <Link to="/loja" className="font-body text-[10px] tracking-[0.2em] uppercase border-b border-foreground pb-1 hover:opacity-70 transition-opacity">Voltar para a loja</Link>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 min-h-screen bg-background text-foreground">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <Link to="/carrinho" className="inline-flex items-center gap-2 font-body text-[9px] tracking-widest uppercase text-muted-foreground hover:text-foreground mb-12 transition-colors">
          <ChevronLeft className="w-3 h-3" />
          Voltar para a sacola
        </Link>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="font-heading text-4xl sm:text-5xl font-normal mb-12">Finalização</motion.h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            <div className="lg:col-span-7 space-y-12">
              <div>
                <h3 className="font-body text-[10px] tracking-[0.2em] uppercase mb-6 text-foreground/70">Identificação Pessoal</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <Label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Nome Completo *</Label>
                    <Input value={form.customer_name} onChange={e => update('customer_name', e.target.value)} className="mt-2 font-body bg-transparent border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground" />
                  </div>
                  <div className="sm:col-span-2">
                    <Label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">E-mail *</Label>
                    <Input type="email" value={form.customer_email} onChange={e => update('customer_email', e.target.value)} className="mt-2 font-body bg-transparent border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground" />
                  </div>
                  <div>
                    <Label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">CPF *</Label>
                    <Input value={form.customer_cpf} onChange={e => update('customer_cpf', e.target.value)} placeholder="000.000.000-00" className="mt-2 font-body bg-transparent border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground" />
                  </div>
                  <div>
                    <Label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Telefone</Label>
                    <Input value={form.customer_phone} onChange={e => update('customer_phone', e.target.value)} placeholder="(00) 00000-0000" className="mt-2 font-body bg-transparent border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground" />
                  </div>
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-border/50"></div>
              
              <div>
                <h3 className="font-body text-[10px] tracking-[0.2em] uppercase mb-6 text-foreground/70">Endereço de Entrega</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="sm:col-span-2">
                    <Label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Endereço (Rua, Número) *</Label>
                    <Input value={form.address} onChange={e => update('address', e.target.value)} className="mt-2 font-body bg-transparent border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground" />
                  </div>
                  <div>
                    <Label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Cidade *</Label>
                    <Input value={form.city} onChange={e => update('city', e.target.value)} className="mt-2 font-body bg-transparent border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">Estado *</Label>
                      <Input value={form.state} onChange={e => update('state', e.target.value)} placeholder="SP" className="mt-2 font-body bg-transparent border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground" />
                    </div>
                    <div>
                      <Label className="font-body text-[10px] tracking-widest uppercase text-muted-foreground">CEP *</Label>
                      <Input value={form.zip_code} onChange={e => update('zip_code', e.target.value)} placeholder="00000-000" className="mt-2 font-body bg-transparent border-border rounded-none focus-visible:ring-0 focus-visible:border-foreground" />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="w-full h-[1px] bg-border/50"></div>
              
              <div>
                <h3 className="font-body text-[10px] tracking-[0.2em] uppercase mb-6 text-foreground/70">Método de Pagamento</h3>
                <div className="space-y-4">
                  {[{ value: 'credit_card', label: 'Cartão de Crédito', desc: 'Até 6x sem juros' }, { value: 'pix', label: 'PIX', desc: '5% de desconto à vista' }].map(opt => (
                    <label key={opt.value} className={`flex items-start space-x-4 border p-5 cursor-pointer transition-colors ${form.payment_method === opt.value ? 'border-foreground bg-muted/30' : 'border-border hover:border-foreground/50'}`}>
                      <input type="radio" name="payment" checked={form.payment_method === opt.value} onChange={() => update('payment_method', opt.value)} className="accent-foreground mt-0.5" />
                      <div className="flex flex-col">
                        <span className="font-body text-sm font-medium">{opt.label}</span>
                        <span className="font-body text-[10px] text-muted-foreground mt-1 uppercase tracking-wider">{opt.desc}</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5">
              <div className="border border-border p-8 sticky top-24">
                <h3 className="font-heading text-2xl mb-8">Resumo da Compra</h3>
                <div className="space-y-6 mb-8 max-h-[300px] overflow-y-auto pr-2">
                  {items.map(item => (
                    <div key={`${item.id}-${item.size}`} className="flex gap-4">
                      <div className="w-16 h-20 bg-muted overflow-hidden flex-shrink-0"><img src={item.image} alt="" className="w-full h-full object-cover" /></div>
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <p className="font-heading text-sm sm:text-base truncate mb-1">{item.name}</p>
                        <p className="font-body text-[9px] tracking-widest uppercase text-muted-foreground">Tam: {item.size} <span className="mx-1">|</span> Qtd: {item.quantity}</p>
                      </div>
                      <div className="flex items-center">
                         <span className="font-body text-sm">{formatCurrency(item.price * item.quantity)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-6 mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-body text-xs text-foreground/70">Subtotal</span>
                    <span className="font-body text-xs">{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-body text-xs text-foreground/70">Frete (Padrão)</span>
                    <span className="font-body text-[10px] tracking-widest uppercase text-foreground/50">Grátis</span>
                  </div>
                  {form.payment_method === 'pix' && (
                     <div className="flex justify-between items-center mb-4">
                       <span className="font-body text-xs text-green-700">Desconto PIX (5%)</span>
                       <span className="font-body text-xs text-green-700">-{formatCurrency(total * 0.05)}</span>
                     </div>
                  )}
                  <div className="flex justify-between items-center pt-4 border-t border-border mt-6">
                    <span className="font-heading text-xl">Total</span>
                    <span className="font-body text-lg">
                      {form.payment_method === 'pix' ? formatCurrency(total * 0.95) : formatCurrency(total)}
                    </span>
                  </div>
                </div>
                <button type="submit" disabled={submitting} className="w-full flex items-center justify-center gap-3 bg-foreground text-background font-body text-[10px] tracking-[0.2em] uppercase py-5 hover:opacity-90 transition-opacity disabled:opacity-50">
                  <Lock className="w-3 h-3" />
                  {submitting ? 'Processando...' : 'Confirmar Pedido'}
                </button>
                <div className="mt-6 flex flex-col items-center text-center gap-2">
                  <p className="font-body text-[9px] text-muted-foreground uppercase tracking-wider">Ambiente 100% Seguro</p>
                  <p className="font-body text-[9px] text-muted-foreground italic">Protótipo de apresentação - Nenhuma cobrança real será feita.</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
