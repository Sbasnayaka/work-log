import { useState, useEffect } from 'react';
import { useWorkEntries } from './hooks/useWorkEntries';
import { WorkLogTable } from './components/WorkLogTable';
import { WorkLogForm } from './components/WorkLogForm';
import { Filters } from './components/Filters';
import { fetchWorkTypes } from './services/api';
import { WorkEntry, WorkEntryInput } from './types';

function App() {
  const { entries, loading, filters, setFilters, addEntry, removeEntry, editEntry } = useWorkEntries();
  const [workTypes, setWorkTypes] = useState<string[]>([]);
  const [editingEntry, setEditingEntry] = useState<WorkEntry | null>(null);

  useEffect(() => {
    fetchWorkTypes().then(setWorkTypes).catch(console.error);
  }, []);

  const handleSubmit = async (data: WorkEntryInput) => {
    if (editingEntry) {
      await editEntry(editingEntry.id, data);
      setEditingEntry(null);
    } else {
      await addEntry(data);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Construction Site Work Log</h1>
      <Filters
        from={filters.from || ''}
        to={filters.to || ''}
        sort={filters.sort}
        onFromChange={(val) => setFilters({ ...filters, from: val })}
        onToChange={(val) => setFilters({ ...filters, to: val })}
        onSortChange={(val) => setFilters({ ...filters, sort: val })}
      />
      <WorkLogForm
        initialValues={editingEntry || undefined}
        onSubmit={handleSubmit}
        workTypes={workTypes}
      />
      {loading ? <p>Loading...</p> : <WorkLogTable entries={entries} onDelete={removeEntry} onEdit={setEditingEntry} />}
    </div>
  );
}

export default App;