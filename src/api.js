const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000/api';

let token = localStorage.getItem('rkt_token') || null;
export function setToken(t) {
  token = t; localStorage.setItem('rkt_token', t || '');
}

async function req(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth && token) headers['Authorization'] = `Bearer ${token}`;
  const res = await fetch(`${API_BASE}${path}`, { method, headers, body: body ? JSON.stringify(body) : undefined });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.json();
}

export const api = {
  health: () => req('/health'),
  login: (email, password) => req('/auth/login', { method: 'POST', body: { email, password } }),
  recordVisit: (payload) => req('/visits', { method: 'POST', body: payload }),
  recordInteraction: (payload) => req('/interactions', { method: 'POST', body: payload }),
  createApplication: (payload) => req('/applications', { method: 'POST', body: payload }),
  listApplications: () => req('/applications', { auth: true }),
  updateApplicationStatus: (id, status) => req(`/applications/${id}/status`, { method: 'PATCH', body: { status }, auth: true }),
  listInteractions: () => req('/interactions', { auth: true }),
  postWidgetEvent: (payload) => req('/widget-events', { method: 'POST', body: payload }),
  listWidgetEvents: () => req('/widget-events', { auth: true }),
  summary: () => req('/metrics/summary', { auth: true }),
  timeseries: () => req('/metrics/timeseries', { auth: true }),
};
