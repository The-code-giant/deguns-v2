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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AddressResolutionModel | null>
) {
  if (req.method === 'POST') {
    const { address } = req.body;
    const regex = /(\d+\s+[A-Z\s]+),\s+([A-Z\s]+),\s+([A-Z]{2})\s+(\d{5})/i;
    const match = address.match(regex);
    // if (match) {
    const parsedAddress = {
      line1: address
    };

    try {
      const validatedAddresses = await client.resolveAddress(parsedAddress);
      if (
        validatedAddresses &&
        validatedAddresses.validatedAddresses &&
        validatedAddresses.validatedAddresses.length > 0
      ) {
        res.status(200).json(validatedAddresses);
        return;
      }
    } catch (error) {
      console.log('Error validating address with Avalara:', error);
    }
    // }

    // res.status(200).json(null);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}



