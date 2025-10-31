import { useEffect } from 'react';
import { api } from '../api';

export default function TimewebAIEventBridge() {
  useEffect(() => {
    const handler = (e) => {
      try {
        if (typeof e.origin !== 'string' || !e.origin.includes('timeweb.cloud')) return;
        api.postWidgetEvent({ origin: e.origin, data: e.data }).catch(() => {});
      } catch {}
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, []);
  return null;
}
