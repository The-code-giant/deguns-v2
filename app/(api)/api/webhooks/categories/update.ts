import { NextApiRequest, NextApiResponse } from 'next';
import commerce from '@lib/api/commerce';
import { kv } from '@vercel/kv';
import axios from 'axios';

let isProcessing = false;


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const SECRET = process.env.WEBHOOK_SECRET;
  const body = req.body;

  const providedSecret = req.headers['x-webhook-secret'];
  if (typeof providedSecret !== 'string' || providedSecret !== SECRET) {
    return res.status(403).send({ error: 'Access forbidden' });
  }
  if (req.method !== 'POST') {
    return res.status(405).end();
  }

  try {

    if (isProcessing) {
      return res.status(201).json({ message: 'Too Many Requests. The first request is already considered!' });
    }

    isProcessing = true;

    // wait for 2 minutes
    await sleep(120000);

    const { categories } = await commerce.getSiteInfo({
      variables: { after: undefined },
    });

    // update redis with new categories.
    await kv.set('categories', JSON.stringify(categories));

    if (Number(body?.data?.id)) {
      // revalidate the category page;
      const catID = body.data.id;
      await revalidateCategoryPage(catID);
    }

    return res.status(200).send({ status: 'update categories ' });
  } catch (error) {
    console.error('Error updating Categories in Redis:', error);
    res.status(500).send({ error: 'Failed to update Categories in Redis' });
  } finally {
    isProcessing = false;
  }
}

async function revalidateCategoryPage(catID: number): Promise<void> {
  try {
    const category = await commerce.getCategory({ variables: { entityId: catID } });
    if (!category) {
      return;
    }
    const revalidateDomain = 'https://www.deguns.net';
    // const revalidateDomain = 'http://localhost:3000';


    if (category?.parent_id) {
      const parentCategory = await commerce.getCategory({ variables: { entityId: category?.parent_id } });
      const parentCategoryPath = parentCategory?.custom_url?.url;
      axios.get(`${revalidateDomain}/api/revalidate?path=${parentCategoryPath}`);
      return;
    }
    const categoryParentURL = category?.custom_url?.url;

    axios.get(`${revalidateDomain}/api/revalidate?path=${categoryParentURL}`);
    return;
  }
  catch (err) {
    console.error('Error when revalidating in category update webhook!', { err });
    return;
  }
}
async function sleep(ms: number) { return new Promise(resolve => setTimeout(resolve, ms)); };