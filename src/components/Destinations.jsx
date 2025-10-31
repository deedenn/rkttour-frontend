import { motion } from 'framer-motion';
import { MapPin, Sparkles } from 'lucide-react';

const seedTours = [
  { id: 't1', title: 'Мальдивы: Вилла у океана', price: 2890, nights: 7, rating: 4.9, country: 'Мальдивы', image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1600&auto=format&fit=crop' },
  { id: 't2', title: 'Турция: All Inclusive 5*', price: 990, nights: 7, rating: 4.7, country: 'Турция', image: 'https://images.unsplash.com/photo-1526779259212-939e64788e3c?q=80&w=1600&auto=format&fit=crop' },
  { id: 't3', title: 'Бали: Серф & Джунгли', price: 1490, nights: 10, rating: 4.8, country: 'Индонезия', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1600&auto=format&fit=crop' },
  { id: 't4', title: 'Италия: Амальфи & Рим', price: 1790, nights: 8, rating: 4.6, country: 'Италия', image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop' },
  { id: 't5', title: 'Египет: Дайвинг в Красном море', price: 840, nights: 7, rating: 4.5, country: 'Египет', image: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?q=80&w=1600&auto=format&fit=crop' },
  { id: 't6', title: 'ОАЭ: Дубай Sky Views', price: 1290, nights: 6, rating: 4.6, country: 'ОАЭ', image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=1600&auto=format&fit=crop' },
];

const fmtMoney = (n) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);

export default function Destinations() {
  return (
    <section id="destinations" className="mx-auto max-w-7xl px-4 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold tracking-tight">Популярные направления</h2>
        <p className="mt-2 text-slate-600">Подберите идеальный тур в один клик</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {seedTours.map((t, idx) => (
          <motion.div key={t.id} initial={{ y: 10, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.05 * idx }} className="group overflow-hidden rounded-3xl border border-slate-200">
            <div className="relative h-48 w-full">
              <img src={t.image} alt={t.title} className="h-full w-full object-cover transition group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-3 left-3 text-white">
                <div className="flex items-center gap-2 text-sm opacity-90"><MapPin className="size-4" /> {t.country}</div>
                <div className="mt-1 text-xl font-bold">{t.title}</div>
              </div>
              <div className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold">от {fmtMoney(t.price)}</div>
            </div>
            <div className="p-4">
              <div className="text-slate-600">{t.nights} ночей • рейтинг {t.rating}</div>
              <a href="#" className="mt-3 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-3 font-semibold text-white"><Sparkles className="size-4" /> Подобрать</a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
