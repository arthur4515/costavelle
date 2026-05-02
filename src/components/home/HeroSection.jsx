import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function HeroSection({ heroImage }) {
  return (
    <section className="relative h-[90vh] min-h-[600px] w-full overflow-hidden bg-foreground">
      <div className="absolute inset-0">
        <motion.img 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          src={heroImage} 
          alt="CostaVelle" 
          className="w-full h-full object-cover object-top" 
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="max-w-4xl w-full"
        >
          <p className="font-body text-[10px] tracking-[0.3em] uppercase text-white/80 mb-6">
            Primavera Verão
          </p>
          <h1 className="font-heading text-5xl sm:text-7xl lg:text-[5.5rem] text-white font-normal leading-[1.1] mb-8">
            Verão em estado <br className="hidden sm:block" />
            <span className="italic font-light">de elegância.</span>
          </h1>
          <p className="font-body text-sm text-white/90 font-light max-w-xl mx-auto mb-10 leading-relaxed">
            Peças leves para dias que atravessam praia, cidade e tempo. Uma curadoria costeira de linho, textura e movimento.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/loja"
              className="bg-white text-foreground font-body text-[10px] tracking-[0.2em] uppercase px-12 py-4 w-full sm:w-auto hover:bg-white/90 transition-colors"
            >
              Descobrir a Coleção
            </Link>
            <Link
              to="/sobre"
              className="bg-transparent border border-white text-white font-body text-[10px] tracking-[0.2em] uppercase px-12 py-4 w-full sm:w-auto hover:bg-white hover:text-foreground transition-colors"
            >
              Nossa Essência
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
