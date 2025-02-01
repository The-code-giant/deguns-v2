import type { NextApiRequest, NextApiResponse } from 'next';
import algoliasearch from 'algoliasearch';
import type { Brand } from '@commerce/types/site';
import commerce from '@lib/api/commerce';

const hitsPerPage = 1000;
export const revalidate = 0;
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID as string as string, process.env.ALGOLIA_ADMIN_KEY as string);
  const BRAND_INDEX = 'PROD_BRANDS';
  const index = client.initIndex(BRAND_INDEX);
  let hits: any[] = [];
  let page = 0;
  while (true) {
    const result = await index.search('', {
      hitsPerPage: hitsPerPage,
      page: page
    });

    hits = hits.concat(result.hits);

    if (page >= result.nbPages - 1) {
      break;
    }

    page++;
  }

  let allBrands: Brand[] = [];
  let afterCursor: string | undefined = undefined;
  while (true) {
    const { brands, pageInfo } = await commerce.getSiteInfo({
      variables: { after: afterCursor },
    });
    allBrands = allBrands.concat(brands);
    if (!pageInfo.hasNextPage) break;
    afterCursor = pageInfo.endCursor;
  }

  // Log the payload for debugging
  const newBrands = [];
  const oldBrands = [];
  for await (const brand of allBrands) {
    const hit = hits.find(hit => hit.id === brand.id);
    if (!!hit) {
      oldBrands.push({ ...hit, ...brand });
    } else {
      newBrands.push(brand);
    }
  }

  for (let i = 0; i < oldBrands.length; i += hitsPerPage) {
    const batch = oldBrands.slice(i, i + hitsPerPage);
    await index.saveObjects(batch);
  }
  if (newBrands.length > 0) {
    await index.saveObjects(newBrands, { 'autoGenerateObjectIDIfNotExist': true });
  }
  res.status(200).send({ success: true });
}