import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function CategoriesSection({ images }) {
  const categories = [
    { slug: 'linen', label: 'Linen', desc: 'A leveza atemporal do linho', image: images.linen },
    { slug: 'travel', label: 'Travel', desc: 'Conforto para transitar', image: images.travel },
    { slug: 'beach', label: 'Beach', desc: 'Essenciais de beira-mar', image: images.beach },
  ];

  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Linhas Assinatura</p>
          <h2 className="font-heading text-4xl sm:text-5xl font-normal text-foreground">As Nossas Coleções</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-10">
          {categories.map((cat, i) => (
            <motion.div key={cat.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}>
              <Link to={`/loja?category=${cat.slug}`} className="group block relative aspect-[4/5] overflow-hidden bg-muted">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="font-heading text-3xl sm:text-4xl text-white mb-3">{cat.label}</h3>
                  <p className="font-body text-xs text-white/80 font-light mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">{cat.desc}</p>
                  <span className="inline-flex items-center gap-2 border border-white text-white font-body text-[9px] tracking-[0.2em] uppercase px-6 py-3 hover:bg-white hover:text-foreground transition-colors">
                    Explorar
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
