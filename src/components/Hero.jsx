import { motion } from 'framer-motion';
import { Sparkles, Star } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden pt-24">
      <div className="absolute -top-24 right-0 -z-10 h-[800px] w-[800px] rounded-full bg-sky-200 blur-3xl opacity-70" />
      <div className="absolute -left-24 top-48 -z-10 h-[600px] w-[600px] rounded-full bg-indigo-200 blur-3xl opacity-70" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 md:grid-cols-2">
        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <span className="mb-4 inline-flex items-center gap-1 rounded-full bg-sky-100 px-3 py-1 text-xs font-medium text-sky-700">Агентство ярких путешествий</span>
          <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl">
            Подберём тур на <span className="bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text text-transparent">лучший отдых</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600">
            RKT Tour — ваш персональный гайд в мире путешествий. Расскажите о мечте — и наш AI‑агент предложит идеальные варианты.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a href="#destinations" className="inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 font-semibold text-white shadow-lg shadow-black/20 bg-gradient-to-r from-sky-500 to-indigo-600">
              <Sparkles className="size-5"/> Начать подбор
            </a>
          </div>
          <div className="mt-6 flex items-center gap-4 text-slate-600">
            <div className="flex items-center gap-2"><Star className="size-5 text-yellow-400" /><span>4.9 / 5</span></div>
            <div>1000+ довольных путешественников</div>
          </div>
        </motion.div>

        <motion.div initial={{ y: 20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }}>
          <div className="grid grid-cols-3 gap-3">
            {['photo-1507525428034-b723cf961d3e','photo-1500530855697-b586d89ba3ee','photo-1505764706515-aa95265c5abc','photo-1473625247510-8ceb1760943f','photo-1542038784456-1ea8e935640e','photo-1511732351157-1865efcb7b7b'].map((id, i) => (
              <motion.div key={id} initial={{ scale: 0.95, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className={`relative h-32 overflow-hidden rounded-2xl ${i % 3 === 0 ? 'col-span-2' : ''}`}>
                <img src={`https://images.unsplash.com/${id}?q=80&w=1200&auto=format&fit=crop`} alt="travel" className="h-full w-full object-cover" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
