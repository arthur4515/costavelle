import { motion } from 'framer-motion';
import { Mail, MapPin, Clock, Instagram } from 'lucide-react';

export default function Contact() {
  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-20">
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Concierge
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="font-heading text-4xl sm:text-6xl font-normal text-foreground">
            Atendimento <span className="italic font-light">CostaVelle</span>
          </motion.h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-12">
            <div>
              <h2 className="font-heading text-2xl mb-8">Nossas Linhas Diretas</h2>
              <p className="font-body text-sm text-foreground/70 leading-relaxed mb-10 font-light">
                Nosso serviço de concierge está disponível para auxiliar com tamanhos, estilização de peças, acompanhamento de pedidos e dúvidas gerais. Valorizamos seu tempo e oferecemos um atendimento humano e personalizado.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-body text-[10px] tracking-[0.2em] uppercase mb-2">E-mail</h3>
                    <a href="mailto:atendimento@costavelle.com.br" className="font-body text-sm hover:opacity-70 transition-opacity">atendimento@costavelle.com.br</a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <Clock className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-body text-[10px] tracking-[0.2em] uppercase mb-2">Horário de Atendimento</h3>
                    <p className="font-body text-sm text-foreground/70">Segunda à Sexta, 09h às 18h (BRT)</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Instagram className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <h3 className="font-body text-[10px] tracking-[0.2em] uppercase mb-2">Redes Sociais</h3>
                    <a href="#" className="font-body text-sm hover:opacity-70 transition-opacity">@costavelle</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <div className="border border-border p-8 sm:p-12">
              <h3 className="font-heading text-2xl mb-8">Envie uma Mensagem</h3>
              <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">Nome Completo</label>
                  <input type="text" className="w-full border-b border-border bg-transparent py-2 font-body text-sm focus:outline-none focus:border-foreground transition-colors" />
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">E-mail</label>
                  <input type="email" className="w-full border-b border-border bg-transparent py-2 font-body text-sm focus:outline-none focus:border-foreground transition-colors" />
                </div>
                <div>
                  <label className="block font-body text-[10px] tracking-[0.2em] uppercase text-muted-foreground mb-2">Mensagem</label>
                  <textarea rows="4" className="w-full border-b border-border bg-transparent py-2 font-body text-sm focus:outline-none focus:border-foreground transition-colors resize-none"></textarea>
                </div>
                <button type="submit" className="w-full bg-foreground text-background font-body text-[10px] tracking-[0.2em] uppercase py-4 hover:opacity-90 transition-opacity mt-4">
                  Enviar Mensagem
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
