import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const ACTIVE_HOOKS_ID = [27443714, 27518930, 27624410, 28339586, 27910893];
export const revalidate = 0;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  const { data: { data: { hooks_list } } } = await axios({
    method: 'GET',
    url: `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/hooks/admin`,
    headers: {
      'Content-Type': 'application/json',
      'X-Auth-Token': `${process.env.BIGCOMMERCE_STORE_API_TOKEN}`
    }
  });

  for (const hook of hooks_list) {
    if (ACTIVE_HOOKS_ID.includes(hook.id) && !hook.is_active) {
      await axios({
        method: 'PUT',
        url: `${process.env.BIGCOMMERCE_STORE_API_URL}/v3/hooks/${hook.id}`,
        headers: {
          'Content-Type': 'application/json',
          'X-Auth-Token': `${process.env.BIGCOMMERCE_STORE_API_TOKEN}`
        },
        data: {
          is_active: true
        }
      });
    }
  }

  res.status(200).json({ hooks_list });
}