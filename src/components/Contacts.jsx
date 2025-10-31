import { Plane, Phone, Mail } from 'lucide-react';

export default function Contacts() {
  return (
    <footer id="contacts" className="relative isolate overflow-hidden bg-slate-900 py-16 text-slate-100">
      <div className="absolute -right-24 -top-24 h-[500px] w-[500px] rounded-full bg-sky-500/20 blur-3xl" />
      <div className="container grid grid-cols-1 gap-10 md:grid-cols-2">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white"><Plane /></div>
            <div className="text-xl font-extrabold">RKT Tour</div>
          </div>
          <p className="mt-4 max-w-xl text-slate-300">Подбираем туры на лучший отдых. Индивидуальный подход и забота на каждом шаге вашего путешествия.</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2"><Phone className="size-4" /> +7 (900) 000‑00‑00</span>
            <span className="inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2"><Mail className="size-4" /> hello@rkt.tour</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Разделы</div>
            <ul className="space-y-2 text-slate-300">
              <li><a href="#destinations" className="hover:text-white">Направления</a></li>
              <li><a href="#how" className="hover:text-white">Как это работает</a></li>
              <li><a href="#reviews" className="hover:text-white">Отзывы</a></li>
            </ul>
          </div>
          <div>
            <div className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Юридическая информация</div>
            <ul className="space-y-2 text-slate-300">
              <li>ООО «РКТ ТУР»</li>
              <li>ИНН 0000000000</li>
              <li>ОГРН 0000000000000</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-slate-400">© {new Date().getFullYear()} RKT Tour. Все права защищены.</div>
    </footer>
  );
}
