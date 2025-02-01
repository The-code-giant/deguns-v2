import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';
import { AddressResolutionModel } from 'avatax/lib/models';

const AVALARA_BASE_URL = 'https://rest.avatax.com';
const companyCode = 'DEFAULT';

export type shippingAddress = {
  address1: string
  state: string
  zip: string
  city: string
  country: string,
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<AddressResolutionModel | { error: string }>) {
  try {
    const { transactionCode, transaction } = req.body;

    if (!transaction.addresses.SingleLocation) {
      throw new Error('No address provided');
    }

    const response = await axios({
      url: `${AVALARA_BASE_URL}/api/v2/companies/${companyCode}/transactions/${transactionCode}/adjust`,
      method: 'POST',
      headers: {
        Authorization: `Basic ${process.env.AVALARA_TOKEN}`
      },
      data: {
        'adjustmentReason': 'PriceAdjusted',
        'adjustmentDescription': 'Cart items changed by customer.',
        'newTransaction': {
          'lines': transaction.lines,
          'type': 'SalesInvoice',
          'companyCode': 'DEFAULT',
          'date': new Date().toISOString().split('T')[0],
          'customerCode': 'DEFAULT',
          'commit': false,
          addresses: {
            singleLocation: transaction.addresses.SingleLocation
          }
        }
      }
    });
    res.send({ ...response.data });
  } catch (error: any) {
    res.send({ error: error?.message });
  }
};