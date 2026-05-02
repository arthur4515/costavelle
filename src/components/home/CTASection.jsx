import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 sm:py-28 bg-foreground text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary-foreground/60 mb-4">Exclusividade</p>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-light mb-6">
            Vista-se de <span className="italic">elegância</span>
          </h2>
          <p className="font-body text-sm text-primary-foreground/60 max-w-md mx-auto mb-10 leading-relaxed">
            Descubra peças exclusivas que combinam sofisticação com o espírito livre da vida à beira-mar.
          </p>
          <Link to="/loja" className="inline-flex items-center gap-3 bg-primary-foreground text-foreground font-body text-xs tracking-widest uppercase px-8 py-4 hover:bg-primary-foreground/90 transition-colors">
            Comprar Agora
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
