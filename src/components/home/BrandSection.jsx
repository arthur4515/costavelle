import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BrandSection({ image }) {
  return (
    <section className="py-24 sm:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <motion.div 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }} 
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="order-2 lg:order-1"
          >
             <div className="aspect-[4/5] overflow-hidden">
                <img src={image} alt="Essência CostaVelle" className="w-full h-full object-cover" />
             </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 text-center lg:text-left"
          >
            <p className="font-body text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-6">
              Nossa História
            </p>
            <h2 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-foreground font-normal leading-tight mb-8">
              Onde o luxo <br className="hidden lg:block"/>
              <span className="italic font-light">encontra</span> a liberdade
            </h2>
            <p className="font-body text-sm text-foreground/70 leading-loose mb-10 max-w-lg mx-auto lg:mx-0 font-light">
              A CostaVelle nasce da união entre a leveza do litoral e a sofisticação da vida urbana. Cada peça é pensada para transitar entre viagens, encontros, rotina e momentos de descanso com naturalidade e conforto.
            </p>
            <Link to="/sobre" className="inline-block border border-foreground text-foreground font-body text-[10px] tracking-[0.2em] uppercase px-10 py-4 hover:bg-foreground hover:text-background transition-colors">
              Descubra a Maison
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
