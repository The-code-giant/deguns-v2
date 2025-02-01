import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
export const revalidate = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      console.log(`Cron job for ss updater sent at ${new Date()}`);
      axios.get(`${process.env.SS_INTEGRATION_API_URL}/update`);
      res.status(200).json({ message: 'Updater for ss products send.' });
}