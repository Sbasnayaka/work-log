import { Request, Response } from 'express';
import * as workTypeService from '../services/workTypeService';

export const getWorkTypes = async (req: Request, res: Response) => {
  const types = await workTypeService.getAllWorkTypes();
  res.json(types.map(t => t.name));
};