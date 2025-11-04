import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { subscribeAgentOpen } from '../utils/agent';

const PUBLIC_URL =
    import.meta.env.VITE_AGENT_PUBLIC_URL ||
    'https://timeweb.cloud/ai/agents/96f1576c-b160-49ed-a790-f28af6ed6118';

export default function AgentDrawer() {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState('');

    // Подписка на внешние вызовы openAgentWithPrompt(prompt)
    useEffect(() => {
        return subscribeAgentOpen((p) => {
            setPrompt(String(p || ''));
            setOpen(true);
        });
    }, []);

    // Если официальный embed появился — закрываем наш оверлей
    useEffect(() => {
        if (!open) return;
        if (window.__twAgentReady && typeof window.__openTWAgent === 'function') {
            // Попросим официальный виджет открыться ещё раз для надёжности
            window.__openTWAgent(prompt);
            setOpen(false);
        }
    }, [open, prompt]);

    // url с промптом для публичной страницы (работает как запасной вариант)
    const url = useMemo(() => {
        const sep = PUBLIC_URL.includes('?') ? '&' : '?';
        return `${PUBLIC_URL}${sep}prompt=${encodeURIComponent(prompt)}`;
    }, [prompt]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[1000]">
            {/* фон */}
            <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setOpen(false)}
                aria-hidden="true"
            />
            {/* панель снизу на мобиле / справа на десктопе */}
            <div className="absolute inset-x-0 bottom-0 h-[75vh] rounded-t-3xl bg-white p-2 shadow-2xl md:inset-y-0 md:right-0 md:inset-x-auto md:w-[420px] md:rounded-l-3xl">
                <div className="mb-2 flex items-center justify-between px-2">
                    <div className="text-sm text-slate-600">
                        AI-агент RKT Tour{prompt ? ` · «${prompt.slice(0, 40)}${prompt.length > 40 ? '…' : ''}»` : ''}
                    </div>
                    <button
                        onClick={() => setOpen(false)}
                        className="rounded-xl p-2 text-slate-600 hover:bg-slate-100"
                        aria-label="Закрыть"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="h-[calc(100%-40px)] overflow-hidden rounded-2xl border border-slate-200">
                    {/* Если официальный embed не готов — показываем публичную страницу в iframe */}
                    <iframe
                        title="RKT Tour AI Agent"
                        src={url}
                        className="h-full w-full"
                        allow="clipboard-write; autoplay; microphone; camera"
                    />
                </div>

                {/* Подсказка при блокировке embed */}
                {window.__twAgent403 && (
                    <div className="px-2 pt-2 text-xs text-amber-700">
                        Виджет заблокирован хостингом (403). Добавьте домены в allowlist в кабинете Timeweb:
                        ваш прод-домен и <code>http://localhost:5173</code> (для локалки).
                    </div>
                )}
            </div>
        </div>
    );
}
