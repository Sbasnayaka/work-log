import express from 'express';
import cors from 'cors';
import workEntriesRouter from './routes/workEntries';
import workTypesRouter from './routes/workTypes';
import { seedWorkTypes } from './services/workTypeService';
import { prisma } from './db';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/work-entries', workEntriesRouter);
app.use('/api/work-types', workTypesRouter);

const PORT = process.env.PORT || 5000;

// Seed work types on startup
async function startup() {
  try {
    await prisma.$connect();
    await seedWorkTypes();
    console.log('Database connected and seeded');
    app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
  } catch (err) {
    console.error('Startup error:', err);
    process.exit(1);
  }
}

startup();