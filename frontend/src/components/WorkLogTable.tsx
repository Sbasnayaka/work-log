import { WorkEntry } from '../types';

interface Props {
  entries: WorkEntry[];
  onDelete: (id: number) => void;
  onEdit: (entry: WorkEntry) => void;
}

export const WorkLogTable = ({ entries, onDelete, onEdit }: Props) => {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ backgroundColor: '#f0f0f0' }}>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Date</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Type of Work</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Volume</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Unit</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Performer</th>
          <th style={{ border: '1px solid #ccc', padding: '8px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries.map((entry) => (
          <tr key={entry.id}>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{entry.date}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{entry.workType}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{entry.volume}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{entry.unit}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>{entry.performer}</td>
            <td style={{ border: '1px solid #ccc', padding: '8px' }}>
              <button onClick={() => onEdit(entry)}>✏️ Edit</button>
              <button onClick={() => onDelete(entry.id)} style={{ marginLeft: '8px' }}>🗑️ Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};