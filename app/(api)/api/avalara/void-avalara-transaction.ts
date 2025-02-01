import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const AVALARA_BASE_URL = 'https://rest.avatax.com';
const companyCode = 'DEFAULT';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { transactionCode } = req.body;
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  if (!transactionCode) {
    return res.status(400).json({ error: 'Transaction ID is required' });
  }
  try {

    const response = await axios({
      url: `${AVALARA_BASE_URL}/api/v2/companies/${companyCode}/transactions/${transactionCode}/void`,
      method: 'POST',
      headers: {
        authorization: `Basic ${process.env.AVALARA_TOKEN}`,
      },
      data: {
        'code': 'DocVoided'
      }
    });
    return res.status(200).json(response.data);

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }

}