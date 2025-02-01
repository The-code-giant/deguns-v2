import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const path = req.query.path as string;
  const regex = new RegExp(/\.(js|json|css)$/);
  if (regex.test(path)) {
    return res.status(200).json({ revalidated: true });
  }
  if (path) {
    try {
      await res.revalidate(path);
      return res.status(200).json({ revalidated: true });
    } catch (err) {
      return res.status(200).json({ revalidated: false });
    }
  }

  return res.status(400).send('Path not exist in query!');
}