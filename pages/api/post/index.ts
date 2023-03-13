import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import prisma from '../../../prisma/client';

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      try {
        console.log('request body', req.body);
        const { title, content } = req.body;

        const session = await getSession({ req });
        const result = await prisma.post.create({
          data: {
            title: title,
            content: content,
            author: {
              connect: {
                email: session?.user?.email || null || undefined,
              },
            },
          },
        });
        return res.status(200).json(result);
      } catch (error) {
        console.log(error);
      }
      break;
    case 'GET':
      try {
        const blogs = await prisma.post.findMany({});
        return res.status(200).json(blogs);
      } catch (error) {
        res.status(400).send(error);
      }
      break;
    default:
      res.status(400).end();
  }
}
