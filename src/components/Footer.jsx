import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-foreground text-background pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
          <div className="md:col-span-2">
            <h2 className="font-heading text-3xl tracking-wide mb-6">CostaVelle</h2>
            <p className="font-body text-sm text-background/70 leading-relaxed max-w-sm mb-8 font-light">
              O luxo sutil que acompanha você das areias costeiras ao concreto da cidade. Elegância atemporal, matéria-prima natural e design minimalista.
            </p>
            <form className="flex border-b border-background/30 pb-2 w-full max-w-sm" onSubmit={e => e.preventDefault()}>
              <input type="email" placeholder="Assine a nossa newsletter" className="bg-transparent flex-1 font-body text-xs focus:outline-none placeholder:text-background/50" />
              <button type="submit" className="font-body text-[9px] tracking-widest uppercase hover:text-background/70 transition-colors">Assinar</button>
            </form>
          </div>
          
          <div>
            <h3 className="font-body text-[10px] tracking-widest uppercase mb-8 text-background/50">A Maison</h3>
            <ul className="space-y-4">
              <li><Link to="/sobre" className="font-body text-sm hover:text-background/70 transition-colors">Nossa História</Link></li>
              <li><Link to="/loja" className="font-body text-sm hover:text-background/70 transition-colors">A Coleção</Link></li>
              <li><Link to="/loja?category=linen" className="font-body text-sm hover:text-background/70 transition-colors">Linha Linen</Link></li>
              <li><Link to="/loja?category=travel" className="font-body text-sm hover:text-background/70 transition-colors">Linha Travel</Link></li>
              <li><Link to="/loja?category=beach" className="font-body text-sm hover:text-background/70 transition-colors">Linha Beach</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-body text-[10px] tracking-widest uppercase mb-8 text-background/50">Atendimento</h3>
            <ul className="space-y-4">
              <li><Link to="/contato" className="font-body text-sm hover:text-background/70 transition-colors">Concierge</Link></li>
              <li><a href="#" className="font-body text-sm hover:text-background/70 transition-colors">Envio e Prazos</a></li>
              <li><a href="#" className="font-body text-sm hover:text-background/70 transition-colors">Trocas e Devoluções</a></li>
              <li><a href="#" className="font-body text-sm hover:text-background/70 transition-colors">Guia de Medidas</a></li>
              <li><a href="#" className="font-body text-sm hover:text-background/70 transition-colors">Cuidados com a Peça</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-background/20 text-[10px] text-background/50 font-body uppercase tracking-wider gap-4">
          <p>&copy; {new Date().getFullYear()} CostaVelle. Todos os direitos reservados.</p>
          <div className="flex gap-8">
            <a href="#" className="hover:text-background transition-colors">Instagram</a>
            <a href="#" className="hover:text-background transition-colors">Pinterest</a>
            <a href="#" className="hover:text-background transition-colors">Termos</a>
            <a href="#" className="hover:text-background transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
