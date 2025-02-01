import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import https from 'https';

const agent = new https.Agent({
  rejectUnauthorized: false,
});
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { productSku, defaultPrice, productId, ssItemNumber, SSconfirmation, quantity } = req.body;
    axios(`${process.env.SS_INTEGRATION_API_URL}/update-product`, {
      method: 'POST',
      httpsAgent: agent,
      data: {
        productSku,
        defaultPrice,
        productId,
        ssItemNumber,
        SSconfirmation,
        quantity
      },
    });
    res.status(200).json({ message: 'product is successfully updated' });
  }
  else {
    res.status(200).json({ error: 'Unauthorized' });
  }
}