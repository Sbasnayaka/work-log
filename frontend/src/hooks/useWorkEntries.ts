import { useState, useEffect, useCallback } from 'react';
import { WorkEntry, WorkEntryInput } from '../types';
import * as api from '../services/api';

export const useWorkEntries = (initialFrom?: string, initialTo?: string, initialSort: 'asc' | 'desc' = 'desc') => {
  const [entries, setEntries] = useState<WorkEntry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({ from: initialFrom, to: initialTo, sort: initialSort });

  const loadEntries = useCallback(async () => {
    setLoading(true);
    try {
      const data = await api.fetchEntries(filters.from, filters.to, filters.sort);
      setEntries(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadEntries();
  }, [loadEntries]);

  const addEntry = async (entry: WorkEntryInput) => {
    await api.createEntry(entry);
    await loadEntries();
  };

  const removeEntry = async (id: number) => {
    await api.deleteEntry(id);
    await loadEntries();
  };

  const editEntry = async (id: number, updated: Partial<WorkEntryInput>) => {
    await api.updateEntry(id, updated);
    await loadEntries();
  };

  return { entries, loading, error, filters, setFilters, addEntry, removeEntry, editEntry, refresh: loadEntries };
};