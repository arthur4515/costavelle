import { motion } from 'framer-motion';

export default function DarkPremiumSection() {
  return (
    <section className="py-32 sm:py-48 bg-secondary text-white text-center px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="font-heading text-5xl sm:text-7xl lg:text-8xl font-normal leading-[1.1] mb-8">
            Menos excesso. <br />
            <span className="italic font-light opacity-90">Mais presença.</span>
          </h2>
          <p className="font-body text-sm sm:text-base text-white/70 leading-relaxed max-w-xl mx-auto font-light">
            Uma curadoria de peças essenciais para quem entende que sofisticação está nos detalhes. O verdadeiro luxo sussurra.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
