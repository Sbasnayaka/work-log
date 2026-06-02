interface Props {
  from: string;
  to: string;
  sort: 'asc' | 'desc';
  onFromChange: (val: string) => void;
  onToChange: (val: string) => void;
  onSortChange: (val: 'asc' | 'desc') => void;
}

export const Filters = ({ from, to, sort, onFromChange, onToChange, onSortChange }: Props) => (
  <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
    <input type="date" value={from} onChange={(e) => onFromChange(e.target.value)} placeholder="From" />
    <input type="date" value={to} onChange={(e) => onToChange(e.target.value)} placeholder="To" />
    <select value={sort} onChange={(e) => onSortChange(e.target.value as 'asc' | 'desc')}>
      <option value="desc">Newest first</option>
      <option value="asc">Oldest first</option>
    </select>
  </div>
);