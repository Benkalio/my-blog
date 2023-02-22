import Head from 'next/head'
import { PrismaClient } from '@prisma/client'

export default function Home() {
  
  return (
    <div className="flex flex-col items-center min-h-screen py-2">
      <Head>
        <title>Blog </title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
        <div>
            <h1 className="text-3xl font-bold underline">Hello world!</h1>
          </div>
    </div>
  );
}
