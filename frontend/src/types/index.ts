export interface WorkEntry {
  id: number;
  date: string;
  workType: string;
  volume: number;
  unit: string;
  performer: string;
}

export type WorkEntryInput = Omit<WorkEntry, 'id'>;