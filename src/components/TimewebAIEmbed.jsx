import { useEffect } from 'react';

export default function TimewebAIEmbed() {
  useEffect(() => {
    const id = 'tw-ai-embed-96f1576c';
    if (!document.getElementById(id)) {
      const s = document.createElement('script');
      s.async = true;
      s.id = id;
      s.src =
        'https://timeweb.cloud/api/v1/cloud-ai/agents/96f1576c-b160-49ed-a790-f28af6ed6118/embed.js?collapsed=true';
      s.onload = () => {
        window.__twAgentReady = true;
      };
      s.onerror = () => {
        window.__twAgent403 = true;
        console.warn('[Timeweb AI] embed blocked/403');
      };
      document.body.appendChild(s);
    }

    // Глобальный вызов открытия виджета c промптом
    window.__openTWAgent = async (prompt = '') => {
      const findFrame = () =>
        Array.from(document.querySelectorAll('iframe')).find((f) =>
          (f.getAttribute('src') || '').includes('timeweb.cloud')
        );

      let iframe = findFrame();
      // Ждём до ~2.5с появления iframe
      for (let i = 0; i < 25 && !iframe; i++) {
        // eslint-disable-next-line no-await-in-loop
        await new Promise((r) => setTimeout(r, 100));
        iframe = findFrame();
      }
      if (!iframe || !iframe.contentWindow) return false;

      try {
        // Несколько универсальных сообщений — одно из них обычно ловит виджет
        iframe.contentWindow.postMessage({ type: 'twai:open', action: 'open', prompt }, '*');
        iframe.contentWindow.postMessage({ type: 'timeweb:agent:setPrompt', prompt }, '*');
        iframe.contentWindow.postMessage({ type: 'timeweb:agent:open', prompt }, '*');
        return true;
      } catch (e) {
        console.warn('[Timeweb AI] postMessage error', e);
        return false;
      }
    };

    return () => { };
  }, []);

  return null;
}
