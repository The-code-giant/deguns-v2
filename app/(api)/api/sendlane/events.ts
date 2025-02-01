import { SendlaneEventAction } from '@utils/sendlaneEvents';
import { NextApiRequest, NextApiResponse } from 'next';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
      if (req.method !== 'POST') {
            res.status(405).json({ error: 'Method not allowed' });
      }

      const { action, ...rest } = req.body;

      await sendRequestToSendlane(action, rest);

      return res.status(200).json({ done: true });

}

async function sendRequestToSendlane(action: SendlaneEventAction, body: any) {
      try {
            const req = await fetch(`https://api.sendlane.com/v2/tracking/${action}`, {
                  method: 'POST',
                  body: JSON.stringify({ token: process.env.NEXT_PUBLIC_SENDLANE_TOKEN, ...body }),
                  headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${process.env.SENDLANE_API_ACCESS_TOKEN}`
                  }
            });
            const result = await req.json();

            console.log(`SENDLANE EVENT ${action} done. RESULT: ${JSON.stringify(result)}`,);

      } catch (err) {
            console.error('ERROR SENDLANE EVENT', err);
      }
};