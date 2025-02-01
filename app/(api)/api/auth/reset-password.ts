
import type { NextApiRequest, NextApiResponse } from 'next';
import https from 'https';
import axios from 'axios';


const graphQLUrl = process.env.BIGCOMMERCE_STOREFRONT_API_URL as string;
export const loginMutation = /* GraphQL */ `
mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    result
  }
}

`;

const agent = new https.Agent({
      rejectUnauthorized: false,
});

export default async function handler(
      req: NextApiRequest,
      res: NextApiResponse
) {
      const { email, action, password, token } = req.body;

      if (action === 'update-password') {
            try {
                  const { data } = await axios(`${process.env.SS_INTEGRATION_API_URL}/user/update-password`, {
                        method: 'POST',
                        data: { password, token },
                        httpsAgent: agent,
                  });

                  if (!data.email) {
                        return res.status(400).send('Invalid token provided!');
                  }

                  // do login

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
                                    email: data.email,
                                    password
                              },
                        },
                  });
                  const cookies = response.headers['set-cookie'];
                  if (cookies) {
                        res.setHeader('Set-Cookie', cookies);
                  }

                  return res.status(200).json(response.data);

            } catch (err) {
                  console.error(err);
                  return res.status(400).send('Invalid token provided!');

            }
      }

      try {
            await axios(`${process.env.SS_INTEGRATION_API_URL}/user/reset-password`, {
                  method: 'POST',
                  data: { email },
                  httpsAgent: agent,
            });

            return res.status(200).json({});

      } catch (error: any) {
            console.error(error);
            return res.status(500).json({ message: error.message });
      }
}