import { motion } from 'framer-motion';

export default function About() {
  const images = {
    hero: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1600&q=80",
    about: "https://images.unsplash.com/photo-1515347619152-16e6d1c810c9?auto=format&fit=crop&w=900&q=80"
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="aspect-[21/9] w-full overflow-hidden mb-16 sm:mb-24 relative">
          <motion.img 
            initial={{ scale: 1.05 }} 
            animate={{ scale: 1 }} 
            transition={{ duration: 2 }}
            src={images.hero} 
            alt="Sobre a Maison CostaVelle" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">O Manifesto</p>
            <h1 className="font-heading text-4xl sm:text-6xl font-normal leading-tight mb-8 text-foreground">
              A elegância mora <br className="hidden lg:block"/> 
              <span className="italic font-light">nos detalhes sutis.</span>
            </h1>
            <div className="font-body text-sm text-foreground/70 space-y-6 leading-relaxed max-w-lg font-light">
              <p>
                A CostaVelle nasceu do desejo de traduzir a leveza do litoral para a sofisticação da vida urbana. Nossa essência é o "Quiet Luxury" — o luxo que sussurra através de matérias-primas nobres, cortes atemporais e um cuidado obsessivo com o caimento.
              </p>
              <p>
                Acreditamos que uma peça de roupa deve acompanhar você desde uma caminhada ao pôr do sol na praia até um jantar refinado na cidade. Por isso, usamos linho respirável, algodão premium e texturas naturais.
              </p>
              <p>
                Menos excesso. Mais presença. Cada coleção é uma curadoria de itens essenciais projetados para quem valoriza o consumo consciente e a elegância sem esforço.
              </p>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="aspect-[3/4] relative">
            <img src={images.about} alt="Estilo CostaVelle" className="w-full h-full object-cover" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
