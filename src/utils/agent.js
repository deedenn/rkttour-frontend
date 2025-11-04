// frontend/src/utils/agent.js

const AGENT_IFRAME_HOST = 'timeweb.cloud';
const AGENT_EMBED_SRC =
    'https://timeweb.cloud/api/v1/cloud-ai/agents/96f1576c-b160-49ed-a790-f28af6ed6118/embed.js?collapsed=true';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/* ========= Подписки (для AgentDrawer) ========= */
const subscribers = new Set();

/** Подписка оверлея на открытие агента (возвращает unsubscribe) */
export function subscribeAgentOpen(fn) {
    subscribers.add(fn);
    return () => subscribers.delete(fn);
}

function notifySubscribers(prompt) {
    subscribers.forEach((fn) => {
        try {
            fn(prompt);
        } catch { }
    });
}

/* ========= Работа с embed ========= */
function getAgentIframe() {
    const iframes = Array.from(document.querySelectorAll('iframe'));
    return iframes.find((f) => (f.getAttribute('src') || '').includes(AGENT_IFRAME_HOST)) || null;
}

async function ensureEmbedLoaded() {
    // уже вставлен скрипт?
    if (document.querySelector(`script[src="${AGENT_EMBED_SRC}"]`)) return;
    // может, уже появился iframe
    if (getAgentIframe()) return;

    // подгружаем embed
    const s = document.createElement('script');
    s.async = true;
    s.src = AGENT_EMBED_SRC;
    document.body.appendChild(s);
    await sleep(500);
}

async function tryPostMessage(prompt) {
    const iframe = getAgentIframe();
    if (!iframe || !iframe.contentWindow) return false;
    try {
        iframe.contentWindow.postMessage({ type: 'twai:open', action: 'open', prompt }, '*');
        iframe.contentWindow.postMessage({ type: 'timeweb:agent:setPrompt', prompt }, '*');
        iframe.contentWindow.postMessage({ type: 'timeweb:agent:open', prompt }, '*');
        return true;
    } catch (e) {
        console.warn('[Agent] postMessage failed', e);
        return false;
    }
}

// эвристика: находим плавающую кнопку виджета в правом нижнем углу
function findFloatingLauncher() {
    const nodes = Array.from(document.querySelectorAll('button, a, div'));
    const candidates = [];

    for (const el of nodes) {
        const cs = getComputedStyle(el);
        if (cs.position !== 'fixed') continue;
        if (cs.display === 'none' || cs.visibility === 'hidden' || cs.pointerEvents === 'none') continue;

        const r = el.getBoundingClientRect();
        const nearRight = window.innerWidth - r.right;
        const nearBottom = window.innerHeight - r.bottom;
        const sizeOk = r.width >= 40 && r.width <= 120 && r.height >= 40 && r.height <= 120;
        const nearCorner = nearRight >= 0 && nearRight <= 140 && nearBottom >= 0 && nearBottom <= 140;
        const clickable =
            el.tagName === 'BUTTON' || el.onclick || el.getAttribute('role') === 'button' || el.tabIndex >= 0;
        const z = parseInt(cs.zIndex || '0', 10) || 0;

        if (sizeOk && nearCorner && clickable) {
            candidates.push({ el, z });
        }
    }

    candidates.sort((a, b) => b.z - a.z);
    return candidates.length ? candidates[0].el : null;
}

async function clickLauncher() {
    const btn = findFloatingLauncher();
    if (!btn) return false;
    try {
        btn.click();
        return true;
    } catch {
        return false;
    }
}

/** Главный хелпер: открыть виджет и передать промпт.
 * 1) уведомляем подписчиков (AgentDrawer) → он покажется сразу;
 * 2) гарантируем загрузку embed;
 * 3) пробуем postMessage;
 * 4) если не получилось — жмём плавающую кнопку и пробуем ещё раз.
 */
export async function openAgentWithPrompt(prompt = '') {
    notifySubscribers(prompt);

    await ensureEmbedLoaded();

    let ok = await tryPostMessage(prompt);
    if (ok) return;

    const clicked = await clickLauncher();
    await sleep(300);

    ok = await tryPostMessage(prompt);

    if (!ok && !clicked) {
        console.warn(
            '[Agent] Не удалось открыть виджет. Проверьте наличие embed-скрипта и allowlist доменов в настройках Timeweb.'
        );
    }
}
