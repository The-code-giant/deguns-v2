import type { NextApiRequest, NextApiResponse } from 'next';
import AvaTax from 'avatax';
import { AddressResolutionModel } from 'avatax/lib/models';
const creds = {
  username: 'trayten@aao.ltd',
  password: 'Avatray10$'
};
const client = new AvaTax({
  appName: 'myapp',
  appVersion: '1.0',
  environment: 'production',
  machineName: 'mbp'
}).withSecurity(creds);

export default async function handler(req: NextApiRequest, res: NextApiResponse<AddressResolutionModel | { error: string }>) {

  if (req.method === 'POST') {
    const { transaction } = req.body;
    try {
      const taxResult = await client.createTransaction({ model: transaction });
      res.status(200).json(taxResult);
      // const adjustedTransaction = await client.adjustTransaction({ model: transaction });

    } catch (error: any) {
      res.status(405).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
