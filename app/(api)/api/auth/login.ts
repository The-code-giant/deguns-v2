
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

const graphQLUrl = process.env.BIGCOMMERCE_STOREFRONT_API_URL as string;
export const loginMutation = /* GraphQL */ `
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    result
  }
}

`;

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { email, password } = req.body;
		const response = await axios({
			method: 'POST',
			url: graphQLUrl,
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${process.env.BIGCOMMERCE_STOREFRONT_API_TOKEN as string}`
			},
			data: {
				query: loginMutation,
				variables: {
					email,
					password
				},
			},
		});
		const cookies = response.headers['set-cookie'];
		if (cookies) {
			res.setHeader('Set-Cookie', cookies);
		}

		return res.status(200).json(response.data);
	} catch (error: any) {
		res.status(404).json({ message: error.message });
	}
}