import { useEffect, useState } from 'react';
import { api, setToken } from '../api';
import { BarChart2, Settings } from 'lucide-react';

const STATUSES = [
  'запрос клиента',
  'отправлено предложение',
  'бронирование тура',
  'оплачено',
  'тур выполнен',
];

const fmtMoney = (n) => new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n);
const fmtDateTime = (ts) => new Date(ts).toLocaleString('ru-RU');

export default function AdminPanel({ onExit }) {
  const [logged, setLogged] = useState(!!localStorage.getItem('rkt_token'));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [apps, setApps] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [events, setEvents] = useState([]);
  const [summary, setSummary] = useState({ visits: 0, interactions: 0, applications: 0, events: 0 });
  const [series, setSeries] = useState([]);

  async function login(e) {
    e.preventDefault();
    try {
      const { token } = await api.login(email, password);
      setToken(token);
      setLogged(true);
    } catch (err) {
      alert('Неверный e‑mail или пароль');
    }
  }

  function changeStatus(id, status) {
    api.updateApplicationStatus(id, status).then(loadAll).catch(() => {});
  }

  async function loadAll() {
    try {
      const [a, i, e, s, ts] = await Promise.all([
        api.listApplications(), api.listInteractions(), api.listWidgetEvents(), api.summary(), api.timeseries()
      ]);
      setApps(a); setInteractions(i); setEvents(e); setSummary(s); setSeries(ts);
    } catch {}
  }

  useEffect(() => { if (logged) loadAll(); }, [logged]);
  useEffect(() => {
    if (!logged) return;
    const t = setInterval(loadAll, 1500);
    return () => clearInterval(t);
  }, [logged]);

  if (!logged) {
    return (
      <div className="min-h-[60vh] bg-gradient-to-br from-sky-50 to-indigo-50 py-16">
        <div className="mx-auto max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white"><Settings /></div>
            <div className="text-xl font-bold">Вход в админ‑панель</div>
          </div>
          <form onSubmit={login} className="space-y-3">
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="E‑mail" type="email" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Пароль" type="password" className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 outline-none focus:ring-2 focus:ring-sky-400" />
            <button type="submit" className="w-full rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-3 font-semibold text-white">Войти</button>
            <button onClick={onExit} className="w-full rounded-2xl border border-slate-300 px-5 py-3 font-semibold">← Назад на сайт</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-sky-50 to-indigo-50 py-16">
      <div className="mx-auto max-w-7xl space-y-8 px-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-600 text-white"><Settings /></div>
            <div>
              <div className="text-xl font-bold">Админ‑панель</div>
              <div className="text-slate-600">Посещения, взаимодействия и заявки</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={onExit} className="rounded-2xl bg-gradient-to-r from-sky-500 to-indigo-600 px-5 py-3 font-semibold text-white">Выйти на сайт</button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="text-slate-500">Посещений</div><div className="mt-1 text-3xl font-extrabold">{summary.visits}</div></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="text-slate-500">Взаимодействий</div><div className="mt-1 text-3xl font-extrabold">{summary.interactions}</div></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="text-slate-500">Заявок</div><div className="mt-1 text-3xl font-extrabold">{summary.applications}</div></div>
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"><div className="text-slate-500">Событий виджета</div><div className="mt-1 text-3xl font-extrabold">{summary.events}</div></div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2 text-slate-600"><BarChart2 className="size-5" /> Динамика по дням</div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
            {series.map(r => (
              <div key={r.day} className="rounded-xl border border-slate-200 p-3 text-sm">
                <div className="font-semibold">{r.day}</div>
                <div className="text-slate-600">Посещений: {r.visits} • Взаимодействий: {r.interactions} • Заявок: {r.applications} • Событий: {r.events}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-lg font-semibold">Заявки</div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="px-3 py-2 text-left">Дата</th>
                  <th className="px-3 py-2 text-left">Клиент</th>
                  <th className="px-3 py-2 text-left">Контакты</th>
                  <th className="px-3 py-2 text-left">Направление</th>
                  <th className="px-3 py-2 text-left">Бюджет</th>
                  <th className="px-3 py-2 text-left">Статус</th>
                </tr>
              </thead>
              <tbody>
                {apps.map((a) => (
                  <tr key={a._id} className="border-b last:border-0">
                    <td className="px-3 py-2 whitespace-nowrap">{fmtDateTime(a.ts)}</td>
                    <td className="px-3 py-2">
                      <div className="font-semibold">{a.name}</div>
                      {a.message && <div className="text-slate-500">{a.message}</div>}
                    </td>
                    <td className="px-3 py-2">
                      <div>{a.email || '—'}</div>
                      <div className="text-slate-500">{a.phone || '—'}</div>
                    </td>
                    <td className="px-3 py-2">
                      <div className="font-semibold">{a.destination || '—'}</div>
                      <div className="text-slate-500">{a.dates || 'даты не указаны'}</div>
                    </td>
                    <td className="px-3 py-2">{a.budget ? fmtMoney(Number(a.budget)) : '—'}</td>
                    <td className="px-3 py-2">
                      <select value={a.status} onChange={(e) => changeStatus(a._id, e.target.value)} className="rounded-xl border border-slate-300 bg-white px-3 py-2">
                        {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    </td>
                  </tr>
                ))}
                {apps.length === 0 && (
                  <tr><td colSpan="6" className="px-3 py-8 text-center text-slate-500">Пока нет заявок</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-lg font-semibold">Взаимодействия с AI агентом</div>
          <div className="space-y-4">
            {interactions.map((it) => (
              <div key={it._id} className="rounded-2xl border border-slate-200 p-4">
                <div className="text-slate-500">{fmtDateTime(it.ts)} {it.fromWidget && <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-1 text-xs font-medium text-indigo-700">из виджета</span>}</div>
                <div className="mt-1 font-semibold">Запрос: {it.query}</div>
                {it.suggestions?.length > 0 && (
                  <div className="mt-2 text-slate-600">Предложения: {it.suggestions.map((s) => s.title).join(', ')}</div>
                )}
              </div>
            ))}
            {interactions.length === 0 && (
              <div className="rounded-2xl border border-slate-200 p-6 text-center text-slate-500">Пока нет взаимодействий</div>
            )}
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-4 text-lg font-semibold">Сырые события виджета</div>
          <div className="space-y-4 max-h-[480px] overflow-auto">
            {events.map((ev) => (
              <details key={ev._id} className="rounded-2xl border border-slate-200 p-4">
                <summary className="cursor-pointer list-none">{fmtDateTime(ev.ts)} <span className="text-slate-500">• {ev.origin}</span></summary>
                <pre className="mt-3 overflow-x-auto rounded-xl bg-slate-50 p-4 text-xs">{JSON.stringify(ev.data, null, 2)}</pre>
              </details>
            ))}
            {events.length === 0 && (
              <div className="rounded-2xl border border-slate-200 p-6 text-center text-slate-500">Пока нет событий</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
