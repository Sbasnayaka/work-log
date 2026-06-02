import { WorkEntry, WorkEntryInput } from '../types';

const API_BASE = 'http://localhost:5000/api';

export const fetchEntries = async (from?: string, to?: string, sort: 'asc' | 'desc' = 'desc') => {
  const params = new URLSearchParams();
  if (from) params.append('from', from);
  if (to) params.append('to', to);
  if (sort) params.append('sort', sort);
  const res = await fetch(`${API_BASE}/work-entries?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json() as Promise<WorkEntry[]>;
};

export const createEntry = async (entry: WorkEntryInput) => {
  const res = await fetch(`${API_BASE}/work-entries`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error('Create failed');
  return res.json();
};

export const deleteEntry = async (id: number) => {
  const res = await fetch(`${API_BASE}/work-entries/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Delete failed');
};

export const updateEntry = async (id: number, entry: Partial<WorkEntryInput>) => {
  const res = await fetch(`${API_BASE}/work-entries/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(entry),
  });
  if (!res.ok) throw new Error('Update failed');
  return res.json();
};

export const fetchWorkTypes = async () => {
  const res = await fetch(`${API_BASE}/work-types`);
  if (!res.ok) throw new Error('Failed to fetch work types');
  return res.json() as Promise<string[]>;
};