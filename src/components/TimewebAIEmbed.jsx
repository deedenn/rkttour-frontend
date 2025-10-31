import { useEffect } from 'react';

export default function TimewebAIEmbed() {
  useEffect(() => {
    const id = 'tw-ai-embed-96f1576c';
    if (document.getElementById(id)) return;
    const s = document.createElement('script');
    s.async = true;
    s.id = id;
    s.src = 'https://timeweb.cloud/api/v1/cloud-ai/agents/96f1576c-b160-49ed-a790-f28af6ed6118/embed.js?collapsed=true';
    document.body.appendChild(s);
    return () => { try { s.remove(); } catch (e) {} };
  }, []);
  return null;
}
