import { motion } from 'framer-motion';

export default function Reviews() {
  const items = [
    { name: 'Мария К.', text: 'RKT Tour мгновенно подобрали тур мечты на Мальдивы. Всё прозрачно, быстро и с заботой!', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=300&auto=format&fit=crop' },
    { name: 'Андрей П.', text: 'Попросил семейный отдых в Турции — получил 3 отличных варианта, оформили за вечер.', avatar: 'https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=300&auto=format&fit=crop' },
    { name: 'Екатерина Р.', text: 'AI‑агент — это вау! Учитывает бюджет и пожелания, менеджер всё подтвердил и забронировал.', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300&auto=format&fit=crop' },
  ];
  return (
    <section id="reviews" className="bg-gradient-to-br from-sky-50 to-indigo-50 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-3xl font-extrabold tracking-tight">Отзывы клиентов</h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {items.map((r, i) => (
            <motion.div key={r.name} initial={{ y: 12, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.1 * i }} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <img src={r.avatar} alt={r.name} className="size-12 rounded-full object-cover" />
                <div className="font-semibold">{r.name}</div>
              </div>
              <div className="text-slate-600">{r.text}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
