import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { WorkEntryInput } from '../types';

const schema = z.object({
  date: z.string().min(1, 'Date is required').refine(d => new Date(d) <= new Date(), 'Date cannot be in the future'),
  workType: z.string().min(2, 'Work type must be at least 2 characters'),
  volume: z.number({ invalid_type_error: 'Volume must be a number' }).positive('Volume must be greater than 0').max(999999),
  unit: z.string().min(1, 'Unit is required'),
  performer: z.string().min(3, 'Performer name must be at least 3 characters'),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initialValues?: Partial<WorkEntryInput>;
  onSubmit: (data: WorkEntryInput) => void;
  workTypes: string[];
}

export const WorkLogForm = ({ initialValues, onSubmit, workTypes }: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
      <div style={{ marginBottom: '8px' }}>
        <label>Date: </label>
        <input type="date" {...register('date')} />
        {errors.date && <span style={{ color: 'red' }}> {errors.date.message}</span>}
      </div>
      <div style={{ marginBottom: '8px' }}>
        <label>Type of work: </label>
        <select {...register('workType')}>
          <option value="">Select a work type</option>
          {workTypes.map(t => <option key={t}>{t}</option>)}
        </select>
        {errors.workType && <span style={{ color: 'red' }}> {errors.workType.message}</span>}
      </div>
      <div style={{ marginBottom: '8px' }}>
        <label>Volume: </label>
        <input type="number" step="0.01" {...register('volume', { valueAsNumber: true })} />
        {errors.volume && <span style={{ color: 'red' }}> {errors.volume.message}</span>}
      </div>
      <div style={{ marginBottom: '8px' }}>
        <label>Unit: </label>
        <select {...register('unit')}>
          <option value="">Select unit</option>
          <option>m³</option>
          <option>m²</option>
          <option>t</option>
          <option>pcs</option>
        </select>
        {errors.unit && <span style={{ color: 'red' }}> {errors.unit.message}</span>}
      </div>
      <div style={{ marginBottom: '8px' }}>
        <label>Performer: </label>
        <input {...register('performer')} />
        {errors.performer && <span style={{ color: 'red' }}> {errors.performer.message}</span>}
      </div>
      <button type="submit">Save Entry</button>
    </form>
  );
};