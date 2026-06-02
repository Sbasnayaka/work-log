import { Request, Response } from 'express';
import * as workEntryService from '../services/workEntryService';
import { validateWorkEntry } from '../validators/workEntryValidator';

export const getEntries = async (req: Request, res: Response) => {
  const { from, to, sort } = req.query;
  const entries = await workEntryService.getAllEntries(
    from as string, to as string, sort as 'asc' | 'desc'
  );
  res.json(entries);
};

export const postEntry = async (req: Request, res: Response) => {
  const validation = validateWorkEntry(req.body);
  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }
  const entry = await workEntryService.createEntry(req.body);
  res.status(201).json(entry);
};

export const deleteEntry = async (req: Request, res: Response) => {
  const idParam = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

  const id = parseInt(idParam);
  await workEntryService.deleteEntry(id);
  res.status(204).send();
};

export const putEntry = async (req: Request, res: Response) => {
  const idParam = Array.isArray(req.params.id)
  ? req.params.id[0]
  : req.params.id;

  const id = parseInt(idParam);
  const validation = validateWorkEntry(req.body, true);
  if (!validation.valid) {
    return res.status(400).json({ errors: validation.errors });
  }
  const updated = await workEntryService.updateEntry(id, req.body);
  res.json(updated);
};